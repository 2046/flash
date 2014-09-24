#Flash

一个简单的 flash 加载器类，继承自 Base

##使用

下载项目中 dist 目录里面的文件，并配置好模块相关信息（如：路径，别名），使用如下示例代码即可开始使用。

```
seajs.use(['flash'], function(Flash){
  new Flash({
    path : 'swf 文件地址',
    width : 100,
    height : 100,
    container : '包裹 flash 的 DOM 对象'
  });
});

require(['flash'], function(Flash){
  new Flash({
    path : 'swf 文件地址',
    width : 100,
    height : 100,
    container : '包裹 flash 的 DOM 对象'
  });
});
```
