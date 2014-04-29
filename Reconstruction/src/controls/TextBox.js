void function ($S) {

    function TextBox() {
        $S.Control.apply(this, arguments);

        var _this = this;

        // 设置控件默认内边距
        this.padding = { left: 5, right: 5, top: 5, bottom: 5 };
        // 设置控件默认宽度
        this.width = 100;
        // 设置控件默认高度
        this.height = 21;
        // 设置控件内容文本对齐方式
        this.textAlign = $S.Enum.contentAlignment.left;
        // 指示所有字符应保持不变还是应该转换为大写或小写
        this.characterCasing = $S.Enum.characterCasing.normal;
        // 指定可以在编辑控件中输入的最大字符数
        this.maxLength = 32767;
        // 控制能否更改编辑控件中的文本
        this.readOnly = false;
        // 设置控件默认光标为文本
        this.cursor = $S.Enum.cursors.text;
        // 设置控件默认背景颜色
        this.backColor = "#fff";
        // 指示将为单行编辑控件的密码输入显示的字符
        var passwordChar = null;
        // 设置控件默认边框
        var borderStyle = $S.Enum.borderStyle.fixed3D;

        // 设置默认文本
        var text = "textBox";
        Object.defineProperty(this, "text", {
            get: function () { return text; },
            set: function (value) {
                switch (_this.characterCasing) {
                    case $S.Enum.characterCasing.lower:
                        value = value.toLowerCase();
                        break;
                    case $S.Enum.characterCasing.upper:
                        value = value.toUpperCase();
                        break;
                }
                if (_this.onTextChanged && text != value) {
                    _this.onTextChanged({
                        oldValue: text,
                        newValue: value
                    });
                }
                text = value;
            }
        });

        // 文本被改变事件
        this.onTextChanged;

        // 密码字符属性
        Object.defineProperty(this, "passwordChar", {
            get: function () { return passwordChar; },
            set: function (value) {
                value && (passwordChar = value[0]);
            }
        });

        // 控件默认边框属性
        Object.defineProperty(this, "borderStyle", {
            get: function () { return borderStyle; },
            set: function (value) {
                borderStyle = value;
                switch (value) {
                    case $S.Enum.borderStyle.fixedSingle:
                        _this.padding = { left: 1, right: 1, top: 1, bottom: 1 };
                        break;
                    case $S.Enum.borderStyle.fixed3D:
                        _this.padding = { left: 3, right: 3, top: 3, bottom: 3 };
                        break;
                }
            }
        });
    }

    TextBox.prototype = new $S.Control();

    var textCanvas;
    var textCtx;
    window.addEventListener("load", function () {
        textCanvas = document.createElement("canvas");
        textCtx = textCanvas.getContext("2d");
    }, false);

    // 缓存textBox对象原型
    var textBox = TextBox.prototype;

    textBox._onClick = function (e) {
        // 设置点击后进入编辑模式

        var _this = this;

        if (!$S.Util.Page.bounds(e, this) || !this.visible) return;
        if (window.event) e.cancelBubble = true;
        else e.stopPropagation();

        var input = document.createElement("input");
        input.type = this.passwordChar ? "password" : "text";
        input.id = "SUI-TextBox-Input" + +(new Date());
        input.value = this.text;
        input.maxLength = this.maxLength;
        input.readOnly = !this.enable || this.readOnly;
        input.style.cssText = "margin:0;padding:0;position:absolute;display:block;border:1px solid #000;outline:none;" +
                             "left:" + (e.pageX - (e.offsetX || e.layerX) + this.location.x) + "px;" +
                             "top:" + (e.pageY - (e.offsetY || e.layerY) + this.location.y) + "px;" +
                             "width:" + (this.width) + "px;" +
                             "height:" + (this.height) + "px;" +
                             "line-height:" + (this.height) + "px;" +
                             "font:" + this.font + ";";
        input.addEventListener("keydown", function (ke) {
            if (ke.keyCode == 13) {
                if (window.event) ke.cancelBubble = true;
                else ke.stopPropagation();
                input.blur();
                $S.Util.Ime.close();
            }
        }, false);
        // 当点击到其他区域时取消编辑状态
        input.addEventListener("blur", function () {
            $S.Util.Ime.close();
            _this.text = input.value;
            document.body.removeChild(input);
        });
        document.body.appendChild(input);
        input.focus();
        $S.Util.Page.setCaretPosition(input, input.value.length);

        this.onClick && this.onClick(e);
    };

    textBox.onSet = function () {
        /// <summary>设置控件</summary>

        this.bufferCanvas.height = this.height = $S.Util.Page.getTextHeight(this.text || "你", this.font) + (this.padding.top + this.padding.bottom);
    };

    textBox.onPaint = function () {
        /// <summary>绘制控件</summary>

        var ctx = this.bufferCtx;

        ctx.save();

        textCanvas.width = this.width;
        textCanvas.height = this.height;

        textCtx.fillStyle = this.foreColor;
        textCtx.font = this.font;
        textCtx.textBaseline = "top";
        var strList = this.text.split("\r\n");
        var fontHeight = $S.Util.Page.getTextHeight(strList[0], this.font);
        textCtx.translate(this.padding.left, (this.height - fontHeight) / 2);
        for (var i = 0; i < strList.length; i++) {
            if (this.passwordChar) strList[i] = strList[i].replace(/(.)/g, this.passwordChar);
            textCtx.fillText(strList[i], 0, fontHeight * i);
        }
        textCtx.translate(-this.padding.left, -((this.height - fontHeight) / 2));
        textCtx.clearRect(this.width - this.padding.right, 0, this.padding.right, this.height);
        ctx.drawImage(textCanvas, 0, 0);

        ctx.restore();
    };

    $S.Control.TextBox = TextBox;
}(StardustUI.prototype);