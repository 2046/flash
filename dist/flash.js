define(function(require, exports, module){
    'use strict'
    
    // Thanks:
    //     - https://github.com/swfobject
    //     - http://mootools.net/docs/core/Utilities/Swiff
    
    var index, Base, tpl, isIE, FLASH_MIME_TYPE, CLASSID, Flash, cachedInstances;
    
    Base = require('base');
    tpl = require('./flash.tpl');
    
    index = 0;
    cachedInstances = {};
    window.flashAPI = window.flashAPI || {};
    FLASH_MIME_TYPE = 'application/x-shockwave-flash';
    CLASSID = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
    isIE = navigator.userAgent.toLowerCase().indexOf('msie') !== -1;
    
    Flash = Base.extend({
        attrs : {
            id : '',
            vars : {},
            path : '',
            width : 1,
            height : 1,
            callBacks : {},
            properties : {},
            container : null,
            params : {
                loop : true,
                menu : false,
                quality : 'high',
                wmode : 'window',
                allowFullScreen : true,
                allowScriptAccess : 'always'
            }
        },
        init : function(){
            var params, properties, id, path;
    
            path = this.get('path');
    
            if(!(id = this.get('id'))){
                this.set('id', id = uuid());
            }
    
            properties = $.extend(this.get('properties'), {
                id : id,
                data : path,
                width : this.get('width'),
                height : this.get('height')
            });
    
            generateFlashCallJsHook(this, params = this.get('params'));
    
            if(isIE){
                params.movie = path;
                properties.classid = CLASSID;
            }else{
                properties.type = FLASH_MIME_TYPE;
            }
    
            this.swf = $(generateHTML(properties, params));
            this.appendTo(this.get('container'));
            cachedInstances[id] = this;
        },
        appendTo : function(element){
            element = $(element);
    
            if(element.length){
                this.swf.appendTo(element);
            }
        },
        destroy : function(){
            this.swf.remove();
            delete cachedInstances[this.get('id')];
            Flash.superclass.destroy.call(this);
        }
    });
    
    $(window).unload(function(){
        for(var key in cachedInstances){
            if(cachedInstances.hasOwnProperty(key)){
                cachedInstances[key].destroy();
            }
        }
    });
    
    function generateFlashCallJsHook(ctx, params){
        var id, vars, callBack, callBacks;
    
        id = ctx.get('id');
        vars = ctx.get('vars');
        callBacks = ctx.get('callBacks');
        flashAPI[id] = flashAPI[id] || {};
    
        for(callBack in callBacks){
            if(callBacks.hasOwnProperty(callBack)){
                flashAPI[id][callBack] = (function(fn){
                    return function(){
                        fn.call(ctx.swf, arguments);
                    };
                })(callBacks[callBack]);
    
                vars[callBack] = 'flashAPI.' + id + '.' + callBack;
            }
        }
    
        params.flashvars = $.param(vars);
    };
    
    function generateHTML(properties, params){
        var paramsTpl, propertiesTpl, property, param;
    
        paramsTpl = '';
        propertiesTpl = '';
    
        for(property in properties){
            if(properties.hasOwnProperty(property)){
                propertiesTpl += ' ' + property + '="' + properties[property] + '"';
            }
        }
    
        for(param in params){
            if(params.hasOwnProperty(param) && params[param]){
                paramsTpl += '<param name="' + param + '" value="' + params[param] + '" />';
            }
        }
    
        return tpl.replace(/{params}/, paramsTpl)
                        .replace(/{properties}/, propertiesTpl)
                        .replace(/{width}/g, properties.width)
                        .replace(/{height}/g, properties.height);
    };
    
    function uuid(){
        return (+new Date()).toString(36) + (index++);
    };
    
    module.exports = Flash;
});