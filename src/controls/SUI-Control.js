void function (sui) {
    sui.Control = function () {
        /// <summary>控件基础对象</summary>

        var _this = this;

        // 指示控件是否可以接受用户拖到它上面的数据
        var allowDrow = false;

        // 子控件列表
        this.controlList = [];

        // 缓存画布
        this.bufferCanvas = document.createElement("canvas");
        // 缓存画布上下文
        this.bufferCtx = this.bufferCanvas.getContext("2d");

        // 指示代码中用来标识该对象的名称
        this.name = "";

        // 指示当控件内容大于它的可见区域时是否自动显示滚动条
        this.autoScroll = false;
        // 指示当前控件是否可以根据内容自动调整大小
        this.autoSize = false;
        // 组件的背景色
        this.backColor = "#f0f0f0";
        // 用于该控件的背景图像
        this.backgroundImage = null;
        // 用于组件的背景图像布局
        this.backgroundImageLayout = sui.imageLayout.tile;
        // 指示面板是否应具有边框
        this.borderStyle = sui.borderStyle.none;
        // 当用户右击该控件时显示的快捷菜单
        this.contextMenuStrip = null;
        // 指针移过该控件时显示的光标
        this.cursor = sui.cursors.default;
        // 指示是否已启用该控件
        this.isEnable = true;
        // 用于显示控件中文本的字体
        this.font = "9pt 宋体";
        // 此组件的前景色,用于显示文本
        this.foreColor = "#000";
        // 控件左上角相对于其容器左上角的坐标
        this.location = { x: 0, y: 0 };
        // 指定控件的内部边距
        this.padding = { left: 0, top: 0, right: 0, bottom: 0 };
        // 控件的大小(以像素为单位)
        this.size = { width: 150, height: 150 };
        // Z排序
        this.zIndex = 0;
        // 控件是否可见
        this.isVisible = true;

        // 控件X坐标属性
        Object.defineProperty(this, "x", {
            get: function () { return _this.location.x; },
            set: function (value) { _this.location.x = value; }
        });

        // 控件Y坐标属性
        Object.defineProperty(this, "y", {
            get: function () { return _this.location.y; },
            set: function (value) { _this.location.y = value; }
        });

        // 控件宽度属性
        Object.defineProperty(this, "width", {
            get: function () { return _this.size.width; },
            set: function (value) { _this.size.width = value; }
        });

        // 控件高度属性
        Object.defineProperty(this, "height", {
            get: function () { return _this.size.height; },
            set: function (value) { _this.size.height = value; }
        });

        // 指示控件是否可以接受用户拖到它上面的数据
        Object.defineProperty(this, "allowDrow", {
            get: function () { return allowDrow; },
            set: function (value) {
                allowDrow = value;
                /* 事件绑定或移除 */
            }
        });

        this.addControl = function (control) {
            /// <summary>添加控件</summary>
            /// <param name="control" type="SUI.prototype.Control">控件对象</param>

            addControl(this, control);
        };

        this.removeControl = function (control) {
            /// <summary>移除控件</summary>
            /// <param name="control" type="SUI.prototype.Control">控件对象</param>

            removeControl(this, control);
        };

        // 事件监听列表
        this.listenerList = [];
        this.addEventListener = function (type, listener, o) {
            /// <summary>添加事件监听函数</summary>
            /// <param name="type" type="String">事件类型</param>
            /// <param name="listener" type="EventListener">事件监听函数</param>

            listener.eventRandomTag = "SUIEventListener" + new Date().getTime();
            this.listenerList.push({ name: type.toLowerCase(), callback: listener, o: o });
        };

        this.removeEventListener = function (type, listener, o) {
            /// <summary>移除事件监听函数</summary>
            /// <param name="type" type="String">事件类型</param>
            /// <param name="listener" type="EventListener">事件监听函数</param>

            for (var i = this.listenerList.length; i--;) if (this.listenerList[i].eventRandomTag == listener.eventRandomTag) return ((this.listenerList = this.listenerList.slice(0, i).concat(this.listenerList.slice(i + 1, this.listenerList.length))) && true);
        };
    };

    sui.Control.prototype.onPaintBackground = function (ctx) {
        /// <summary>绘制控件背景事件</summary>

        ctx.save();
        ctx.fillStyle = this.backColor;
        ctx.fillRect(0, 0, this.width, this.height);

        // 控件平面样式外观
        if ("flatStyle" in this) {
            // 背景颜色
            var c1 = "rgba(230,230,230,1)", c2 = "rgba(210,210,210,1)";
            if (this._isMouseEnter) {
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
                    if (this._isMouseEnter) {
                        ctx.fillStyle = c2;
                        ctx.fillRect(0, 0, this.width, this.height);
                    }
                    break;
                case sui.flatStyle.popup:
                    if (this._isMouseEnter) {
                        ctx.fillStyle = bgGradient;
                        ctx.fillRect(0, 0, this.width, this.height);
                    }
                    break;
            }
        }

        // 控件边框样式
        if ("borderStyle" in this) {
            ctx.strokeStyle = "#888";
            switch (this.borderStyle) {
                case sui.borderStyle.fixedSingle:
                    ctx.strokeRect(0, 0, this.width, this.height);
                    break;
                case sui.borderStyle.fixed3D:
                    ctx.shadowColor = "rgba(50, 50, 50, 0.6)";
                    ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 5;
                    ctx.strokeStyle = "rgba(0,0,0,0)";
                    ctx.strokeRect(0, 0, this.width, this.height);
                    ctx.strokeStyle = "#888";
                    ctx.strokeRect(0, 0, this.width, this.height);
                    break;
            }
        }
        ctx.restore();
    };


}(StardustUI.prototype);