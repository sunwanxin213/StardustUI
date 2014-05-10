void function ($S) {

    var _page = $S.Util.Page;
    var _enum = $S.Enum;

    function LinkLable() {
        $S.Control.apply(this, arguments);

        var _this = this;

        // 设置为自动调整大小
        this.autoSize = true;
        // 指针移过该控件时显示的光标
        this.cursor = _enum.cursors.pointer;
        // 设置控件默认宽度
        this.size.width = 350;
        // 设置控件默认高度
        this.size.height = 120;
        // 设置控件内容文本对齐方式
        this.textAlign = _enum.contentAlignment.topLeft;
        // 设置控件默认内边距
        this.padding = { left: 3, right: 3, top: 3, bottom: 3 };

        // 确定当用户单击超链接时超链接的颜色
        var activeLinkColor = "#f00";
        Object.defineProperty(this, "activeLinkColor", {
            get: function () { return activeLinkColor; },
            set: function (value) {
                if (activeLinkColor != (value = value || "#f00")) {
                    activeLinkColor = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 确定当超链接被禁用时的颜色
        var disabledLinkColor = "rgb(133,133,133)";
        Object.defineProperty(this, "disabledLinkColor", {
            get: function () { return disabledLinkColor; },
            set: function (value) {
                if (disabledLinkColor != (value = value || "rgb(133,133,133)")) {
                    disabledLinkColor = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 确定该超链接的下划线行为
        var linkBehavior = _enum.linkBehavior.alwaysUnderline;
        Object.defineProperty(this, "linkBehavior", {
            get: function () { return linkBehavior; },
            set: function (value) {
                if (value) {
                    linkBehavior = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 确定超链接处于默认状态时的颜色
        var linkColor = "#00f";
        Object.defineProperty(this, "linkColor", {
            get: function () { return linkColor; },
            set: function (value) {
                if (linkColor != (value = value || "#00f")) {
                    linkColor = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 确定超链接是否应按已访问的样式呈现
        var linkVisited = false;
        Object.defineProperty(this, "linkVisited", {
            get: function () { return linkVisited; },
            set: function (value) {
                if (linkVisited != (value = !!value)) {
                    linkVisited = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 确定当LinkVisited属性设置为true时超链接的颜色
        var visitedLinkColor = "rgb(128,0,128)";
        Object.defineProperty(this, "visitedLinkColor", {
            get: function () { return visitedLinkColor; },
            set: function (value) {
                if (visitedLinkColor != (value = value || "rgb(128,0,128)")) {
                    visitedLinkColor = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 设置默认文本
        var text = "linkLable";
        Object.defineProperty(this, "text", {
            get: function () { return text; },
            set: function (value) {
                text = value;
                _this.hasChange = true;
            },
            configurable: true
        });
    }

    LinkLable.prototype = new $S.Control();

    // 缓存LinkLable对象原型
    var linkLable = LinkLable.prototype;

    linkLable._onClick = function (e) {
        /// <summary>点击后内部处理</summary>

        this.onClick && this.onClick(e);
        this.linkVisited = true;
    };

    linkLable.onSet = function () {
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

    linkLable.onPaint = function () {
        /// <summary>绘制控件</summary>

        var ctx = this.bufferCtx;

        ctx.save();

        if (!this.enable) ctx.fillStyle = this.disabledLinkColor;
        else if (this._isMouseEnter) ctx.fillStyle = this.activeLinkColor;
        else if (this.linkVisited) ctx.fillStyle = this.visitedLinkColor;
        else ctx.fillStyle = this.linkColor;
        ctx.font = this.font;
        ctx.textBaseline = "top";
        var strList = this.text.split("\r\n");
        var fontHeight = _page.getTextHeight(strList[0], this.font);
        ctx.translate(this.padding.left, this.padding.top);
        for (var i = 0; i < strList.length; i++) {
            ctx.fillText(strList[i], 0, fontHeight * i);
            if (this.linkBehavior == _enum.linkBehavior.alwaysUnderline || (this.linkBehavior == _enum.linkBehavior.hoverUnderline && this._isMouseEnter)) {
                ctx.fillRect(0, this.height - this.bottom - this.top, _page.getTextWidth(strList[i], this.font), 1);
            }
        }
        ctx.translate(-this.padding.left, -this.padding.top);

        ctx.restore();
    };

    $S.Control.LinkLable = LinkLable;
}(StardustUI.prototype);