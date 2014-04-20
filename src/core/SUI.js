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
                c.onPaintBackground(ctx);
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