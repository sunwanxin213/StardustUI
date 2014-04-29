void function ($S) {

    function Control() {
        /// <summary>控件基础对象</summary>

        var _this = this;

        // 子控件列表
        this.controls = [];

        // 父控件
        this.parent = null;

        // 缓存画布
        this.bufferCanvas = document.createElement("canvas");
        // 缓存画布上下文
        this.bufferCtx = this.bufferCanvas.getContext("2d");

        // 指示控件是否可以接受用户拖到它上面的数据
        var allowDrow = false;
        // 指示当控件内容大于它的可见区域时是否自动显示滚动条
        this.autoScroll = false;
        // 指示当前控件是否可以根据内容自动调整大小
        this.autoSize = false;
        // 组件的背景色
        this.backColor = "#f0f0f0";
        // 用于该控件的背景图像
        this.backgroundImage = null;
        // 用于组件的背景图像布局
        this.backgroundImageLayout = $S.Enum.imageLayout.tile;
        // 指示面板是否应具有边框
        this.borderStyle = $S.Enum.borderStyle.none;
        // 当用户右击该控件时显示的快捷菜单
        this.contextMenuStrip = null;
        // 指针移过该控件时显示的光标
        this.cursor = $S.Enum.cursors.default;
        // 指示是否已启用该控件
        this.enable = true;
        // 确定对象在被选定时的IME(输入法编辑器)状态
        this.imeMode = $S.Enum.imeMode.off;
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
        // 控件是否可见
        this.visible = true;

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

        ctx.save();
        ctx.fillStyle = this.backColor || "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, this.width, this.height);

        // 控件平面样式外观
        if ("flatStyle" in this) {
            // 背景颜色
            var c1 = "rgba(230,230,230,0.4)", c2 = "rgba(100,100,100,0.4)";
            if (this._isMouseEnter) {
                c1 = "rgba(100,100,100,0.4)", c2 = "rgba(230,230,230,0.4)";
            }
            if (!this.isEnable) {
                c2 = "#ccc";
                this._isMouseEnter = false;
            }

            /* 控件背景渐变颜色 */
            var bgGradient = ctx.createLinearGradient(0, 0, 0, this.height);
            bgGradient.addColorStop(0, c1);
            bgGradient.addColorStop(0.5, c2);
            bgGradient.addColorStop(1, c1);

            switch (this.isEnable ? this.flatStyle : $S.Enum.flatStyle.flat) {
                case $S.Enum.flatStyle.standard:
                    ctx.fillStyle = bgGradient;
                    ctx.fillRect(0, 0, this.width, this.height);
                    break;
                case $S.Enum.flatStyle.flat:
                    if (this._isMouseEnter) {
                        ctx.fillStyle = c2;
                        ctx.fillRect(0, 0, this.width, this.height);
                    }
                    break;
                case $S.Enum.flatStyle.popup:
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
                case $S.Enum.borderStyle.fixedSingle:
                    ctx.strokeRect(0, 0, this.width, this.height);
                    break;
                case $S.Enum.borderStyle.fixed3D:
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

    $S.Control = Control;
}(StardustUI.prototype);