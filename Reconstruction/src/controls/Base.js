void function ($S) {

    var _enum = $S.Enum;

    function Control() {
        /// <summary>控件基础对象</summary>

        var _this = this;

        // 子控件列表
        this.controls = [];
        // 父控件
        this.parent = null;
        // 是否有更改
        this.hasChange = true;

        // 缓存画布
        this.bufferCanvas = document.createElement("canvas");
        // 缓存画布上下文
        this.bufferCtx = this.bufferCanvas.getContext("2d");

        // 当用户右击该控件时显示的快捷菜单
        this.contextMenuStrip = null;

        // 边框圆角半径
        this.borderRoundRadius = 45;

        // 指针移过该控件时显示的光标
        this.cursor = _enum.cursors.default;

        // 确定对象在被选定时的IME(输入法编辑器)状态
        this.imeMode = _enum.imeMode.off;

        // 鼠标是否移入
        var _isMouseEnter = false;
        Object.defineProperty(this, "_isMouseEnter", {
            get: function () { return _isMouseEnter; },
            set: function (value) {
                if (_isMouseEnter != (value = !!value)) {
                    _isMouseEnter = value;
                    _this.hasChange = true;
                }
            }
        });

        // 指示控件是否可以接受用户拖到它上面的数据
        var allowDrow = false;
        Object.defineProperty(this, "allowDrow", {
            get: function () { return allowDrow; },
            set: function (value) {
                allowDrow = value;
                /* 事件绑定或移除 */
            },
            configurable: true
        });

        // 指示当控件内容大于它的可见区域时是否自动显示滚动条
        var autoScroll = false;
        Object.defineProperty(this, "autoScroll", {
            get: function () { return autoScroll; },
            set: function (value) {
                if (autoScroll != (value == !!value)) {
                    autoScroll = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 指示当前控件是否可以根据内容自动调整大小
        var autoSize = false;
        Object.defineProperty(this, "autoSize", {
            get: function () { return autoSize; },
            set: function (value) {
                if (autoSize != (value == !!value)) {
                    autoSize = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 组件的背景色
        var backColor = "#f0f0f0";
        Object.defineProperty(this, "backColor", {
            get: function () { return backColor; },
            set: function (value) {
                if (backColor != (value = value || "#f0f0f0")) {
                    backColor = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 用于该控件的背景图像
        var backgroundImage = null;
        Object.defineProperty(this, "backgroundImage", {
            get: function () { return backgroundImage; },
            set: function (value) {
                if (backgroundImage != value) {
                    backgroundImage = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 用于组件的背景图像布局
        var backgroundImageLayout = _enum.imageLayout.tile;
        Object.defineProperty(this, "backgroundImageLayout", {
            get: function () { return backgroundImageLayout; },
            set: function (value) {
                if (backgroundImageLayout != (value = value || _enum.imageLayout.tile)) {
                    backgroundImageLayout = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 指示面板是否应具有边框
        var borderStyle = _enum.borderStyle.none;
        Object.defineProperty(this, "borderStyle", {
            get: function () { return borderStyle; },
            set: function (value) {
                if (borderStyle != (value = value || _enum.borderStyle.none)) {
                    borderStyle = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 指示是否已启用该控件
        var enable = true;
        Object.defineProperty(this, "enable", {
            get: function () { return enable; },
            set: function (value) {
                if (enable != (value == !!vallue)) {
                    enable = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 用于显示控件中文本的字体
        var font = "9pt 宋体";
        Object.defineProperty(this, "font", {
            get: function () { return font; },
            set: function (value) {
                if (font != (value = value || "9pt 宋体")) {
                    font = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 此组件的前景色,用于显示文本
        var foreColor = "#000";
        Object.defineProperty(this, "foreColor", {
            get: function () { return foreColor; },
            set: function (value) {
                if (foreColor != (value = value || "#000")) {
                    foreColor = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // 控件左上角相对于其容器左上角的坐标
        var x = 0;
        var y = 0;
        var location = {
            get x() { return x; },
            set x(value) {
                if (x != (value = parseInt(value))) {
                    x = value;
                    _this.hasChange = true;
                }
            },
            get y() { return y; },
            set y(value) {
                if (y != (value = parseInt(value))) {
                    y = value;
                    _this.hasChange = true;
                }
            }
        }
        Object.defineProperty(this, "location", {
            get: function () { return location; },
            set: function (value) {
                if (!value.x || !value.y) return;
                if (location.x == value.x && location.y == value.y) return;
                location.x = value.x;
                location.y = value.y;
                _this.hasChange = true;
            },
            configurable: true
        });
        // 控件X坐标属性
        Object.defineProperty(this, "x", {
            get: function () { return location.x; },
            set: function (value) { location.x = value; },
            configurable: true
        });
        // 控件Y坐标属性
        Object.defineProperty(this, "y", {
            get: function () { return location.y; },
            set: function (value) { location.y = value; },
            configurable: true
        });

        // 指定控件的内部边距
        var left = 0;
        var top = 0;
        var right = 0;
        var bottom = 0;
        var padding = {
            get left() { return left; },
            set left(value) {
                if (left != (value = parseInt(value))) {
                    left = value;
                    _this.hasChange = true;
                }
            },
            get top() { return top; },
            set top(value) {
                if (top != (value = parseInt(value))) {
                    top = value;
                    _this.hasChange = true;
                }
            },
            get right() { return right; },
            set right(value) {
                if (right != (value = parseInt(value))) {
                    right = value;
                    _this.hasChange = true;
                }
            },
            get bottom() { return bottom; },
            set bottom(value) {
                if (bottom != (value = parseInt(value))) {
                    bottom = value;
                    _this.hasChange = true;
                }
            }
        };
        Object.defineProperty(this, "padding", {
            get: function () { return padding; },
            set: function (value) {
                if (!value.left || !value.top || !value.right || !value.bottom) return;
                if (padding.left == value.left && padding.top == value.top && padding.right == value.right && padding.bottom == value.bottom) return;
                padding.left = value.left;
                padding.top = value.top;
                padding.right = value.right;
                padding.bottom = value.bottom;
                _this.hasChange = true;
            },
            configurable: true
        });
        // 控件左边距属性
        Object.defineProperty(this, "left", {
            get: function () { return padding.left; },
            set: function (value) { padding.left = value; },
            configurable: true
        });
        // 控件上边距属性
        Object.defineProperty(this, "top", {
            get: function () { return padding.top; },
            set: function (value) { padding.top = value; },
            configurable: true
        });
        // 控件右边距属性
        Object.defineProperty(this, "right", {
            get: function () { return padding.right; },
            set: function (value) { padding.right = value; },
            configurable: true
        });
        // 控件下边距属性
        Object.defineProperty(this, "bottom", {
            get: function () { return padding.bottom; },
            set: function (value) { padding.bottom = value; },
            configurable: true
        });

        // 控件的大小(以像素为单位)
        var width = 150;
        var height = 150;
        var size = {
            get width() { return width; },
            set width(value) {
                if (width != (value = parseInt(value))) {
                    width = value;
                    _this.hasChange = true;
                }
            },
            get height() { return height; },
            set height(value) {
                if (height != (value = parseInt(value))) {
                    height = value;
                    _this.hasChange = true;
                }
            }
        };
        Object.defineProperty(this, "size", {
            get: function () { return size; },
            set: function (value) {
                if (!value.width || !value.height) return;
                if (size.width == value.width && size.height == value.height) return;
                size.width = value.width;
                size.height = value.height;
                _this.hasChange = true;
            },
            configurable: true
        });
        // 控件宽度属性
        Object.defineProperty(this, "width", {
            get: function () { return size.width; },
            set: function (value) { size.width = value; },
            configurable: true
        });
        // 控件宽度属性
        Object.defineProperty(this, "height", {
            get: function () { return size.height; },
            set: function (value) { size.height = value; },
            configurable: true
        });

        // 控件是否可见
        var visible = true;
        Object.defineProperty(this, "visible", {
            get: function () { return visible; },
            set: function (value) {
                if (visible != (value == !!value)) {
                    visible = value;
                    _this.hasChange = true;
                }
            },
            configurable: true
        });

        // Z排序
        var zIndex = 0;
        Object.defineProperty(this, "zIndex", {
            get: function () { return zIndex; },
            set: function (value) {
                if ((value = parseInt(value)) < 0) {
                    zIndex = 0;
                } else {
                    zIndex = value;
                }
            }
        });
    }

    // 缓存控件原型对象
    var control = Control.prototype;

    control.addControl = function (control) {
        /// <summary>添加控件</summary>
        /// <param name="control" type="StardustUI.Control">控件对象</param>

        for (var i = this.controls.length; i--;) {
            if (this.controls[i] == control) {
                return;
            }
        }
        control.parent = this;
        this.controls.push(control);
    };

    control.removeControl = function (control) {
        /// <summary>移除控件</summary>
        /// <param name="control" type="StardustUI.Control">控件对象</param>

        for (var i = this.controls.length; i--;) {
            if (this.controls[i] == control) {
                this.controls = this.controls.remove(i);
                return;
            }
        }
    };

    control.clearControl = function () {
        /// <summary>清空控件</summary>

        this.controls.clear();
    };

    control._onMouseMove = function (e) {
        /// <summary>默认事件转接器</summary>

        this.onMouseMove && this.onMouseMove(e);
    };

    control._onClick = function (e) {
        /// <summary>默认事件转接器</summary>

        this.onClick && this.onClick(e);
    };

    // 设置控件预留函数
    control.onSet = function () { };

    // 绘制控件预留函数
    control.onPaint = function () { };

    control.onPaintBackground = function () {
        /// <summary>绘制控件背景事件</summary>

        var ctx = this.bufferCtx;

        ctx.clearRect(0, 0, this.width, this.height);

        ctx.save();
        if (this.backColor) {
            ctx.fillStyle = this.backColor;
            if (this.borderStyle == _enum.borderStyle.round) {
                ctx.fillRoundRect(0, 0, this.width, this.height, this.borderRoundRadius);
            } else {
                ctx.fillRect(0, 0, this.width, this.height);
            }
        }

        // 控件平面样式外观
        if ("flatStyle" in this) {
            // 背景颜色
            var c1 = "rgba(230,230,230,0.4)", c2 = "rgba(100,100,100,0.4)";
            if (!this.enable) {
                c2 = "#ccc";
                this._isMouseEnter = false;
            }
            if (this._isMouseEnter) {
                c1 = "rgba(100,100,100,0.4)", c2 = "rgba(230,230,230,0.4)";
            }

            /* 控件背景渐变颜色 */
            var bgGradient = ctx.createLinearGradient(0, 0, 0, this.height);
            bgGradient.addColorStop(0, c1);
            bgGradient.addColorStop(0.5, c2);
            bgGradient.addColorStop(1, c1);

            if (this.borderStyle != _enum.borderStyle.round) {
                switch (this.enable ? this.flatStyle : _enum.flatStyle.flat) {
                    case _enum.flatStyle.standard:
                        ctx.fillStyle = bgGradient;
                        ctx.fillRect(0, 0, this.width, this.height);
                        break;
                    case _enum.flatStyle.flat:
                        if (this._isMouseEnter) {
                            ctx.fillStyle = c2;
                            ctx.fillRect(0, 0, this.width, this.height);
                        }
                        break;
                    case _enum.flatStyle.popup:
                        if (this._isMouseEnter) {
                            ctx.fillStyle = bgGradient;
                            ctx.fillRect(0, 0, this.width, this.height);
                        }
                        break;
                }
            }
            else {
                ctx.fillStyle = bgGradient;
                ctx.fillRoundRect(0, 0, this.width, this.height, this.borderRoundRadius);
            }
        }

        // 控件边框样式
        if ("borderStyle" in this) {
            ctx.strokeStyle = "#888";
            switch (this.borderStyle) {
                case _enum.borderStyle.fixedSingle:
                    ctx.strokeRect(0, 0, this.width, this.height);
                    break;
                case _enum.borderStyle.fixed3D:
                    ctx.shadowColor = "rgba(50, 50, 50, 0.6)";
                    ctx.shadowOffsetX = ctx.shadowOffsetY = 0;
                    ctx.shadowBlur = 5;
                    ctx.strokeStyle = "rgba(0,0,0,0)";
                    ctx.strokeRect(0, 0, this.width, this.height);
                    ctx.strokeStyle = "#888";
                    ctx.strokeRect(0, 0, this.width, this.height);
                    break;
                case _enum.borderStyle.round:
                    ctx.drawRoundRect(0, 0, this.width, this.height, this.borderRoundRadius);
                    break;
            }
        }
        ctx.restore();
    };

    $S.Control = Control;
}(StardustUI.prototype);