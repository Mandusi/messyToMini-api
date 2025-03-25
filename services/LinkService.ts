import Prisma from '../utils/Prisma'

export async function shortener(params: any) {
	const type = params.type
	const url = params.url

	// Fetch a random 6 letter word
	const slug = await fetch('https://random-word-api.herokuapp.com/word?length=6')
	console.log(slug)
}

export async function getLink(slug: string, ip: any) {
	const link = await Prisma.link.findUnique({
		where: { slug: slug },
		select: { context: true, id: true },
	})
	if (!link) return
	const context = link.context
	const url = (context as any).url

	await Prisma.view.create({
		data: {
			linkId: link.id,
			ip: ip,
			createdAt: new Date().toISOString(),
		},
	})
	return url
}

export async function getAllLinks() {
	const links = await Prisma.link.findMany({
		select: { context: true, slug: true, type: true },
		take: 5,
	})
	return links
}
