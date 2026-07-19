import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import { writeFileSync } from 'fs'

const svgPath = 'favicon.svg'
const sizes = [16, 32, 48, 64, 128, 256]

const buffers = await Promise.all(
  sizes.map((s) =>
    sharp(svgPath, { density: 384 })
      .resize(s, s)
      .png()
      .toBuffer()
  )
)

const ico = await pngToIco(buffers)
writeFileSync('build/icon.ico', ico)
console.log('icon.ico written')
