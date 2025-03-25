import sharp from 'sharp'

export function optimizeProfileImage(f: Buffer) {
	return sharp(f).resize(300).extract({ width: 300, height: 300, left: 0, top: 0 }).png()
}
