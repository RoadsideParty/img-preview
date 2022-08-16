class Preview {
    el: HTMLImageElement
    scale: number
    size: number
    previewDom: HTMLDivElement
    constructor(el: HTMLImageElement, scale: number = 1, size: number = 300) {
        this.el = el
        this.scale = scale
        this.size = size
        this.init()
    }
    init() {
        this.createPreview()
        this.getMousePos()
    }
    createPreview() {
        this.previewDom = document.createElement('div')
        this.previewDom.style.cssText = `
            position:fixed;
            width:${this.size}px;
            height:${this.size}px;
            border-radius:50%;
            box-shadow:black 0px 0px 10px 0px;
            background-color:white;
            background-image: url(${this.el.getAttribute('src')});
            background-repeat:no-repeat;
            background-position:0 0;
            background-size:auto ${this.scale * 100}%;
        `
        document.body.append(this.previewDom)
    }
    getMousePos() {
        this.el.addEventListener('mousemove', (e: MouseEvent) => {
            const { clientX, clientY } = e
            const { left, top } = this.el.getBoundingClientRect()
            this.updatePreview((clientX - left) * 3, (clientY - top) * 3)
        })
    }
    updatePreview(x: number, y: number) {
        this.previewDom.style['background-position'] = `${-x + 150}px ${-y + 150}px`
    }
}