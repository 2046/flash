'use strict'

var index, win, Base, isIE, FLASH_MIME_TYPE, CLASSID, FLash;

Base = require('base');

index = 0;
win = window;
win.flashAPI = {};
FLASH_MIME_TYPE = 'application/x-shockwave-flash';
CLASSID = 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000';
isIE = navigator.userAgent.toLowerCase().indexOf('msie') !== -1;

FLash = Base.extend({
    attrs : {
        id : null,
        vars : {},
        path : '',
        width : 1,
        height : 1,
        callBacks : {},
        container : null,
        properties : null,
        params : {
            loop : true,
            menu : false,
            quality : 'high',
            wMode : 'window',
            allowFullScreen : true,
            allowScriptAccess : 'always'
        }
    },
    setup : function(){
        var params, properties;

        if(!this.get('id')){
            this.set('id', uuid());
        }

        params = this.get('params');
        properties = $.extend(this.get('properties'), {
            id : this.get('id'),
            data : this.get('path'),
            width : this.get('width'),
            height : this.get('height')
        });

        generateFlashCallJsHook(this, params);

        if(isIE){
            params.movie = path;
            properties.classid = CLASSID;
        }else{
            properties.type = FLASH_MIME_TYPE;
        }

        this.swf = $(generateHTML(properties, params));
        this.inject(this.get('container'));
    },
    inject : function(element){
        element = $(element);

        if(element.length){
            this.swf.appendTo(element);
        }
    },
    remove : function(){
        this.swf.parent().html('');
        this.destroy();
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
    var tpl, paramsTpl, propertiesTpl, tipsTpl, property, param;

    paramsTpl = '';
    propertiesTpl = '';
    tpl = '<object {properties}>{params}{tips}</object>';
    tipsTpl = '<div style="width:' + properties.width + 'px;height:' + properties.height + 'px;line-height:' + properties.height + 'px"><span style="font-size:18px">You also do not have flash player installed,please click <a href="http://www.adobe.com/go/getflash" target="_blank">here</a> to install</span></div>';

    for(property in properties){
        if(properties.hasOwnProperty(property)){
            propertiesTpl += ' ' + property + '="' + properties[property] + '"';
        }
    }

    tpl = tpl.replace(/{properties}/, propertiesTpl);

    for(param in params){
        if(params.hasOwnProperty(param)){
            paramsTpl += '<param name="' + param + '" value="' + params[param] + '" />';
        }
    }

    tpl = tpl.replace(/{tips}/, tipsTpl);
    return tpl.replace(/{params}/, paramsTpl);
};

function uuid(){
    return (+new Date()).toString(36) + (index++);
};

module.exports = Flash;