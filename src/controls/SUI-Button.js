/// <reference path="../core/SUI.js" />
/// <reference path="../core/SUI-Enum.js" />
void function (sui) {
    // Button控件数量
    var number = 1;

    function Button() {
        sui.Control.apply(this, arguments);

        var _this = this;

        // 设置代码中用来标识该对象的名称
        this.name = "button" + number;
        this.text = "button" + number;
        number++;

        // 设置控件默认内边距
        this.padding = { left: 0, right: 0, top: 0, bottom: 0 };
        // 设置控件默认宽度
        this.width = 75;
        // 设置控件默认高度
        this.height = 23;
        // 设置按钮控件的平面样式外观
        this.flatStyle = sui.flatStyle.standard;
        // 设置控件内容文本对齐方式
        this.textAlign = sui.contentAlignment.middleCenter;

        // 设置边框样式属性
        Object.defineProperty(this, "borderStyle", {
            get: function () { return sui.borderStyle.fixed3D; }
        })

        // 文本被改变事件
        this.onClick;

        // 鼠标是否移入
        this.isMouseEnter = false;
        // 监测样式变更
        this.addEventListener("mousemove", function (e) {
            if (sui.util.bounds(e, _this)) _this._isMouseEnter = true;
            else _this._isMouseEnter = false;
        }, false);

        // 设置点击事件
        this.addEventListener("click", function (e) {
            if (!_this.isEnable) return;
            if (!sui.util.bounds(e, _this) || !_this.isVisible) return;
            if (window.event) e.cancelBubble = true;
            else e.stopPropagation();
            _this.onClick && _this.onClick();
        });
    }

    Button.prototype = new SUI.prototype.Control();

    // 缓存Button对象原型
    var button = Button.prototype;

    button.onSet = function () {
        if (this.autoSize) {
            var maxWidth = sui.util.getTextWidth(this.text, this.font),
                maxHeight = sui.util.getTextHeight(this.text, this.font);
            this.bufferCanvas.width = this.size.width = maxWidth + this.padding.left + this.padding.right;
            this.bufferCanvas.height = this.size.height = maxHeight + this.padding.top + this.padding.bottom;
        }
    };

    button.onPaint = function (canvas, ctx) {
        /// <summary>绘制控件</summary>

        ctx.save();

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        ctx.fillText(this.text,
                     (this.width - sui.util.getTextWidth(this.text, this.font)) / 2,
                     (this.height - sui.util.getTextHeight(this.text, this.font)) / 2);

        ctx.restore();
    };

    sui.Button = Button;
}(StardustUI.prototype);