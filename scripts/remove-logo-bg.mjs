import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'
import sharp from 'sharp'

async function main() {
  const zai = await ZAI.create()
  const buf = fs.readFileSync('/home/z/my-project/public/gym/logo-v2.jpg')
  const b64 = buf.toString('base64')
  const dataUrl = `data:image/jpeg;base64,${b64}`

  console.log('calling image edit to remove white background...')
  const res = await zai.images.generations.edit({
    prompt:
      'Remove the white background completely. Keep ONLY the logo design — the muscular figure lifting a barbell, and the text "THE DANGAL UNISEX GYM" (THE/UNISEX in black, DANGAL/GYM in red distressed font). Make the background fully transparent (checkerboard). Preserve every detail of the logo exactly — colors, text, figure, proportions. Do not redraw or alter the logo.',
    images: [{ url: dataUrl }],
    size: '768x1344',
  })

  const outB64 = res.data[0].base64
  const outBuf = Buffer.from(outB64, 'base64')
  const rawPath = '/home/z/my-project/public/gym/logo-cutout-raw.png'
  fs.writeFileSync(rawPath, outBuf)
  console.log('saved raw cutout', outBuf.length, 'bytes')

  // Now key out the checkered pattern + any remaining white to true alpha
  const { data, info } = await sharp(rawPath)
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
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const sat = max - min
    // checker pattern = light grey on near-white, low saturation, bright
    const isChecker = max > 170 && min > 150 && sat < 40
    // solid white leftover
    const isWhite = r > 225 && g > 225 && b > 225
    if (isChecker || isWhite) {
      data[i + 3] = 0
    }
  }

  const out = '/home/z/my-project/public/gym/logo-transparent.png'
  await sharp(data, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile(out)
  const m = await sharp(out).metadata()
  console.log('final:', out, 'hasAlpha:', m.hasAlpha, m.width + 'x' + m.height, fs.statSync(out).size, 'bytes')
}

main().catch((e) => { console.error('FAILED:', e?.message || e); process.exit(1) })
