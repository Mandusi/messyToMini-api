import AuthPayload from 'AuthPayload'

import jwt from 'jsonwebtoken'

import Prisma from '../utils/Prisma'
import * as ImageUtils from '../utils/ImageUtils'
import * as HashUtils from '../utils/HashUtils'
import * as FsUtils from '../utils/FsUtils'
import * as Email from '../utils/Email'
import * as StrUtils from '../utils/StrUtils'

export async function signUp(props: any) {
	const usernameExists = await Prisma.user.findUnique({
		where: { username: props.username },
	})

	if (usernameExists) throw new Error('Username already exists')

	const emailExists = await Prisma.user.findUnique({
		where: { email: props.email },
	})

	if (emailExists) throw new Error('Email already exists')

	const hash = await HashUtils.hash(props.password)

	const user = await Prisma.user.create({
		data: {
			username: props.username.trim(),
			email: props.email.trim(),
			firstName: props.firstName.trim(),
			lastName: props.lastName.trim(),
			password: hash,
			profileImage: props?.profileImage,
		},
	})

	return user
}

export async function login(props: any): Promise<AuthPayload> {
	const user = await Prisma.user.findUnique({
		where: { username: props.username },
		select: {
			username: true,
			password: true,
			firstName: true,
			lastName: true,
			id: true,
		},
	})

	if (!user) throw Error('Wrong username or password')

	const match = await HashUtils.compare(props.password, user.password)

	if (!match) throw Error('Wrong username or password')

	const accessToken = jwt.sign({ id: user.id }, process.env.JWT_ACCESS_SECRET as string, {
		expiresIn: '30m',
	})

	const refreshToken = jwt.sign(
		{ id: user.id },
		process.env.JWT_REFRESH_SECRET as string,
		{ expiresIn: '7d' }
	)

	return {
		id: user.id,
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
		token: accessToken,
		refreshToken: refreshToken,
	}
}

export async function refreshLogin(token: string): Promise<AuthPayload> {
	const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as any
	if (!decoded) throw Error('Invalid or expired refresh token')
	const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_ACCESS_SECRET as string, {
		expiresIn: '15m',
	})
	return {
		id: decoded.id,
		username: decoded.username,
		firstName: decoded.firstName,
		lastName: decoded.lastName,
		token: newToken,
	}
}

export async function forgotPassword(email: any) {
	const user = await Prisma.user.findUnique({ where: { email: email } })

	if (!user) throw Error('There is no user registered with provided email!')

	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
		expiresIn: '45m',
	})

	const resetPasswordURL = `${process.env.CLIENT_ORIGIN}/reset-password?token=${token}`

	Email.send(
		{ subject: 'Reset Password', template: `ForgotPassword`, to: user.email },
		{ firstname: user.firstName, link: resetPasswordURL }
	)
}

export async function resetPassword(props: any) {
	const token = props.token
	const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any
	const hash = await HashUtils.hash(props.password)
	await Prisma.user.update({ where: { id: decoded.id }, data: { password: hash } })
}

export async function changePassword(props: any) {
	const user = await Prisma.user.findUnique({
		where: { username: props.username },
	})

	if (!user) throw Error('Wrong username or password')

	const match = await HashUtils.compare(props.oldPassword, user.password as string)

	if (!match) throw Error('Wrong username or password')

	const hash = await HashUtils.hash(props.newPassword)

	await Prisma.user.update({
		where: { username: props.username },
		data: { password: hash },
	})
}

export async function uploadProfileImg(username: string, buffer: Buffer) {
	const optimized = ImageUtils.optimizeProfileImage(buffer)
	const file = [StrUtils.uuid(), 'png'].join('.')
	await FsUtils.save(FsUtils.path('public', 'profileImages', file), optimized)

	await Prisma.user.update({
		where: { username: username },
		data: {
			profileImage: {
				upsert: {
					create: { file: file },
					update: { file: file },
				},
			},
		},
	})
}

export async function getMe(user: any) {
	const linksWithViewCount = await Prisma.link.findMany({
		where: { userId: user.id },
		select: {
			id: true,
			slug: true,
			url: true,
			type: true,
			createdAt: true,
			views: {
				select: {
					id: true,
				},
			},
		},
	})
	return linksWithViewCount
}
