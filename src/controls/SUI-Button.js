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
        this.padding = { left: 3, right: 3, top: 3, bottom: 3 };
        // 设置控件默认宽度
        this.width = 75;
        // 设置控件默认高度
        this.height = 23;
        // 设置按钮控件的平面样式外观
        this.flatStyle = sui.flatStyle.standard;
        // 设置控件内容文本对齐方式
        this.textAlign = sui.contentAlignment.middleCenter;

        // 文本被改变事件
        this.onClick;

        // 鼠标是否移入
        this.isMouseEnter = false;
        // 监测样式变更
        this.addEventListener("mousemove", function (e) {
            if (sui.util.bounds(e, _this)) _this.isMouseEnter = true;
            else _this.isMouseEnter = false;
        }, false);

        // 设置点击后进入编辑模式
        this.addEventListener("click", function (e) {
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

    button.onPaintBackground = function (ctx) {
        /// <summary>绘制控件背景事件</summary>

        // 背景颜色
        var c1 = "rgba(230,230,230,1)", c2 = "rgba(210,210,210,1)";
        if (this.isMouseEnter) {
            c1 = "rgba(210,210,210,1)", c2 = "rgba(230,230,230,1)";
        }

        /* 控件背景渐变颜色 */
        var bgGradient = ctx.createLinearGradient(0, 0, 0, this.height);
        bgGradient.addColorStop(0, c1);
        bgGradient.addColorStop(0.5, c2);
        bgGradient.addColorStop(1, c1);

        switch (this.flatStyle) {
            case sui.flatStyle.standard:
                ctx.fillStyle = bgGradient;
                ctx.fillRect(0, 0, this.width, this.height);
                break;
            case sui.flatStyle.flat:
                if (this.isMouseEnter) {
                    ctx.fillStyle = c2;
                    ctx.fillRect(0, 0, this.width, this.height);
                }
                break;
            case sui.flatStyle.popup:
                if (this.isMouseEnter) {
                    ctx.fillStyle = bgGradient;
                    ctx.fillRect(0, 0, this.width, this.height);
                }
                break;
        }

        // 绘制边框
        ctx.strokeStyle = "#888";
        ctx.strokeRect(0, 0, this.width, this.height);
    };

    button.onPaint = function (canvas, ctx) {
        /// <summary>绘制控件</summary>

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        ctx.fillText(this.text,
                     (this.width - sui.util.getTextWidth(this.text, this.font)) / 2,
                     (this.height - sui.util.getTextHeight(this.text, this.font)) / 2);
    };

    sui.Button = Button;
}(StardustUI.prototype);