import Handlebars from 'handlebars'
import * as FsUtils from './FsUtils'

export default async function EmailRenderer(template: string, context: object) {
	const file = FsUtils.path('templates', `${template}.hbs`)
	const content = await FsUtils.read(file)
	const hbs = Handlebars.compile(content)
	return hbs(context)
}
