const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/preview.ts'),
            formats: ["es", "cjs", "umd", "iife"],
            name: 'Preview',
            fileName: (format: string) => `preview.${format}.js`
        }
    }
})