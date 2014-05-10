void function ($S) {

    var _page = $S.Util.Page;
    var _enum = $S.Enum;

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
        this.textAlign = _enum.contentAlignment.left;
        // 指示所有字符应保持不变还是应该转换为大写或小写
        this.characterCasing = _enum.characterCasing.normal;
        // 指定可以在编辑控件中输入的最大字符数
        this.maxLength = 32767;
        // 控制能否更改编辑控件中的文本
        this.readOnly = false;
        // 设置控件默认光标为文本
        this.cursor = _enum.cursors.text;
        // 设置控件默认背景颜色
        this.backColor = "#fff";
        // 指示将为单行编辑控件的密码输入显示的字符
        var passwordChar = null;
        // 设置控件默认边框
        var borderStyle = _enum.borderStyle.fixed3D;

        // 设置默认文本
        var text = "textBox";
        Object.defineProperty(this, "text", {
            get: function () { return text; },
            set: function (value) {
                switch (_this.characterCasing) {
                    case _enum.characterCasing.lower:
                        value = value.toLowerCase();
                        break;
                    case _enum.characterCasing.upper:
                        value = value.toUpperCase();
                        break;
                }
                if (_this.onTextChanged && text != value) {
                    _this.onTextChanged({ oldValue: text, newValue: value });
                }
                text = value;
                _this.hasChange = true;
            },
            configurable: true
        });

        // 文本被改变事件
        this.onTextChanged;

        // 密码字符属性
        Object.defineProperty(this, "passwordChar", {
            get: function () { return passwordChar; },
            set: function (value) {
                value && (passwordChar = value[0]);
                _this.hasChange = true;
            },
            configurable: true
        });

        // 控件默认边框属性
        Object.defineProperty(this, "borderStyle", {
            get: function () { return borderStyle; },
            set: function (value) {
                if (borderStyle == value) return;
                borderStyle = value;
                switch (value) {
                    case _enum.borderStyle.fixedSingle:
                        _this.padding = { left: 1, right: 1, top: 1, bottom: 1 };
                        break;
                    case _enum.borderStyle.fixed3D:
                        _this.padding = { left: 3, right: 3, top: 3, bottom: 3 };
                        break;
                }
                _this.hasChange = true;
            },
            configurable: true
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

    var input = null;
    textBox._onClick = function (e) {
        // 设置点击后进入编辑模式

        var _this = this;

        if (!_page.bounds(e, this) || !this.visible || !this.enable) return;
        if (window.event) e.cancelBubble = true;
        else e.stopPropagation();

        _this.hasChange = true;
        input = document.createElement("input");
        input.type = this.passwordChar ? "password" : "text";
        input.id = "SUI-TextBox-Input" + +(new Date());
        input.value = this.text;
        input.maxLength = this.maxLength;
        input.readOnly = this.readOnly;

        var obj = e.target;
        var style = document.defaultView.getComputedStyle(obj);
        var styleWidth = (style.width.replace(/\px/g, "")) | 0,
            styleHeight = (style.height.replace(/\px/g, "")) | 0;
        var scaleW = (styleWidth / obj.width),
            scaleH = (styleHeight / obj.height);

        var fontMatch = this.font.match(/(\d+)(px|PX)/);
        var scaleFont = this.font;
        if (fontMatch) {
            scaleFont = this.font.replace(fontMatch[1], parseInt(fontMatch[1]) * scaleW);
        }

        input.style.cssText = "margin:0;padding:0;position:absolute;display:block;border:1px solid rgba(50,50,50,0.8);outline:none;" +
                              "left:" + (e.pageX - (e.offsetX || e.layerX) + this.location.x * scaleW) + "px;" +
                              "top:" + (e.pageY - (e.offsetY || e.layerY) + this.location.y * scaleH) + "px;" +
                              "padding-left:" + _this.padding.left + "px;" +
                              "width:" + (this.width * scaleW - _this.padding.right / 2 - _this.padding.left) + "px;" +
                              "height:" + (this.height * scaleH - _this.padding.bottom / 2) + "px;" +
                              "line-height:" + (this.height) + "px;" +
                              "font:" + scaleFont + ";" +
                              "color:" + this.foreColor + ";" +
                              "background:" + this.backColor;

        input.addEventListener("keydown", function (ke) {
            if (ke.keyCode == 13) {
                if (window.event) ke.cancelBubble = true;
                else ke.stopPropagation();
                input.blur();
            }
        }, false);
        // 当点击到其他区域时取消编辑状态
        input.addEventListener("blur", function () {
            $S.Util.Ime.close();
            if ($S.Util.Ime.isEnable && $S.Util.Ime.isEnable()) return;
            _this.text = input.value;
            document.body.removeChild(input);
            input = null;
            _this.hasChange = true;
        });
        input.parentControl = this;
        document.body.appendChild(input);
        input.focus();
        _page.setCaretPosition(input, input.value.length);

        this.onClick && this.onClick(e);
    };

    textBox.onSet = function () {
        /// <summary>设置控件</summary>

        this.bufferCanvas.width = this.width;
        this.bufferCanvas.height = this.height = _page.getTextHeight(this.text || "你", this.font) + (this.padding.top + this.padding.bottom);
    };

    textBox.onPaint = function () {
        /// <summary>绘制控件</summary>

        var ctx = this.bufferCtx;

        if (input && input.parentControl == this) return;

        ctx.save();

        textCanvas.width = this.width;
        textCanvas.height = this.height;

        textCtx.fillStyle = this.foreColor;
        textCtx.font = this.font;
        textCtx.textBaseline = "top";
        var strList = this.text.split("\r\n");
        var fontHeight = _page.getTextHeight(strList[0], this.font);
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