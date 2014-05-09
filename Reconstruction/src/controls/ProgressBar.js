void function ($S) {

    var _page = $S.Util.Page;
    var _enum = $S.Enum;

    function ProgressBar() {
        $S.Control.apply(this, arguments);

        var _this = this;

        // 自增计时器
        var timer = null;

        // 设置控件默认内边距
        this.padding = { left: 1, right: 1, top: 1, bottom: 1 };
        // 设置控件默认宽度
        this.width = 100;
        // 设置控件默认高度
        this.height = 23;

        // 设置控件样式
        Object.defineProperty(this, "borderStyle", {
            get: function () { return _enum.borderStyle.fixed3D; }
        });

        // 字幕动画的速度以毫秒为单位
        var marqueeAnimationSpeed = 10;
        Object.defineProperty(this, "marqueeAnimationSpeed", {
            get: function () { return marqueeAnimationSpeed; },
            set: function (value) {
                marqueeAnimationSpeed = value;
                if (_this.style == _enum.progressBarStyle.marquee) {
                    if (timer) clearInterval(timer);
                    timer = setInterval(function () {
                        _this.performStep.call(_this);
                    }, _this.marqueeAnimationSpeed);
                }
                _this.hasChange = true;
            }
        });

        // 此ProgressBar正使用的范围的上限
        var maximum = 100;
        Object.defineProperty(this, "maximum", {
            get: function () { return maximum; },
            set: function (value) {
                maximum = value;
                _this.hasChange = true;
            }
        });

        // 此ProgressBar正使用的范围的下限
        var minimum = 0;
        Object.defineProperty(this, "minimum", {
            get: function () { return minimum; },
            set: function (value) {
                minimum = value;
                _this.hasChange = true;
            }
        });

        // 当调用performStep()方法时，控件当前的增量
        this.step = 0.5;

        // 此属性允许用户设置ProgressBar的样式
        var style = _enum.progressBarStyle.blocks;
        Object.defineProperty(this, "style", {
            get: function () { return style; },
            set: function (value) {
                style = value;
                if (_this.style == _enum.progressBarStyle.marquee) {
                    if (timer) clearInterval(timer);
                    timer = setInterval(function () {
                        _this.performStep.call(_this);
                    }, _this.marqueeAnimationSpeed);
                } else {
                    clearInterval(timer);
                    timer = null;
                }
                _this.hasChange = true;
            }
        });

        // ProgressBar的当前值，在由最小和最大属性制定的范围之内
        var value = 0;
        Object.defineProperty(this, "value", {
            get: function () { return value; },
            set: function (v) {
                value = v;
                if (v >= _this.maximum) v = _this.maximum;
                else if (v <= _this.minimum) v = _this.minimum;
                _this.hasChange = true;
            }
        });
    }

    ProgressBar.prototype = new $S.Control();

    // 缓存ProgressBar对象原型
    var progressBar = ProgressBar.prototype;

    progressBar.performStep = function () {
        /// <summary>按值步进</summary>

        this.value += this.step;
        if (this.style == _enum.progressBarStyle.marquee && this.value >= this.maximum) {
            this.value = -0.1 * this.width;
        } else if (this.value >= this.maximum) {
            this.value = this.maximum;
        }
    };

    progressBar.onSet = function () {
        /// <summary>设置控件</summary>

        this.bufferCanvas.width = this.width;
        this.bufferCanvas.height = this.height;
    };

    progressBar.onPaint = function (canvas, ctx) {
        /// <summary>绘制控件</summary>

        var ctx = this.bufferCtx;

        ctx.save();

        var percentage = this.value / (this.maximum - this.minimum);

        /* 控件前景渐变颜色 */
        var bgGradient = ctx.createLinearGradient(0, 0, 0, this.height);
        bgGradient.addColorStop(0, "#D2F8CF");
        bgGradient.addColorStop(0.4, "#18C337");
        bgGradient.addColorStop(1, "#47C559");

        ctx.fillStyle = bgGradient;
        switch (this.style) {
            case _enum.progressBarStyle.blocks:
            case _enum.progressBarStyle.continuous:
                ctx.fillRect(this.left,
                             this.top,
                             this.width * percentage - (this.left + this.right),
                             this.height - (this.top + this.bottom));
                break;
            case _enum.progressBarStyle.marquee:
                ctx.fillRect(this.left + this.width * percentage,
                             this.top,
                             0.1 * this.width - (this.left + this.right),
                             this.height - (this.top + this.bottom));
                break;
        }

        ctx.restore();
    };

    $S.Control.ProgressBar = ProgressBar;
}(StardustUI.prototype);