void function ($S) {
    if (!$S.Util) $S.Util = {};

    var Page = {};

    var textMetricElement = null;
    window.addEventListener("load", function () {
        textMetricElement = document.createElement("span");
        textMetricElement.style.cssText = "position:absolute;top:-1000px;left:0;z-index:-1000;color:transparent;";
        document.body.appendChild(textMetricElement);
    });

    Page.getTextHeight = function (str, font) {
        /// <summary>获取文本高度</summary>
        /// <param name="str" type="String">要获取的字符串</param>
        /// <param name="font" type="String" optional="true">字体</param>
        /// <returns type="Number">高度</returns>

        textMetricElement.style.font = font;
        textMetricElement.textContent = str;
        return textMetricElement.offsetHeight;
    };

    Page.getTextWidth = function (str, font) {
        /// <summary>获取文字宽度</summary>
        /// <param name="str" type="String">要获取的字符串</param>
        /// <param name="font" type="String" optional="true">字体</param>
        /// <returns type="Number">宽度</returns>

        textMetricElement.style.font = font;
        textMetricElement.textContent = str;
        return textMetricElement.offsetWidth;
    };

    Page.getTextSize = function (str, font) {
        /// <summary>获取文字尺寸</summary>
        /// <param name="str" type="String">要获取的字符串</param>
        /// <param name="font" type="String" optional="true">字体</param>
        /// <returns type="Size">尺寸</returns>

        return {
            width: getTextWidth(str, font),
            height: getTextHeight(str, font)
        }
    };

    Page.setCaretPosition = function (ctrl, pos) {
        /// <summary>设置光标</summary>
        /// <param name="ctrl" type="HTMLInputElement">输入框控件</param>
        /// <param name="pos" type="Number">位置</param>

        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(pos, pos);
        }
        else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };

    Page.bounds = function (e, c) {
        /// <summary>碰撞检测</summary>
        /// <param name="e" type="Number">事件参数对象</param>
        /// <param name="c" type="Number">控件对象</param>
        /// <returns type="Boolean">是否碰撞</returns>

        // 元素位置
        var obj = e.target;
        var style = document.defaultView.getComputedStyle(obj);

        var styleWidth = (style.width.replace(/\px/g, "")) | 0,
            styleHeight = (style.height.replace(/\px/g, "")) | 0;

        var ex = e.layerX || e.offsetX;
        var ey = e.layerY || e.offsetY;

        if (styleWidth) ex = (ex * (obj.width / styleWidth)) | 0;
        if (styleHeight) ey = (ey * (obj.height / styleHeight)) | 0;

        return (ex >= c.x && ex <= c.x + c.width && ey >= c.y && ey <= c.y + c.height);
    };

    Object.defineProperty($S.Util, "Page", {
        get: function () {
            return Page;
        }
    });
}(StardustUI.prototype);