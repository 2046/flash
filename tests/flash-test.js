define(function(require, exports, module){
    'use strict'

    var expect, Flash;

    Flash = require('flash');
    expect = require('expect');

    function equals(){
        var args = arguments;
        expect(args[0]).to.equal(args[1]);
    }

    describe('Flash', function(){
        $('<div id="test"></test>').appendTo(document.body);
        var path = location.href.replace('runner.html', 'test.swf');

        it('normal usage', function(){
            var flash = new Flash({
                id : 'testflash',
                path : path,
                width : 100,
                height : 100,
                container : $('#test')
            });

            equals(flash.get('id'), 'testflash');
            equals(flash.get('path'), path);
            equals(flash.get('width'), 100);
            equals(flash.get('height'), 100);
            equals($('#testflash')[0].tagName, 'OBJECT');

            flash.destroy();
        });

        it('no parameters', function(){
            var flash = new Flash();

            equals(flash.get('path'), '');
            equals(flash.get('width'), 1);
            equals(flash.get('height'), 1);
            equals($('#testflash').length, 0);

            flash.destroy();
        });

        it('appendTo', function(){
            var flash = new Flash({
                id : 'testflash',
                path : path,
                width : 100,
                height : 100
            });

            flash.appendTo($('#test'));

            equals(flash.get('id'), 'testflash');
            equals(flash.get('path'), path);
            equals(flash.get('width'), 100);
            equals(flash.get('height'), 100);
            equals($('#testflash')[0].tagName, 'OBJECT');

            flash.destroy();
        });

        it('destroy', function(){
            var flash = new Flash({
                id : 'testflash',
                path : path,
                width : 100,
                height : 100,
                container : $('#test')
            });

            equals(flash.get('id'), 'testflash');
            equals(flash.get('path'), path);
            equals(flash.get('width'), 100);
            equals(flash.get('height'), 100);
            equals($('#testflash')[0].tagName, 'OBJECT');

            flash.destroy();
            flash.destroy();
            equals($('#testflash').length, 0);
        });

        it('flash call js', function(done){
            var flash = new Flash({
                path : path,
                width : 100,
                height : 100,
                container : $('#test'),
                vars : {
                    initparam : 'test'
                },
                callBacks : {
                    flashready : function(result){
                        equals(result[0], 'test');
                        flash.destroy();
                        done();
                    }
                }
            });

            equals(flash.get('path'), path);
            equals(flash.get('width'), 100);
            equals(flash.get('height'), 100);
            equals($('#' + flash.get('id'))[0].tagName, 'OBJECT');

            if($('#' + flash.get('id')).find('div').is(':visible') || $('#' + flash.get('id')).find('div').width() == null){
                flash.destroy();
                done();
            }
        });

        it.skip('cross domain flash call js', function(){
            path = path.replace('localhost', '172.29.58.3');

            var flash = new Flash({
                path : path,
                width : 100,
                height : 100,
                container : $('#test'),
                vars : {
                    initparam : 'test'
                },
                callBacks : {
                    flashready : function(result){
                        equals(result[0], 'test');
                        flash.destroy();
                        done();
                    }
                }
            });

            equals(flash.get('path'), path);
            equals(flash.get('width'), 100);
            equals(flash.get('height'), 100);
            equals($('#' + flash.get('id'))[0].tagName, 'OBJECT');
        });
    });
});