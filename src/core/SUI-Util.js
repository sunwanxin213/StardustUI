void function (sui) {
    var util = {};

    var textMetricElement = null;
    window.addEventListener("load", function () {
        textMetricElement = document.createElement("span");
        textMetricElement.style.cssText = "position:absolute;top:-1000px;left:0;z-index:-1000;color:transparent;";
        document.body.appendChild(textMetricElement);
    });

    util.getTextHeight = function (str, font) {
        /// <summary>获取文本高度</summary>
        /// <param name="str" type="String">要获取的字符串</param>
        /// <param name="font" type="String" optional="true">字体</param>
        /// <returns type="Number">高度</returns>

        textMetricElement.style.font = font;
        textMetricElement.textContent = str;
        return textMetricElement.offsetHeight;
    };

    util.getTextWidth = function (str, font) {
        /// <summary>获取文字宽度</summary>
        /// <param name="str" type="String">要获取的字符串</param>
        /// <param name="font" type="String" optional="true">字体</param>
        /// <returns type="Number">宽度</returns>

        textMetricElement.style.font = font;
        textMetricElement.textContent = str;
        return textMetricElement.offsetWidth;
    };

    util.getTextSize = function (str, font) {
        /// <summary>获取文字尺寸</summary>
        /// <param name="str" type="String">要获取的字符串</param>
        /// <param name="font" type="String" optional="true">字体</param>
        /// <returns type="Size">尺寸</returns>

        return {
            width: getTextWidth(str, font),
            height: getTextHeight(str, font)
        }
    };

    util.bounds = function (e, c) {
        /// <summary>碰撞检测</summary>
        /// <param name="e" type="Number">事件参数对象</param>
        /// <param name="c" type="Number">控件对象</param>
        /// <returns type="Boolean">是否碰撞</returns>

        var ex = e.offsetX || e.layerX;
        var ey = e.offsetY || e.layerY;

        return (ex >= c.x && ex <= c.x + c.width && ey >= c.y && ey <= c.y + c.height);
    };

    sui.util = util;
}(StardustUI.prototype);