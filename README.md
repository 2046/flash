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

该对象有以下属性：

- id **{String}** flash 的 id，如不填写，默认使用一个随机值
- vars **{Object}**
- path **{String}**
- width **{Number}**
- height **{Number}**
- callBacks **{Object}**
- properties **{Object}**
- container **{String|jQuery Object}**
- params **{Object}**
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
