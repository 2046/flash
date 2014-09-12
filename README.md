#class

提供简洁的 OO 实现。

## 使用

下载项目中 dist 目录里面的文件，并配置好模块相关信息（如：路径，别名），使用如下示例代码即可开始使用。

```
saejs.use(['class'], function(Class){
    var MyClass = new Class({
        name : 'han',
        say : function(){}
    });
    
    var myClass = new MyClass();
});

require(['class'], function(){Class}{
    var MyClass = new Class({
        name : 'han',
        say : function(){}
    });
    
    var myClass = new MyClass();
});
```

## 使用说明

###``new Class([properties]);``

创建一个新类，``properties``是要混入的实例属性集合。

```
var Class = require('class');

var MyClass = new Class({
    name : 'han',
    say : function(){
        console.log('hello world, my name is ' + this.name);
    }
});

var myClass = new MyClass();
myClass.say(); //hello world, my name is han
```

###``properties`` 集合中特殊属性

####``initialize``属性，标明初始化方法，会在类实例化时调用

```
var Class = require('class');

var Animal = new Class({
    initialize : function(name){
        this.name = name;
    },
    say : function(){
        console.log('hello: ' + this.name);
    }
});

var animal = new Animal('han');
animal.say(); //hello: han
```

####``Implements``属性，标明新创建的类需要从哪些类或对象中混入属性

```
/* action.js */
exports.hungry = function(){
    console.log("I'm hungry");
};
```

```
/* animal.js */
var Class = require('class');
var Action = require('./action);

var Animal = new Class({
    Implements : [Action],
    initialize : function(name){
        this.name = name;
    },
    say : function(){
        console.log('hello; ' + this.name);
    }
});

module.exports = Animal;

var animal = new Animal('han');
animal.say(); //hello: han
animal.hungry(); //I'm hungry
```

####``Extends`` 属性，标明新创建的类需要继承的父类，不支持多继承

```
var Class = require('class');
var Animal = require('animal');

var Dog = new Class({
    Extends : Animal,
    barking : function(){
        console.log('barking...');
    }
});

module.exports = Dog;

var dog = new Dog('han');
dog.say(); //hello: han
dog.hungry(); //I'm hungry
dog.barking(); //barking...
```

###``SubClass.extend([properties])``

使用``new Class``创建的类或父类派生的子类，拥有```extend```方法，可以继续派生子类。相当于``new Class({Extends : SubClass})``快捷方式，只是继承的父类是``SubClass``自身。

```
var Animal = require('animal');

var Cat = Animal.extend({
    say : function(){
        Animal.superclass.initialize.call(this);
        console.log('Miao....');
    }
    color : 'White'
});

var cat = new Cat('han');
cat.say(); //hello: han //Miao....
cat.hungry(); //I'm hungry
cat.color; //White
```

**注：** 在子类方法中，调用父类中同名方法时，需要使用```parentClassName.superclass.methodName```显式调用父类方法，如上所示。

###``SubClass.implement(properties)``

使用``new Class``创建的类或父类派生的子类，拥有``implement``方法，该方法将接收到的属性集合(``properties``)实现到该类的``prototype``中，等同于在新创建类时使用``Implements``属性，区别在于可在创建类之后随时更改已有的类。

```
var Dog = require('dog');

Dog.implement({
    swim : function(){
        console.log('swim....');
    }
});

var dog = new Dog('han');
dog.say(); //hello: han
dog.hungry(); //I'm hungry
dog.barking(); //barking...
dog.swim(); //swim....
```
