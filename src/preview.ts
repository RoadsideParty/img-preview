class Preview {
    el: HTMLImageElement
    scale: number
    size: number
    previewDom: HTMLDivElement
    constructor(el: HTMLImageElement, scale: number = 3, size: number = 300) {
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
        const previewDom = document.createElement('div')
        previewDom.style.cssText = `
            display:none;
            position:fixed;
            width:${this.size}px;
            height:${this.size}px;
            border-radius:50%;
            box-shadow:black 0px 0px 10px 0px;
            background-color:white;
            background-image: url(${this.el.getAttribute('src')});
            background-repeat:no-repeat;
            background-position:0 0;
            background-size:${this.el.clientWidth * this.scale}px auto;
        `
        document.body.append(previewDom)
        this.previewDom = previewDom
    }
    getMousePos() {
        window.addEventListener('mousemove', (e: MouseEvent) => {
            const { clientX, clientY } = e
            const { left, top } = this.el.getBoundingClientRect()
            if (this.mouseInTarget(clientX, clientY, left, top)) {
                this.previewDom.style.display = 'inline-block'
                this.updatePreviewBox(clientX, clientY)
                this.updatePreview((clientX - left), (clientY - top))
            } else {
                this.previewDom.style.display = 'none'
            }
        })
    }
    updatePreviewBox(x: number, y: number) {
        if (x + this.size > window.innerWidth) {
            this.previewDom.style.left = window.innerWidth - this.size + 'px'
        } else {
            this.previewDom.style.left = x + 'px'
        }
        this.previewDom.style.top = y + 'px'
    }
    updatePreview(x: number, y: number) {
        this.previewDom.style['background-position'] = `${-x * this.scale + this.size / 2}px ${-y * this.scale + this.size / 2}px`
    }
    mouseInTarget(x: number, y: number, x1: number, y1: number) {
        if (x < x1 || x > x1 + this.el.clientWidth || y < y1 || y > y1 + this.el.clientHeight) {
            return false
        }
        return true
    }
}