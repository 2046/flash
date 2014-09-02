'use strict'

// Thanks to:
//     - https://github.com/aralejs/class/blob/master/class.js
//     - http://ejohn.org/blog/simple-javascript-inheritance/
//     - http://documentcloud.github.com/backbone/#Model-extend

function F(){};

var createProto = Object.__proto__ ?
    function(proto){
        return {__proto__ : proto};
    } :
    function(proto){
        F.prototype = proto;
        return new F();
    };

function Class(properties){
    properties || (properties = {});
    properties.Extends || (properties.Extends = Class);

    return classify(implement.call(function(){
        if(this.initialize){
            this.initialize.apply(this, arguments);
        }
    }, properties));
};

Class.Method = {
    Extends : function(parent){
        var proto = createProto(parent.prototype);

        mix(proto, this.prototype);
        proto.constructor = this;
        this.prototype = proto;
        this.superclass = parent.prototype;
    },
    Implements : function(items){
        var item;

        while(item = items.shift()){
            mix(this.prototype, item.prototype || item);
        }
    }
};

function implement(properties){
    var key, value;

    for(key in properties){
        value = properties[key];

        if(key in Class.Method){
            Class.Method[key].call(this, value);
        }else{
            this.prototype[key] = value;
        }
    }

    return this;
};

function extend(properties){
    properties = properties || {};
    properties.Extends = this;
    return new Class(properties);
};

function classify(cls){
    cls.extend = extend;
    cls.implement = implement;
    return cls;
};

function mix(receiver, supplier){
    var key;

    for(key in supplier){
        if(supplier.hasOwnProperty(key) && key !== 'prototype'){
            receiver[key] = supplier[key];
        }
    }
};

module.exports = Class;