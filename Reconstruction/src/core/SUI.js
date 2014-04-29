void function (w) {

    function StardustUI(context) {
        /// <summary>StardustUI类</summary>
        /// <param name="context" type="CanvasRenderingContext2D">2D上下文对象</param>
        /// <returns type="StardustUI"></returns>

        if (!(this instanceof StardustUI)) {
            /* 若用户未手动实例化则自动实例化 */
            return new StardustUI(container);
        }

        var _this = this;

        // 元素对象[只读]
        Object.defineProperty(this, "element", {
            get: function () { return context.canvas; }
        });

        // 渲染上下对象[只读]
        Object.defineProperty(this, "context", {
            get: function () { return context; }
        });

        // 窗口列表
        this.windows = [];

        // 当前使用的窗口
        this.currentWindow = null;

        // 绑定检测鼠标移动事件
        this.element.addEventListener("mousemove", function (e) {
            _this.onMouseMove(e);
        });

        // 绑定鼠标点击事件
        this.element.addEventListener("click", function (e) {
            _this.onClick(e);
        });

        this.mouseEventProcess = function (e, callback) {
            /// <summary>鼠标事件处理器</summary>

            if (!_this.currentWindow) return;
            var control,
                cl = _this.currentWindow.controls;
            for (var i = cl.length; i--;) {
                control = cl[i];
                if (_this.Util.Page.bounds(e, control) && control.visible && control.enable) {
                    callback && callback(control);
                    if (control != _this.currentWindow) {
                        if (window.event) e.cancelBubble = true;
                        else e.stopPropagation();
                    }
                    break;
                } else {
                    e.target.style.cursor = "default";
                }
            }
        };
    }

    StardustUI.prototype = {
        addWindow: function (window) {
            /// <summary>添加窗口</summary>
            /// <param name="window" type="StardustUI.Control.Window">窗口对象</param>

            for (var i = this.windows.length; i--;) {
                if (this.windows[i] == window) return;
            }
            this.windows.push(window);
        },
        removeWindow: function (window) {
            /// <summary>移除窗口</summary>
            /// <param name="window" type="StardustUI.Control.Window">窗口对象</param>

            for (var i = this.windows.length; i--;) {
                if (this.windows[i] == window) {
                    this.windows = this.windows.remove(i);
                    return;
                }
            }
        },
        clearWindows: function () {
            /// <summary>清空窗口</summary>

            this.windows.clear();
        },
        useWindow: function (window) {
            /// <summary>使用窗口</summary>
            /// <param name="window" type="StardustUI.Control.Window">窗口对象</param>

            if (!(window instanceof this.Control.Window)) return this.currentWindow = null;
            window.size = { width: this.element.width, height: this.element.height };
            window.location = { left: 0, top: 0 };
            window.zIndex = 0;
            this.currentWindow = window;
        },
        onMouseMove: function (e) {
            /// <summary>检测鼠标移动事件</summary>
            /// <param name="e" type="MouseEvent">鼠标事件参数</param>

            var _this = this;

            this.mouseEventProcess(e, function (control) {
                for (var i in _this.Enum.cursors) {
                    if (_this.Enum.cursors[i] == control.cursor) {
                        return e.target.style.cursor = i;
                    }
                }
                control._onMouseMove && control._onMouseMove(e);
            });
        },
        onClick: function (e) {
            /// <summary>检测鼠标单击事件</summary>
            /// <param name="e" type="MouseEvent">鼠标事件参数</param>

            var _this = this;

            this.mouseEventProcess(e, function (control) {
                switch (control.imeMode) {
                    case _this.Enum.imeMode.on:
                        _this.Util.Ime.enable();
                        break;
                    case _this.Enum.imeMode.off:
                        _this.Util.Ime.close();
                        break;
                }
                control._onClick && control._onClick(e);
            });
        },
        update: function () {
            /// <summary>更新内容</summary>

            if (!this.currentWindow) return;
            var control = null,
                cl = this.currentWindow.controls;
            function updateSub(parent, cl) {
                if (!parent.visible) return;
                parent.onSet();
                parent.onPaintBackground();
                parent.onPaint();
                for (var i = 0; i < cl.length; i++) {
                    control = cl[i];
                    control.onSet();
                    control.onPaintBackground();
                    control.onPaint();
                    if (control.controls.length) {
                        updateSub(control, control.controls);
                    }
                }
            }
            updateSub(this.currentWindow, cl);
        },
        draw: function () {
            /// <summary>绘制界面</summary>
            
            var _this = this;

            if (!this.currentWindow) return;
            var control = null,
                cl = this.currentWindow.controls;
            cl.sort(function (n, m) { return n.zIndex > m.zIndex; });
            function drawSub(parent, cl) {
                if (!parent.visible) return;
                for (var i = 0; i < cl.length; i++) {
                    control = cl[i];
                    if (!control.visible) continue;
                    if (control.controls.length) {
                        drawSub(control, control.controls);
                    }
                    parent.bufferCtx.drawImage(control.bufferCanvas, control.x, control.y);
                }
                _this.context.drawImage(parent.bufferCanvas, 0, 0);
            }
            drawSub(this.currentWindow, cl);
            this.context.drawImage(this.currentWindow.bufferCanvas, 0, 0);
        }
    };

    Array.prototype.insert = function (value, index) {
        /// <summary>插入项</summary>
        /// <param name="value" type="Object">元素</param>
        /// <param name="index" type="Number">索引</param>
        /// <returns type="Array">数组</returns>

        var arrTemp = this;
        if (index > arrTemp.length) index = arrTemp.length;
        if (index < -arrTemp.length) index = 0;
        if (index < 0) index = arrTemp.length + index;
        for (var i = arrTemp.length; i > index; i--) {
            arrTemp[i] = arrTemp[i - 1];
        }
        arrTemp[index] = value;
        return arrTemp;
    };

    Array.prototype.remove = function (index) {
        /// <summary>移除项</summary>
        /// <param name="index" type="Number">索引</param>
        /// <returns type="Array">数组</returns>

        return (index < 0) ? this : this.slice(0, index).concat(this.slice(index + 1, this.length));
    };

    Array.prototype.clear = function () {
        /// <summary>清空数组</summary>

        this.length = 0;
    };

    String.prototype.format = function (arrs) {
        /// <summary>格式化字符串</summary>
        /// <returns type="String">格式化后的字符串</returns>
        var tempStr = this;

        for (var i = 0; i < arguments.length; i++) {
            tempStr = tempStr.replace("{" + i + "}", arguments[i]);
        }

        return tempStr;
    };

    w.StardustUI = w.$S = StardustUI;
}(window);