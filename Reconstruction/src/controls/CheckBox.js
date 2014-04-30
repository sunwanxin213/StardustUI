void function ($S) {

    var _page = $S.Util.Page;
    var _enum = $S.Enum;

    function CheckBox() {
        $S.Control.apply(this, arguments);

        var _this = this;

        // 设置默认文本
        this.text = "checkBox";
        // 设置确定控件外观的值
        this.appearance = _enum.appearance.normal;
        // 设置控件默认自动大小
        this.autoSize = true;
        // 设置控件上复选框的水平和垂直对齐方式
        this.checkAlign = _enum.contentAlignment.middleLeft;
        // 设置是否处于选中状态
        this.checked = false;
        // 设置控件的状态
        this.checkState = _enum.checkState.unchecked;
        // 设置此控件是否允许三种复选状态而不是两种
        this.threeState = false;
        // 设置控件默认内边距
        this.padding = { left: 3, right: 3, top: 3, bottom: 3 };
        // 设置控件默认宽度
        this.width = 78;
        // 设置控件默认高度
        this.height = 16;
        // 设置控件内容文本对齐方式
        this.textAlign = _enum.contentAlignment.middleCenter;

        // 状态被改变事件
        this.onCheckedChanged;
    }

    CheckBox.prototype = new $S.Control();

    // 缓存CheckBox对象原型
    var checkBox = CheckBox.prototype;

    checkBox._onClick = function (e) {
        /// <summary>点击后更改状态</summary>

        if (this.threeState) {
            if (this.checkState == _enum.checkState.unchecked) this.checkState = _enum.checkState.checked;
            else if (this.checkState == _enum.checkState.checked) this.checkState = _enum.checkState.indeterminate;
            else if (this.checkState == _enum.checkState.indeterminate) this.checkState = _enum.checkState.unchecked;
        }
        else {
            this.checked = !_this.checked;
        }
        this.onCheckedChanged && _this.onCheckedChanged();
        this.hasChange = true;
    };

    checkBox.onSet = function () {
        if (this.autoSize) {
            var maxWidth = _page.getTextWidth(this.text, this.font),
                maxHeight = _page.getTextHeight(this.text, this.font);
            this.bufferCanvas.width = this.width = maxWidth + this.left + this.right + 18;
            this.bufferCanvas.height = this.height = maxHeight + this.top + this.bottom;
        }
    };

    checkBox.onPaint = function (canvas, ctx) {
        /// <summary>绘制控件</summary>

        var ctx = this.bufferCtx;

        ctx.save();

        var cf = ["#fff", "fill", "#888", "stroke"];
        for (var i = 0; i < cf.length; i += 2) {
            ctx[cf[i + 1] + "Style"] = cf[i];
            ctx[cf[i + 1] + "Rect"](this.left, (this.height - 15) / 2, 15, 15);
        }

        if ((this.checked && !this.threeState) || (this.threeState && this.checkState == _enum.checkState.checked)) {
            ctx.strokeStyle = "#f00";
            ctx.moveTo(this.left + 3, (this.height - 15) / 2 + 5);
            ctx.lineTo(this.left + 8, (this.height - 15) / 2 + 13);
            ctx.lineTo(this.left + 13, (this.height - 15) / 2 + 2);
            ctx.stroke();
        }
        if (this.threeState && this.checkState == _enum.checkState.indeterminate) {
            ctx.fillStyle = "#fcc";
            ctx.fillRect(this.left, (this.height - 15) / 2, 15, 15);
        }

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        ctx.fillText(this.text,
                     (this.width - _page.getTextWidth(this.text, this.font)) / 2 + 9,
                     (this.height - _page.getTextHeight(this.text, this.font)) / 2);

        ctx.restore();
    };

    $S.CheckBox = CheckBox;
}(StardustUI.prototype);