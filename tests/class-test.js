define(function(require, exports, module){
    var Class, expect;

    Class = require('class');
    expect = require('expect');

    function equals(){
        var args = arguments;
        expect(args[0]).to.equal(args[1]);
    };

    describe('Class', function(){
        it('new Class', function(){
            var Dog = new Class({
                initialize : function(name){
                    this.name = name;
                },
                getName : function(){
                    return this.name;
                }
            });

            var dog = new Dog('Jack');

            equals(dog.constructor, Dog);
            equals(dog.name, 'Jack');
            equals(dog.getName(), 'Jack');
        });

        it('new Class(null)', function(){
            var Dog = new Class(null);
            var dog = new Dog();

            equals(dog.constructor, Dog);
            equals(Dog.superclass.constructor, Class);

            Dog = new Class();
            new Dog();

            equals(Dog.superclass.constructor, Class);
        });

        it('Extends', function(){
            var Animal = new Class({
                initialize : function(name){
                    this.name = name;
                },
                getName : function(){
                    return this.name;
                }
            });

            var Dog = new Class({
                Extends : Animal,
                talk : function(){
                    return 'I am ' + this.name;
                }
            });

            var dog = new Dog('Jack');
            equals(dog.name, 'Jack');
            equals(dog.getName(), 'Jack');
            equals(dog.talk(), 'I am Jack');
        });

        it('call initialize method property', function(){
            var counter = 0;

            var Animal = new Class({
                initialize : function(){
                    counter++;
                }
            });

            var Dog = new Class({
                Extends : Animal,
                initialize : function(){
                    counter++;
                }
            });

            new Dog();

            equals(counter, 1);

            counter = 0;

            Dog = new Class({
                Extends : Animal
            });

            new Dog();

            equals(counter, 1);
        });

        it('pass arguments to initialize method property', function(){
            var Animal = new Class({
                initialize : function(firstName, lastName){
                    this.fullName = firstName + ' ' + lastName;
                }
            });

            var Bird = Animal.extend({
                fly : function(){}
            });

            var bird = new Bird('hello', 'world');
            equals(bird.fullName, 'hello world');
        });

        it('superclass', function(){
            var counter = 0;

            var Animal = new Class({
                initialize : function(){
                    counter++;
                },
                talk : function(){
                    return 'I am an animal';
                }
            });

            var Dog = new Class({
                Extends : Animal,
                initialize : function(){
                    Dog.superclass.initialize();
                },
                talk : function(){
                    return Dog.superclass.talk();
                }
            });

            var dog = new Dog();
            equals(counter, 1);
            equals(dog.talk(), 'I am an animal');
        });

        it('Implements', function(){
            var Animal = new Class({
                initialize : function(name){
                    this.name = name;
                },
                getName : function(){
                    return this.name;
                }
            });

            var Flyable = {
                fly : function(){
                    return 'I am flying';
                }
            };

            var Talkable = function(){};

            Talkable.prototype.talk = function(){
                return 'I am ' + this.name;
            };

            var Dog = new Class({
                Extends : Animal,
                Implements : [Flyable, Talkable]
            });

            var dog = new Dog('Jack');

            equals(dog.name, 'Jack');
            equals(dog.getName(), 'Jack');
            equals(dog.fly(), 'I am flying');
            equals(dog.talk(), 'I am Jack');
        });

        it('SubClass.extend', function(){
            var Animal = new Class({
                initialize : function(name){
                    this.name = name;
                }
            });

            var Dog = Animal.extend();
            var dog = new Dog('Jack');

            equals(dog.name, 'Jack');
            equals(Dog.superclass.constructor, Animal);
        });

        it('SubClass.implement', function(){
            var Animal = new Class({
                initialize : function(name){
                    this.name = name;
                }
            });

            var Dog = Animal.extend();

            Dog.implement({
                talk : function(){
                    return 'I am ' + this.name;
                }
            });

            var dog = new Dog('Jack');

            equals(dog.name, 'Jack');
            equals(dog.talk(), 'I am Jack');
            equals(Dog.superclass.constructor, Animal);
        });

        it('new AnotherClass() in initialize', function(){
            var called = [];

            var Animal = new Class({
                initialize : function(){
                    called.push('Animal');
                }
            });

            var Pig = new Class({
                Extends : Animal,
                initialize : function(){
                    called.push('Pig');
                }
            });

            var Dog = new Class({
                Extends : Animal,
                initialize : function(){
                    new Pig();
                    called.push('Dog');
                }
            });

            new Dog();
            equals(called.join(' '), 'Pig Dog');
        });
    });
});