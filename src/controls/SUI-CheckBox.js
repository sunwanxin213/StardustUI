/// <reference path="../core/SUI.js" />
/// <reference path="../core/SUI-Enum.js" />
/// <reference path="SUI-Control.js" />
void function (sui) {
    // CheckBox控件数量
    var number = 1;

    function CheckBox() {
        sui.Control.apply(this, arguments);

        var _this = this;

        // 设置代码中用来标识该对象的名称
        this.name = "checkBox" + number;
        this.text = "checkBox" + number;
        number++;

        // 设置确定控件外观的值
        this.appearance = sui.appearance.normal;
        // 设置控件默认自动大小
        this.autoSize = true;
        // 设置控件上复选框的水平和垂直对齐方式
        this.checkAlign = sui.contentAlignment.middleLeft;
        // 设置是否处于选中状态
        this.checked = false;
        // 设置控件的状态
        this.checkState = sui.checkState.unchecked;
        // 设置此控件是否允许三种复选状态而不是两种
        this.threeState = false;
        // 设置控件默认内边距
        this.padding = { left: 3, right: 3, top: 3, bottom: 3 };
        // 设置控件默认宽度
        this.width = 78;
        // 设置控件默认高度
        this.height = 16;
        // 设置控件内容文本对齐方式
        this.textAlign = sui.contentAlignment.middleCenter;

        // 状态被改变事件
        this.onCheckedChanged;

        // 设置点击后进入编辑模式
        this.addEventListener("click", function (e) {
            if (!sui.util.bounds(e, _this) || !_this.isVisible) return;
            if (window.event) e.cancelBubble = true;
            else e.stopPropagation();
            if (_this.threeState) {
                if (_this.checkState == sui.checkState.unchecked) _this.checkState = sui.checkState.checked;
                else if (_this.checkState == sui.checkState.checked) _this.checkState = sui.checkState.indeterminate;
                else if (_this.checkState == sui.checkState.indeterminate) _this.checkState = sui.checkState.unchecked;
            }
            else {
                _this.checked = !_this.checked;
            }
            _this.onCheckedChanged && _this.onCheckedChanged();
        });
    }

    CheckBox.prototype = new SUI.prototype.Control();

    // 缓存CheckBox对象原型
    var checkBox = CheckBox.prototype;

    checkBox.onSet = function () {
        if (this.autoSize) {
            var maxWidth = sui.util.getTextWidth(this.text, this.font),
                maxHeight = sui.util.getTextHeight(this.text, this.font);
            this.bufferCanvas.width = this.size.width = maxWidth + this.padding.left + this.padding.right + 18;
            this.bufferCanvas.height = this.size.height = maxHeight + this.padding.top + this.padding.bottom;
        }
    };

    checkBox.onPaint = function (canvas, ctx) {
        /// <summary>绘制控件</summary>

        ctx.save();

        ctx.fillStyle = "rgba(50,50,50,0.1)";
        ctx.fillRect(this.padding.left, (this.height - 15) / 2, 15, 15);
        ctx.strokeStyle = "#888";
        ctx.strokeRect(this.padding.left, (this.height - 15) / 2, 15, 15);

        if ((this.checked && !this.threeState) || (this.threeState && this.checkState == sui.checkState.checked)) {
            ctx.strokeStyle = "#f00";
            ctx.moveTo(this.padding.left + 3, (this.height - 15) / 2 + 5);
            ctx.lineTo(this.padding.left + 8, (this.height - 15) / 2 + 13);
            ctx.lineTo(this.padding.left + 13, (this.height - 15) / 2 + 2);
            ctx.stroke();
        }
        if (this.threeState && this.checkState == sui.checkState.indeterminate) {
            ctx.fillStyle = "#fcc";
            ctx.fillRect(this.padding.left, (this.height - 15) / 2, 15, 15);
        }

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        ctx.fillText(this.text,
                     (this.width - sui.util.getTextWidth(this.text, this.font)) / 2 + 9,
                     (this.height - sui.util.getTextHeight(this.text, this.font)) / 2);

        ctx.restore();
    };

    sui.CheckBox = CheckBox;
}(StardustUI.prototype);