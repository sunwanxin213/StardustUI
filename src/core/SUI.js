void function (w) {
    function SUI(ctx) {
        if (!(ctx instanceof CanvasRenderingContext2D)) {
            throw new Error("只能使用CanvasRenderingContext2D");
        }

        // 禁止右键菜单
        ctx.canvas.oncontextmenu = function () { return false; };

        // 禁止拖拽
        ctx.canvas.setAttribute("draggable", "false");

        var _this = this;

        // 缓存上下文对象
        this.context = ctx;

        // 控件列表
        this.controlList = [];

        this.addEventListener = function (name, callback, o) {
            ctx.canvas.addEventListener(name, callback, o);
        };
        this.removeEventListener = function (name, callback, o) {
            ctx.canvas.removeEventListener(name, callback, o);
        };

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

        // 监测光标样式变更
        this.addEventListener("mousemove", function (e) {
            var c = null;
            for (var i in _this.controlList) {
                c = _this.controlList[i];
                if (!sui.util.bounds(e, c) || !c.isVisible) {
                    e.target.style.cursor = "default";
                } else {
                    for (var i in sui.cursors) {
                        if (sui.cursors[i] == c.cursor) {
                            e.target.style.cursor = i;
                            return;
                        }
                    }
                }
            }
        }, false);

        this.draw = function () {
            var list = this.controlList,
                c = null,
                canvas = null,
                ctx = null;
            list.sort(function (n, m) {
                return n.zIndex > m.zIndex;
            });
            for (var i = 0; i < list.length; i++) {
                c = list[i],
                canvas = c.bufferCanvas,
                ctx = c.bufferCtx;

                if (!c.isVisible) continue;

                c.onSet && c.onSet();

                canvas.width = c.size.width,
                canvas.height = c.size.height;

                ctx.save();
                ctx.fillStyle = c.backColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                c.onPaint(canvas, ctx)
                this.context.drawImage(canvas, c.location.x, c.location.y);
                ctx.restore();
            }
        };
    }

    // 已用控件名称
    var controlNames = [];

    // 缓存SUI原型对象
    var sui = SUI.prototype;

    SUI.prototype.Control = function () {
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

    function addControl(target, control) {
        /// <summary>添加控件</summary>
        /// <param name="target" type="Object">目标对象</param>
        /// <param name="control" type="SUI.prototype.Control">控件对象</param>

        if (!(control instanceof SUI.prototype.Control)) throw new Error("无法将其他类型对象做为控件添加");
        for (var i = controlNames.length; i--;) {
            if (controlNames[i].name == control.name) throw new Error("控件名称与现有控件名称重复");
        }
        controlNames.push(control.name);
        target.controlList.push(control);
        for (var i = 0; i < control.listenerList.length; i++) {
            target.addEventListener(control.listenerList[i].name, control.listenerList[i].callback, control.listenerList[i].o);
        }
    }

    function removeControl(target, control) {
        /// <summary>移除控件</summary>
        /// <param name="target" type="Ojbect">目标对象</param>
        /// <param name="control" type="SUI.prototype.Control">控件对象</param>

        if (!(control instanceof SUI.prototype.Control)) throw new Error("无法将其他类型对象做为控件添加");
        for (var i = controlNames.length; i--;) {
            if (controlNames[i].name == control.name) {
                (controlNames = controlNames.slice(0, i).concat(controlNames.slice(i + 1, controlNames.length)));
                for (var n = target.controlList.length; n--;) {
                    if (target.controlList[n].name == control.name) {
                        for (var i = 0; i < control.listenerList.length; i++) {
                            target.removeEventListener(control.listenerList[i].name, control.listenerList[i].callback);
                        }
                        return ((target.controlList = target.controlList.slice(0, n).concat(target.controlList.slice(n + 1, target.controlList.length))) && true);
                    }
                }
            }
        }
    }

    w.SUI = w.StardustUI = SUI;
}(window);