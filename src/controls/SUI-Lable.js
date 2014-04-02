void function (sui) {
    // Lable控件数量
    var number = 1;

    function Lable() {
        sui.Control.apply(this, arguments);

        var _this = this;

        // 设置代码中用来标识该对象的名称
        this.name = "lable" + number;

        var text = "lable" + number
        // 设置默认文本
        Object.defineProperty(this, "text", {
            get: function () { return text; },
            set: function (value) {
                text = value;
                _this.onSet();
            }
        });

        // 设置为自动调整大小
        this.autoSize = true;
        // 设置控件默认宽度
        this.size.width = 350;
        // 设置控件默认高度
        this.size.height = 120;
        // 设置控件内容文本对齐方式
        this.textAlign = sui.contentAlignment.topLeft;
        // 设置控件默认内边距
        this.padding = { left: 3, right: 3, top: 3, bottom: 3 };

        number++;
    }

    Lable.prototype = new SUI.prototype.Control();

    // 缓存Lable对象原型
    var lable = Lable.prototype;

    lable.onSet = function () {
        if (this.autoSize) {
            var maxWidth = 0,
                maxHeight = 0;
            var strList = this.text.split("\r\n");
            for (var i = strList.length; i--;) {
                maxWidth = Math.max(maxWidth, sui.util.getTextWidth(strList[i], this.font));
                maxHeight = Math.max(maxHeight, sui.util.getTextHeight(strList[i], this.font));
            }
            maxWidth += this.padding.left + this.padding.right;
            this.bufferCanvas.width = this.size.width = maxWidth;
            this.bufferCanvas.height = this.size.height = maxHeight * strList.length + (this.padding.top + this.padding.bottom);
        }
    };

    lable.onPaint = function (canvas, ctx) {
        /// <summary>绘制控件</summary>

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        var strList = this.text.split("\r\n");
        var fontHeight = sui.util.getTextHeight(strList[0], this.font);
        ctx.translate(this.padding.left, this.padding.top);
        for (var i = 0; i < strList.length; i++) {
            ctx.fillText(strList[i], 0, fontHeight * i);
        }
        ctx.translate(-this.padding.left, -this.padding.top);
    };

    sui.Lable = Lable;
}(StardustUI.prototype);