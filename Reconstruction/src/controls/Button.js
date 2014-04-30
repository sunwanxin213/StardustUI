void function ($S) {

    var _page = $S.Util.Page;
    var _enum = $S.Enum;

    function Button() {
        $S.Control.apply(this, arguments);

        var _this = this;

        // 设置控件默认内边距
        this.padding = { left: 0, right: 0, top: 0, bottom: 0 };
        // 设置控件默认宽度
        this.width = 75;
        // 设置控件默认高度
        this.height = 23;
        // 设置按钮控件的平面样式外观
        this.flatStyle = _enum.flatStyle.standard;
        // 设置控件内容文本对齐方式
        this.textAlign = _enum.contentAlignment.middleCenter;
        // 设置默认文本
        this.text = "button";

        // 设置边框样式属性
        Object.defineProperty(this, "borderStyle", {
            get: function () { return _enum.borderStyle.round; }
        });
    }

    Button.prototype = new $S.Control();

    // 缓存Button对象原型
    var button = Button.prototype;

    button.onSet = function () {
        if (this.autoSize) {
            var maxWidth = _page.getTextWidth(this.text, this.font),
                maxHeight = _page.getTextHeight(this.text, this.font);
            this.bufferCanvas.width = this.width = maxWidth + this.left + this.right;
            this.bufferCanvas.height = this.height = maxHeight + this.top + this.bottom;
        }
    };

    button.onPaint = function () {
        /// <summary>绘制控件</summary>

        var ctx = this.bufferCtx;

        ctx.save();

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        ctx.fillText(this.text, (this.width - _page.getTextWidth(this.text, this.font)) / 2, (this.height - _page.getTextHeight(this.text, this.font)) / 2);

        ctx.restore();
    };

    $S.Button = Button;
}(StardustUI.prototype);