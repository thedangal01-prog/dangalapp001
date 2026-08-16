import ZAI from 'z-ai-web-dev-sdk'
import fs from 'fs'

async function main() {
  const zai = await ZAI.create()
  const buf = fs.readFileSync('/home/z/my-project/upload/IMG_0225.JPG')
  // resize via sharp first
  const sharp = (await import('sharp')).default
  const resized = await sharp(buf).resize({ width: 1024, withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer()
  const b64 = resized.toString('base64')
  const dataUrl = `data:image/jpeg;base64,${b64}`

  console.log('calling image edit...')
  const res = await zai.images.generations.edit({
    prompt:
      'Remove the entire background completely. Keep ONLY the man standing — his white button-down shirt with rolled-up sleeves, blue jeans, body, head, hair, arms and hands. Make the background fully transparent (PNG with alpha channel, checkerboard transparency). Preserve the man exactly — his appearance, pose, clothing, lighting, proportions. Do not alter or redraw the person at all.',
    images: [{ url: dataUrl }],
    size: '768x1344',
  })

  const outB64 = res.data[0].base64
  const outBuf = Buffer.from(outB64, 'base64')
  fs.writeFileSync('/home/z/my-project/public/gym/amit-cutout.png', outBuf)
  console.log('saved amit-cutout.png', outBuf.length, 'bytes')
}

main().catch((e) => {
  console.error('FAILED:', e?.message || e)
  process.exit(1)
})
