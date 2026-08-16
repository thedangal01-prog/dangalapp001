import sharp from 'sharp'
import fs from 'fs'

async function main() {
  const input = '/home/z/my-project/public/gym/logo-v2.jpg'
  const output = '/home/z/my-project/public/gym/logo-transparent.png'

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
    // White/near-white background: all channels very bright
    const isWhite = r > 225 && g > 225 && b > 225
    if (isWhite) {
      data[i + 3] = 0 // transparent
    } else if (r > 200 && g > 200 && b > 200) {
      // partial — feather edge for smooth anti-alias
      const k = (255 - r) / 55
      data[i + 3] = Math.round(Math.min(255, Math.max(0, k * 255)))
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
