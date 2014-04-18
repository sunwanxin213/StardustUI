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

    util.boundsRect = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        /// <summary>矩形检测</summary>
        /// <param name="x1" type="Number">矩形1X位置</param>
        /// <param name="y1" type="Number">矩形1Y位置</param>
        /// <param name="w1" type="Number">矩形1宽度</param>
        /// <param name="h1" type="Number">矩形1高度</param>
        /// <param name="x2" type="Number">矩形2X位置</param>
        /// <param name="y2" type="Number">矩形2Y位置</param>
        /// <param name="w2" type="Number">矩形2宽度</param>
        /// <param name="h2" type="Number">矩形2高度</param>
        /// <returns type="Boolean">是否碰撞</returns>

        return (x1 + w1 < x2 ||
                x2 + w2 < x1 ||
                y1 + h1 < y2 ||
                y2 + h2 < y1);
    };

    sui.util = util;
}(StardustUI.prototype);