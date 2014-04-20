void function (sui) {
    // TextBox控件数量
    var number = 1;

    function TextBox() {
        sui.Control.apply(this, arguments);

        var _this = this;

        // 设置代码中用来标识该对象的名称
        this.name = "textBox" + number;
        var text = "textBox" + number;
        number++;

        // 设置控件默认内边距
        this.padding = { left: 5, right: 5, top: 5, bottom: 5 };
        // 设置控件默认宽度
        this.width = 100;
        // 设置控件默认高度
        this.height = 21;
        // 设置控件内容文本对齐方式
        this.textAlign = sui.contentAlignment.left;
        // 指示所有字符应保持不变还是应该转换为大写或小写
        this.characterCasing = sui.characterCasing.normal;
        // 指定可以在编辑控件中输入的最大字符数
        this.maxLength = 32767;
        // 控制能否更改编辑控件中的文本
        this.readOnly = false;
        // 设置控件默认光标为文本
        this.cursor = sui.cursors.text;
        // 设置控件默认背景颜色
        this.backColor = "#fff";
        // 指示将为单行编辑控件的密码输入显示的字符
        var passwordChar = null;
        // 设置控件默认边框
        var borderStyle = sui.borderStyle.fixed3D;

        // 文本被改变事件
        this.onTextChanged;

        // 文本内容属性
        Object.defineProperty(this, "text", {
            get: function () { return text; },
            set: function (value) {
                switch (_this.characterCasing) {
                    case sui.characterCasing.lower:
                        value = value.toLowerCase();
                        break;
                    case sui.characterCasing.upper:
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
                    case sui.borderStyle.fixedSingle:
                        _this.padding = { left: 1, right: 1, top: 1, bottom: 1 };
                        break;
                    case sui.borderStyle.fixed3D:
                        _this.padding = { left: 3, right: 3, top: 3, bottom: 3 };
                        break;
                }
            }
        });

        // 移除属性
        delete this.autoSize;

        // 设置点击后进入编辑模式
        this.addEventListener("click", function (e) {
            if (!sui.util.bounds(e, _this) || !_this.isVisible) return;
            if (window.event) e.cancelBubble = true;
            else e.stopPropagation();

            var input = document.createElement("input");
            input.type = _this.passwordChar ? "password" : "text";
            input.id = "SUI-TextBox-Input" + +(new Date());
            input.value = _this.text;
            input.maxLength = _this.maxLength;
            input.readOnly = !_this.isEnable || _this.readOnly;
            input.style.cssText = "margin:0;padding:0;position:absolute;display:block;border:1px solid #000;outline:none;" +
                                 "left:" + (e.pageX - (e.offsetX || e.layerX) + _this.location.x) + "px;" +
                                 "top:" + (e.pageY - (e.offsetY || e.layerY) + _this.location.y) + "px;" +
                                 "width:" + (_this.width) + "px;" +
                                 "height:" + (_this.height) + "px;" +
                                 "line-height:" + (_this.height) + "px;" +
                                 "font:" + _this.font + ";";
            input.addEventListener("keydown", function (ke) {
                if (ke.keyCode == 13) {
                    if (window.event) ke.cancelBubble = true;
                    else ke.stopPropagation();
                    document.body.focus();
                }
            }, false);
            // 当点击到其他区域时取消编辑状态
            input.addEventListener("blur", function () {
                _this.text = input.value;
                document.body.removeChild(input);
            });
            document.body.appendChild(input);
            input.focus();
            sui.util.setCaretPosition(input, input.value.length);
        });
    }

    TextBox.prototype = new SUI.prototype.Control();

    // 缓存TextBox对象原型
    var textBox = TextBox.prototype;

    textBox.onSet = function () {
        /// <summary>设置控件</summary>

        this.bufferCanvas.height = this.height = sui.util.getTextHeight(this.text || "你", this.font) + (this.padding.top + this.padding.bottom);
    };

    textBox.onPaint = function (canvas, ctx) {
        /// <summary>绘制控件</summary>

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        var strList = this.text.split("\r\n");
        var fontHeight = sui.util.getTextHeight(strList[0], this.font);
        ctx.translate(this.padding.left, (this.height - fontHeight) / 2);
        for (var i = 0; i < strList.length; i++) {
            if (this.passwordChar) strList[i] = strList[i].replace(/(.)/g, this.passwordChar);
            ctx.fillText(strList[i], 0, fontHeight * i);
        }
        ctx.translate(-this.padding.left, -((this.height - fontHeight) / 2));
        ctx.clearRect(this.width - this.padding.right, 0, this.padding.right, this.height);

        ctx.strokeStyle = "#888";
        switch (this.borderStyle) {
            case sui.borderStyle.fixedSingle:
                ctx.strokeRect(1, 1, this.width - 2, this.height - 2);
                break;
            case sui.borderStyle.fixed3D:
                ctx.shadowColor = "rgba(50, 50, 50, 0.6)";
                ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 5;
                ctx.strokeStyle = "rgba(0,0,0,0)";
                ctx.strokeRect(1, 1, this.width - 2, this.height - 2);
                ctx.strokeStyle = "#888";
                ctx.strokeRect(1, 1, this.width - 2, this.height - 2);
                break;
        }
    };

    sui.TextBox = TextBox;
}(StardustUI.prototype);