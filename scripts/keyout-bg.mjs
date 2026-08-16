import sharp from 'sharp'
import fs from 'fs'

async function main() {
  const input = '/home/z/my-project/public/gym/amit-cutout.png'
  const output = '/home/z/my-project/public/gym/amit-transparent.png'

  // The edit API returned a JPG-like PNG with a checkered "transparency" pattern.
  // We'll key out the light grey checker pixels and make them truly transparent.
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const w = info.width
  const h = info.height
  const ch = info.channels

  for (let i = 0; i < data.length; i += ch) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    // Checker pattern is light grey (~200-230) on near-white (~240-255).
    // Detect "background" = bright, low-saturation pixels.
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min
    const bright = max > 175 && min > 165 && sat < 35
    if (bright) {
      data[i + 3] = 0 // transparent
    }
  }

  await sharp(data, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile(output)

  const m = await sharp(output).metadata()
  console.log('output:', output, 'hasAlpha:', m.hasAlpha, m.width + 'x' + m.height)
  console.log('size:', fs.statSync(output).size, 'bytes')
}

main().catch((e) => { console.error(e); process.exit(1) })
