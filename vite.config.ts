import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'
import monkey from 'vite-plugin-monkey'
import packageJson from './package.json' with { type: 'json' }

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        preact({
            devToolsEnabled: false,
            devtoolsInProd: false,
        }),
        monkey({
            entry: 'src/main.tsx',
            userscript: {
                'name': {
                    '': packageJson.title,
                    'zh-CN': packageJson['title:zh-CN'],
                    'zh-TW': packageJson['title:zh-TW'],
                },
                'author': packageJson.author,
                'namespace': packageJson.author,
                'description': {
                    '': packageJson.description,
                    'zh-CN': packageJson['description:zh-CN'],
                    'zh-TW': packageJson['description:zh-TW'],
                },
                'license': packageJson.license,
                'homepageURL': 'https://github.com/pionxzh/deepseek-exporter',
                'supportURL': 'https://github.com/pionxzh/deepseek-exporter/issues',
                'match': [
                    'https://chat.deepseek.com/*',
                ],
                'exclude': [
                    'https://chat.deepseek.com/sign_in*',
                ],
                'icon': 'https://chat.deepseek.com/favicon.svg',
                'run-at': 'document-end',
            },
            build: {
                fileName: 'deepseek.user.js',
                externalGlobals: [
                    // Pin exact versions and attach Subresource Integrity hashes to
                    // the @require URLs so a compromised/poisoned CDN response cannot
                    // execute arbitrary code in the chat.deepseek.com page context.
                    // Tampermonkey/Violentmonkey verify the `#sha384=` fragment.
                    // JSZip 3.10.1's setImmediate polyfill hangs in a granted
                    // Tampermonkey sandbox. Keep 3.9.1 pinned until upstream
                    // fixes https://github.com/Stuk/jszip/issues/934.
                    ['jszip', ['JSZip', 'https://cdn.jsdelivr.net/npm/jszip@3.9.1/dist/jszip.min.js#sha384=QC9YCuBRpz3M81TBQGFGTrpTo2B2igltSqvOvHmbG3mb9X3Ftljj+WWRfI6VojME']],
                    ['html2canvas', ['html2canvas', 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js#sha384=ZZ1pncU3bQe8y31yfZdMFdSpttDoPmOZg2wguVK9almUodir1PghgT0eY7Mrty8H']],
                ],
            },
            server: {
                open: true,
            },
        }),
    ],
    build: {
        cssMinify: false,
    },
})
