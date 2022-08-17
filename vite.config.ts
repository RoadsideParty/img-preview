const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/preview.ts'),
            name: 'index',
            fileName: format => `index.${format}.js`
        }
    }
})