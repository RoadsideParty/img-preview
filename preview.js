var Preview = /** @class */ (function () {
    function Preview(el, scale, size) {
        if (scale === void 0) { scale = 3; }
        if (size === void 0) { size = 300; }
        this.el = el;
        this.scale = scale;
        this.size = size;
        this.init();
    }
    Preview.prototype.init = function () {
        this.createPreview();
        this.getMousePos();
    };
    Preview.prototype.createPreview = function () {
        var previewDom = document.createElement('div');
        previewDom.style.cssText = "\n            display:none;\n            position:fixed;\n            width:".concat(this.size, "px;\n            height:").concat(this.size, "px;\n            border-radius:50%;\n            box-shadow:black 0px 0px 10px 0px;\n            background-color:white;\n            background-image: url(").concat(this.el.getAttribute('src'), ");\n            background-repeat:no-repeat;\n            background-position:0 0;\n            background-size:").concat(this.el.clientWidth * this.scale, "px auto;\n        ");
        document.body.append(previewDom);
        this.previewDom = previewDom;
    };
    Preview.prototype.getMousePos = function () {
        var _this = this;
        window.addEventListener('mousemove', function (e) {
            var clientX = e.clientX, clientY = e.clientY;
            var _a = _this.el.getBoundingClientRect(), left = _a.left, top = _a.top;
            if (_this.mouseInTarget(clientX, clientY, left, top)) {
                _this.previewDom.style.display = 'inline-block';
                _this.updatePreviewBox(clientX, clientY);
                _this.updatePreview((clientX - left), (clientY - top));
            }
            else {
                _this.previewDom.style.display = 'none';
            }
        });
    };
    Preview.prototype.updatePreviewBox = function (x, y) {
        if (x + this.size > window.innerWidth) {
            this.previewDom.style.left = window.innerWidth - this.size + 'px';
        }
        else {
            this.previewDom.style.left = x + 'px';
        }
        this.previewDom.style.top = y + 'px';
    };
    Preview.prototype.updatePreview = function (x, y) {
        this.previewDom.style['background-position'] = "".concat(-x * this.scale + this.size / 2, "px ").concat(-y * this.scale + this.size / 2, "px");
    };
    Preview.prototype.mouseInTarget = function (x, y, x1, y1) {
        if (x < x1 || x > x1 + this.el.clientWidth || y < y1 || y > y1 + this.el.clientHeight) {
            return false;
        }
        return true;
    };
    return Preview;
}());
