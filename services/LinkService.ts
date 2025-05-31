import { UUID } from 'crypto'
import Prisma from '../utils/Prisma'
import { randomPhrese } from '../utils/SlugUtils'

export async function createLink(params: any) {
	const type = params.body.type
	const url = params.body.url
	const id = params?.user?.id
	const slug = randomPhrese()
	const link = await Prisma.link.create({
		data: {
			slug: slug,
			url: url,
			type: type,
			userId: id,
		},
	})

	return link
}

export async function getLink(slug: string, ip: any) {
	const link = await Prisma.link.findUnique({
		where: { slug: slug },
		select: { url: true, id: true },
	})

	if (!link) throw Error('There is no such a mini link!')

	await Prisma.view.create({
		data: {
			linkId: link.id,
			ip: ip,
			createdAt: new Date().toISOString(),
		},
	})
	return link.url
}

export async function getAllLinks() {
	const links = await Prisma.link.findMany({
		select: {
			slug: true,
			url: true,
			_count: {
				select: { views: true }, // Count the number of views for each link
			},
		},
	})

	return links
}

export async function deleteLink(linkId: UUID, userId: UUID) {
	if (!linkId) {
		throw new Error('Missing link ID for deletion.')
	}

	if (!userId) {
		throw new Error('User not authenticated.')
	}

	const link = await Prisma.link.findUnique({
		where: { id: linkId },
		select: { userId: true },
	})

	if (!link) {
		throw new Error('Link not found.')
	}

	if (link.userId !== userId) {
		throw new Error('Unauthorized to delete this link.')
	}

	// Delete associated views first
	await Prisma.view.deleteMany({
		where: { linkId: linkId },
	})

	// Delete the link
	await Prisma.link.delete({
		where: { id: linkId },
	})

	return link
}
