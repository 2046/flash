#Flash

一个简单的 flash 加载器类，继承自 Base

##使用

下载项目中 dist 目录里面的文件，并配置好模块相关信息（如：路径，别名），使用如下示例代码即可开始使用。

```
seajs.use(['flash'], function(Flash){
  new Flash({
    path : '', // swf 文件地址
    width : 100,
    height : 100,
    container : null // 包裹 flash 的 DOM 对象
  });
});

require(['flash'], function(Flash){
  new Flash({
    path : '', // swf 文件地址
    width : 100,
    height : 100,
    container : null // 包裹 flash 的 DOM 对象
  });
});
```

##使用说明

###``new Flash(properties)``

实例化出一个 flash 对象，``properties``是该对象的属性集合

该对象有以下属性，并且是可选的：

- id **{String}** 唯一标识符
- vars **{Object}** flashvars 属性集合
- path **{String}** swf 文件地址
- width **{Number}** 宽度
- height **{Number}** 高度
- callBacks **{Object}** flash 调用 js 的回调集合
- container **{String|jQuery Object}** 包裹 flash 的 DOM 对象
- properties **{Object}** 属性集合
  - classid **{String}** 定义嵌入 Windows Registry 中或某个 URL 中的类的 ID 值，此属性可用来指定浏览器中包含的对象的位置，通常是一个 Java 类，默认是 clsid:D27CDB6E-AE6D-11cf-96B8-444553540000
  - type **{String}** 定义被规定在 data 属性中指定的文件中出现的数据的 MIME 类型，默认是 application/x-shockwave-flash
- params **{Object}** 为 flash 运行时提供参数，以下参数自行参考 flash params 文档
  - loop **{Boolean}**
  - menu **{Boolean}**
  - quality **{String}**
  - wmode **{String}**
  - allowFullScreen **{Boolean}**
  - allowScriptAccess **{String}**

```
$('<div id="test"></test>').appendTo(document.body);

new Flash({
  path : '', // swf 文件地址
  width : 100,
  height : 100,
  container : '#test'
});
```

如果在实例化时不传``container``参数，那么在实例化时就不会把 flash 对象插入 DOM 中。在实例化后，可以使用``appendTo``方法把 flash 对象插入 DOM 中。

###appendTo ``obj.appendTo(element)``

###destroy ``obj.destroy()``
