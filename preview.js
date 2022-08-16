var Preview = /** @class */ (function () {
    function Preview(el, scale, size) {
        if (scale === void 0) { scale = 1; }
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
        this.previewDom = document.createElement('div');
        this.previewDom.style.cssText = "\n            position:fixed;\n            width:".concat(this.size, "px;\n            height:").concat(this.size, "px;\n            border-radius:50%;\n            box-shadow:black 0px 0px 10px 0px;\n            background-color:white;\n            background-image: url(").concat(this.el.getAttribute('src'), ");\n            background-repeat:no-repeat;\n            background-position:0 0;\n            background-size:auto ").concat(this.scale * 100, "%;\n        ");
        document.body.append(this.previewDom);
    };
    Preview.prototype.getMousePos = function () {
        var _this = this;
        this.el.addEventListener('mousemove', function (e) {
            var clientX = e.clientX, clientY = e.clientY;
            var _a = _this.el.getBoundingClientRect(), left = _a.left, top = _a.top;
            _this.updatePreview((clientX - left) * 3, (clientY - top) * 3);
        });
    };
    Preview.prototype.updatePreview = function (x, y) {
        this.previewDom.style['background-position'] = "".concat(-x + 150, "px ").concat(-y + 150, "px");
    };
    return Preview;
}());
