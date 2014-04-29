void function ($S) {

    function Window() {
        $S.Control.apply(this, arguments);

        var _this = this;

        // 组件的背景色
        this.backColor = "rgba(0,0,0,0)";
    }

    Window.prototype = new $S.Control();

    // 缓存Window对象原型
    var window = Window.prototype;

    window.onSet = function () {
        /// <summary>设置控件</summary>

        this.bufferCanvas.width = this.size.width;
        this.bufferCanvas.height = this.size.height;
    };

    $S.Control.Window = Window;
}(StardustUI.prototype);