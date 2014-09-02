define(function(require, exports, module){
    'use strict'
    
    function F(){};
    
    var createProto = (function(){
        if(Object.__proto__){
            return function(proto){
                return {
                    __proto__ : proto
                };
            };
        }else{
            return function(proto){
                F.prototype = proto;
                return new F();
            };
        }
    })();
    
    function Class(properties){
        return classify(implement.call(function(){
            if(this.initialize){
                this.initialize.apply(this, arguments);
            }
        }, properties || {}));
    };
    
    Class.Mutators = {
        Extends : function(parent, proto){
            proto = createProto(parent.prototype);
            mix(proto, this.prototype);
            proto.constructor = this;
            this.prototype = proto;
            this.superclass = parent.prototype;
        },
        Implements : function(items, item, proto){
            proto = this.prototype;
    
            while(item = items.shift()){
                mix(proto, item.prototype || item);
            }
        }
    };
    
    function implement(properties){
        var key, value;
    
        for(key in properties){
            value = properties[key];
    
            if(Class.Mutators.hasOwnProperty(key)){
                Class.Mutators[key].call(this, value);
            }else{
                this.prototype[key] = value;
            }
        }
    
        return this;
    };
    
    function mix(receiver, supplier){
        var key;
    
        for(key in supplier){
            if(supplier.hasOwnProperty(key) && key !== 'prototype'){
                receiver[key] = supplier[key];
            }
        }
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
    
    module.exports = Class;
});