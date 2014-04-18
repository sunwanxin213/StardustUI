﻿void function (sui) {
    // TextBox控件数量
    var number = 1;

    function TextBox() {
        sui.Control.apply(this, arguments);

        var _this = this;

        // 设置代码中用来标识该对象的名称
        this.name = "textBox" + number;
        this.text = "textBox" + number

        // 移除属性
        delete this.autoSize;
        delete this.borderStyle;

        // 设置控件默认边框
        var borderStyle = sui.borderStyle.fixed3D;
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
        })

        // 设置控件默认内边距
        this.padding = { left: 5, right: 5, top: 5, bottom: 5 };
        // 设置控件默认宽度
        this.size.width = 100;
        // 设置控件默认高度
        this.size.height = 21;
        // 设置控件内容文本对齐方式
        this.textAlign = sui.contentAlignment.left;
        // 指示所有字符应保持不变还是应该转换为大写或小写
        this.characterCasing = sui.characterCasing.normal;
        // 指定可以在编辑控件中输入的最大字符数
        this.maxLength = 32767;
        // 指示将为单行编辑控件的密码输入显示的字符
        this.passwordChar = null;
        // 控制能否更改编辑控件中的文本
        this.readOnly = false;
        // 设置控件默认光标为文本
        this.cursor = sui.cursors.text;
        // 设置控件默认背景颜色
        this.backColor = "#fff";

        // 设置鼠标移入样式
        this.addEventListener("mousemove", function (e) {
            if (sui.util.boundsRect(_this.location.x, _this.location.y, _this.location.x + _this.size.width, _this.size.height, e.layerX, e.layerY, 1, 1)) {
                e.target.style.cursor = "default";
            } else {
                for (var i in sui.cursors) {
                    if (sui.cursors[i] == _this.cursor) {
                        e.target.style.cursor = i;
                        return;
                    }
                }
            }
        });

        // 设置点击后进入编辑模式
        this.addEventListener("click", function (e) {
            if (document.getElementById("SUI-TextBox-Span")) {
                return;
            } else {
                var span = document.createElement("span");
                span.style.cssText = "position:absolute;display:block;border:1px solid #000;" +
                                     "left:" + (e.pageX - e.layerX + _this.location.x) + "px;" +
                                     "top:" + (e.pageY - e.layerY + _this.location.y) + "px;" +
                                     "width:" + (_this.size.width) + "px;" +
                                     "height:" + (_this.size.height) + "px;" +
                                     "line-height:" + (_this.size.height) + "px;";
                span.textContent = _this.text;
                span.addEventListener("keydown", function (ke) {
                    if (ke.keyCode == 13) {
                        if (window.event) {
                            ke.cancelBubble = true;
                        } else {
                            ke.stopPropagation();
                        }
                    }
                }, false);
                document.body.appendChild(span);
                span.focus();
            }
        });

        number++;
    }

    TextBox.prototype = new SUI.prototype.Control();

    // 缓存TextBox对象原型
    var textBox = TextBox.prototype;

    textBox.onSet = function () {
        this.bufferCanvas.height = this.size.height = sui.util.getTextHeight(this.text, this.font) + (this.padding.top + this.padding.bottom);
    };

    textBox.onPaint = function (canvas, ctx) {
        /// <summary>绘制控件</summary>

        ctx.fillStyle = this.foreColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        var strList = this.text.split("\r\n");
        var fontHeight = sui.util.getTextHeight(strList[0], this.font);
        ctx.translate(this.padding.left, (this.size.height - fontHeight) / 2);
        for (var i = 0; i < strList.length; i++) {
            ctx.fillText(strList[i], 0, fontHeight * i);
        }
        ctx.translate(-this.padding.left, -((this.size.height - fontHeight) / 2));
        ctx.clearRect(this.size.width - this.padding.right, 0, this.padding.right, this.size.height);

        ctx.strokeStyle = "#888";
        switch (this.borderStyle) {
            case sui.borderStyle.fixedSingle:
                ctx.strokeRect(1, 1, this.size.width - 2, this.size.height - 2);
                break;
            case sui.borderStyle.fixed3D:
                ctx.shadowColor = "rgba(50, 50, 50, 0.6)";
                ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
                ctx.shadowBlur = 5;
                ctx.strokeStyle = "rgba(0,0,0,0)";
                ctx.strokeRect(1, 1, this.size.width - 2, this.size.height - 2);
                ctx.strokeStyle = "#888";
                ctx.strokeRect(1, 1, this.size.width - 2, this.size.height - 2);
                break;
        }
    };

    sui.TextBox = TextBox;
}(StardustUI.prototype);