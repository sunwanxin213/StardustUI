﻿void function ($S) {

    var _page = $S.Util.Page;
    var _enum = $S.Enum;

    function Lable() {
        $S.Control.apply(this, arguments);

        var _this = this;

        // 设置为自动调整大小
        this.autoSize = true;
        // 设置控件默认宽度
        this.size.width = 350;
        // 设置控件默认高度
        this.size.height = 120;
        // 设置控件内容文本对齐方式
        this.textAlign = _enum.contentAlignment.topLeft;
        // 设置控件默认内边距
        this.padding = { left: 3, right: 3, top: 3, bottom: 3 };

        // 设置默认文本
        var text = "lable";
        Object.defineProperty(this, "text", {
            get: function () { return text; },
            set: function (value) {
                text = value;
                _this.onSet();
            }
        });
    }

    Lable.prototype = new $S.Control();

    // 缓存Lable对象原型
    var lable = Lable.prototype;

    lable.onSet = function () {
        /// <summary>设置控件</summary>

        if (this.autoSize) {
            var maxWidth = 0,
                maxHeight = 0;
            var strList = this.text.split("\r\n");
            for (var i = strList.length; i--;) {
                maxWidth = Math.max(maxWidth, _page.getTextWidth(strList[i], this.font));
                maxHeight = Math.max(maxHeight, _page.getTextHeight(strList[i], this.font));
            }
            maxWidth += this.padding.left + this.padding.right;
            this.bufferCanvas.width = this.size.width = maxWidth;
            this.bufferCanvas.height = this.size.height = maxHeight * strList.length + (this.padding.top + this.padding.bottom);
        }
    };

    lable.onPaint = function () {
        /// <summary>绘制控件</summary>

        var ctx = this.bufferCtx;

        ctx.save();

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        var strList = this.text.split("\r\n");
        var fontHeight = _page.getTextHeight(strList[0], this.font);
        ctx.translate(this.padding.left, this.padding.top);
        for (var i = 0; i < strList.length; i++) {
            ctx.fillText(strList[i], 0, fontHeight * i);
        }
        ctx.translate(-this.padding.left, -this.padding.top);

        ctx.restore();
    };

    $S.Control.Lable = Lable;
}(StardustUI.prototype);