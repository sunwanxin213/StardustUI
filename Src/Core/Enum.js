﻿void function ($S) {
    var Enum = {};

    // 制定控件上图像的位置
    Enum.imageLayout = {
        // 图像沿控件的矩形工作区顶部左对齐
        none: 0,
        // 图像沿控件的矩形工作区平铺
        tile: 1,
        // 图像在控件的矩形工作区居中显示
        center: 2,
        // 图像沿控件的矩形工作区拉伸
        stretch: 4,
        // 图像在控件的矩形工作区中放大
        zoom: 8
    };

    // 边框样式
    Enum.borderStyle = {
        // 无边框
        none: 0,
        // 单行边框,
        fixedSingle: 1,
        // 三维边框
        fixed3D: 2,
        // 圆角边框
        round: 3
    };

    // 光标
    Enum.cursors = {
        // 默认光标(通常是一个箭头)
        default: 0,
        // 默认，浏览器设置的光标
        auto: 1,
        // 光标呈现为十字线
        crosshair: 2,
        // 光标呈现为指示链接的指针(一只手)
        pointer: 4,
        // 此光标指示某对象可被移动
        move: 8,
        // 此光标指示矩形框的边缘可被向右(东)移动
        eResize: 16,
        // 此光标指示矩形框的边缘可被向上及向右移动(北/东)
        neResize: 32,
        // 此光标指示矩形框的边缘可被向上及向左移动(北/西)
        nwResize: 64,
        // 此光标指示矩形框的边缘可被向上(北)移动
        nResize: 128,
        // 此光标指示矩形框的边缘可被向下及向右移动(南/东)
        seResize: 256,
        // 此光标指示矩形框的边缘可被向下及向左移动(南/西)
        swResize: 512,
        // 此光标指示矩形框的边缘可被向下移动(南)
        sResize: 1024,
        // 此光标指示矩形框的边缘可被向左移动(西)
        wResize: 2048,
        // 此光标指示文本
        text: 4096,
        // 此光标指示程序正忙(通常是一只表或沙漏)
        wait: 8192,
        // 此光标指示可用的帮助(通常是一个问号或一个气球)
        help: 16384
    };

    // 制定绘图表面上内容的对齐方式
    Enum.contentAlignment = {
        // 左上角
        topLeft: 0,
        // 靠上居中
        topCenter: 1,
        // 右上角
        topRight: 2,
        // 靠左垂直居中
        middleLeft: 4,
        // 居中
        middleCenter: 8,
        // 靠右垂直居中
        middleRight: 16,
        // 左下角
        bottomLeft: 32,
        // 靠下居中
        bottomCenter: 64,
        // 右下角
        bottomRight: 128
    };

    // 指定TextBox控件中字符的大小写
    Enum.characterCasing = {
        // 将所有字符都转换为小写
        lower: 0,
        // 字符大小写保持不变
        normal: 1,
        // 将所有字符都转换为大写
        upper: 2
    };

    // 指定控件的外观
    Enum.flatStyle = {
        // 该控件以平面显示
        flat: 0,
        // 该控件以平面显示，知道鼠标指针移动到该控件为止，此时该控件外观为三维
        popup: 1,
        // 该控件外观为三维
        standard: 2
    };

    // 指定控件的外观
    Enum.appearance = {
        // 由控件类定义的默认外观
        normal: 0,
        // 按钮的外观
        button: 1
    };

    // 指定一个控件的状态，例如复选框可以是选中、未选中或设置为不确定状态
    Enum.checkState = {
        // 该控件处于未选中状态
        unchecked: 0,
        // 该控件处于选中状态
        checked: 1,
        // 该控件处于不确定状态，一个不确定的控件通常具有灰色的外观
        indeterminate: 2
    };

    // 输入法状态
    Enum.imeMode = {
        // 禁用云输入法
        off: 0,
        // 启用云输入法
        on: 1
    };

    // 制定LinkLable链接的行为
    Enum.linkBehavior = {
        // 该链接始终显示为带下划线的文本
        alwaysUnderline: 1,
        // 仅当鼠标悬停在链接文本上时，该链接才显示带下划线的文本
        hoverUnderline: 2,
        // 链接文本从不带下划线。仍可使用LinkLable控件的LinkColor属性将该链接与其他文本区分开
        neverUnderline: 3
    };

    // 制定ProgressBar用于指示操作进度的样式
    Enum.progressBarStyle = {
        // 通过在ProgressBar中增加分段块的数量来指示进度
        blocks: 0,
        // 通过在ProgressBar中增加平滑连续的栏的大小来指示进度
        continuous: 1,
        // 通过以字幕方式在ProgressBar中连续滚动一个块来指示进度
        marquee: 2
    };

    Object.defineProperty($S, "Enum", {
        get: function () {
            return Enum;
        }
    });
}(StardustUI.prototype);