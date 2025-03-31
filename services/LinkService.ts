import Prisma from '../utils/Prisma'
import { randomPhrese } from '../utils/SlugUtils'
import { rand } from '../utils/StrUtils'

export async function createLink(params: any) {
	const type = params.type
	const url = params.url
	const slug = randomPhrese()

	await Prisma.link.create({
		data: {
			slug: slug as string,
			url: url,
			type: type,
			userId: '462d6a6d-7b9f-4ce8-a1e6-9b31f51ee70c',
		},
	})

	return slug
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
		select: { url: true, slug: true, type: true },
		take: 5,
	})
	return links
}
