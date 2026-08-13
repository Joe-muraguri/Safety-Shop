import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'
import path from 'path'

const HERO_DIR = path.resolve(__dirname, 'public/images/hero')
const MANIFEST_PATH = path.join(HERO_DIR, 'manifest.json')
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp']

function writeHeroManifest() {
  if (!fs.existsSync(HERO_DIR)) return
  const files = fs
    .readdirSync(HERO_DIR)
    .filter((f) => IMAGE_EXTS.includes(path.extname(f).toLowerCase()))
    .sort()
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(files, null, 2))
}

function heroManifestPlugin(): Plugin {
  return {
    name: 'hero-manifest',
    buildStart() {
      writeHeroManifest()
    },
    configureServer(server) {
      writeHeroManifest()
      server.watcher.add(HERO_DIR)
      server.watcher.on('all', (_event, file) => {
        if (file.startsWith(HERO_DIR) && !file.endsWith('manifest.json')) {
          writeHeroManifest()
          server.ws.send({ type: 'full-reload' })
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
          tailwindcss(),
          heroManifestPlugin(),
  ],
})
