import { afterEach, describe, expect, it, vi } from 'vitest'
import { downloadFile, getFileNameWithFormat, prepareDownload, triggerBrowserDownload } from '../src/utils/download'

afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.useRealTimers()
})

describe('filename templating', () => {
    it('inserts titles containing $ replacement patterns verbatim', () => {
        const name = getFileNameWithFormat('{title}', 'md', {
            title: 'a$&b$`c$\'d$$e',
            chatId: 'chat-1',
        })

        expect(name).toBe('a$&b$`c$\'d$$e.md')
    })

    it('does not re-interpret inserted values that look like other placeholders', () => {
        const name = getFileNameWithFormat('{title}', 'md', {
            title: 'keep {date} and {chat_id} literal',
            chatId: 'chat-1',
        })

        expect(name).toBe('keep_{date}_and_{chat_id}_literal.md')
    })

    it('keeps unknown placeholders and appends the extension', () => {
        const name = getFileNameWithFormat('{unknown}-{title}', 'html', {
            title: 'hello',
            chatId: '',
        })

        expect(name).toBe('{unknown}-hello.html')
    })
})

describe('browser-native downloads', () => {
    it('prepares generated content without changing its filename or MIME type', async () => {
        const artifact = prepareDownload('archive.zip', 'application/zip', 'zip content')

        expect(artifact.filename).toBe('archive.zip')
        expect(artifact.blob.type).toBe('application/zip')
        await expect(artifact.blob.text()).resolves.toBe('zip content')
    })

    it('clicks an attached download link and revokes its Blob URL afterwards', async () => {
        vi.useFakeTimers()
        const click = vi.fn()
        const remove = vi.fn()
        const appendChild = vi.fn()
        const anchor = { href: '', download: '', click, remove }
        vi.stubGlobal('document', {
            createElement: vi.fn(() => anchor),
            body: { appendChild },
        })
        const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test-download')
        const revokeObjectURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})
        const artifact = prepareDownload('conversation.md', 'text/markdown', '# Conversation')

        triggerBrowserDownload(artifact)

        expect(createObjectURL).toHaveBeenCalledWith(artifact.blob)
        expect(anchor.href).toBe('blob:test-download')
        expect(anchor.download).toBe('conversation.md')
        expect(appendChild).toHaveBeenCalledWith(anchor)
        expect(click).toHaveBeenCalledOnce()
        expect(remove).toHaveBeenCalledOnce()

        await vi.advanceTimersByTimeAsync(1_000)
        expect(revokeObjectURL).toHaveBeenCalledWith('blob:test-download')
    })

    it('uses the same native path for immediate single-file exports', () => {
        const click = vi.fn()
        const anchor = { href: '', download: '', click, remove: vi.fn() }
        vi.stubGlobal('document', {
            createElement: vi.fn(() => anchor),
            body: { appendChild: vi.fn() },
        })
        vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:single-file')
        vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {})

        downloadFile('single.md', 'text/markdown', '# Single')

        expect(anchor.download).toBe('single.md')
        expect(click).toHaveBeenCalledOnce()
    })
})
