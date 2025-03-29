import Prisma from '../utils/Prisma'
import SlugUtils from '../utils/SlugUtils'
import { rand } from '../utils/StrUtils'

export async function createLink(params: any) {
	const type = params.type
	const url = params.url

	// Fetch a random 6 letter word
	let data: string[] = (await SlugUtils(6)) as []
	let slug = data[0]
	console.log(slug[0])

	// If the fetch fails, create random 6 letter slug
	if (!slug) slug = rand(6)

	await Prisma.link.create({
		data: {
			slug: slug as string,
			url: url,
			type: type,
			userId: '9423e11b-8d97-4eff-9dc1-026e3ce34dbe',
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
