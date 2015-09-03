/*
 * 🍂class Class
 * 🍂aka L.Class
 *
 * L.Class powers the OOP facilities of Leaflet and is used to create almost all of the Leaflet classes documented here.
 *
 * In addition to implementing a simple classical inheritance model, it introduces several special properties for convenient code organization — options, includes and statics.
 *
 *
 * 🍂example
 *
 * ```js
 * var MyClass = L.Class.extend({
 * initialize: function (greeter) {
 * 	this.greeter = greeter;
 * 	// class constructor
 * },
 *
 * greet: function (name) {
 * 	alert(this.greeter + ', ' + name)
 * 	}
 * });
 *
 * // create instance of MyClass, passing "Hello" to the constructor
 * var a = new MyClass("Hello");
 *
 * // call greet method, alerting "Hello, World"
 * a.greet("World");
 * ```
 *
 * 🍂section Class Factories
 * 🍂example
 *
 * You may have noticed that Leaflet objects are created without using
 * the `new` keyword. This is achieved by complementing each class with a
 * lowercase factory method:
 *
 * ```js
 * new L.Map('map'); // becomes:
 * L.map('map');
 * ```
 *
 * The factories are implemented very easily, and you can do this for your own classes:
 *
 * ```js
 * L.map = function (id, options) {
 *     return new L.Map(id, options);
 * };
 * ```
 * 🍂section Inheritance
 * 🍂example
 *
 * You use L.Class.extend to define new classes, but you can use the same method on any class to inherit from it:
 *
 * ```js
 * var MyChildClass = MyClass.extend({
 *     // ... new properties and methods
 * });
 * ```
 *
 * This will create a class that inherits all methods and properties of the parent class (through a proper prototype chain), adding or overriding the ones you pass to extend. It will also properly react to instanceof:
 *
 * ```js
 * var a = new MyChildClass();
 * a instanceof MyChildClass; // true
 * a instanceof MyClass; // true
 * ```
 *
 * You can call parent methods (including constructor) from corresponding child ones (as you do with super calls in other languages) by accessing parent class prototype and using JavaScript's call or apply:
 *
 * ```
 * var MyChildClass = MyClass.extend({
 *     initialize: function () {
 *         MyClass.prototype.initialize.call("Yo");
 *     },
 *
 *     greet: function (name) {
 *         MyClass.prototype.greet.call(this, 'bro ' + name + '!');
 *     }
 * });
 *
 * var a = new MyChildClass();
 * a.greet('Jason'); // alerts "Yo, bro Jason!"
 * ```
 *
 * 🍂section Options
 * 🍂example
 *
 * `options` is a special property that unlike other objects that you pass
 * to `extend` will be merged with the parent one instead of overriding it
 * completely, which makes managing configuration of objects and default
 * values convenient:
 *
 * ```js
 * var MyClass = L.Class.extend({
 *     options: {
 *         myOption1: 'foo',
 *         myOption2: 'bar'
 *     }
 * });
 *
 * var MyChildClass = L.Class.extend({
 *     options: {
 *         myOption1: 'baz',
 *         myOption3: 5
 *     }
 * });
 *
 * var a = new MyChildClass();
 * a.options.myOption1; // 'baz'
 * a.options.myOption2; // 'bar'
 * a.options.myOption3; // 5
 * ```
 *
 * There's also [`L.Util.setOptions`](#util-setoptions), a method for
 * conveniently merging options passed to constructor with the defaults
 * defines in the class:
 *
 * ```js
 * var MyClass = L.Class.extend({
 *     options: {
 *         foo: 'bar',
 *         bla: 5
 *     },
 *
 *     initialize: function (options) {
 *         L.Util.setOptions(this, options);
 *         ...
 *     }
 * });
 *
 * var a = new MyClass({bla: 10});
 * a.options; // {foo: 'bar', bla: 10}
 * ```
 *
 * 🍂section Includes
 * 🍂example
 *
 * `includes` is a special class property that merges all specified objects into the class (such objects are called mixins).
 *
 * ```js
 *  var MyMixin = {
 *     foo: function () { ... },
 *     bar: 5
 * };
 *
 * var MyClass = L.Class.extend({
 *     includes: MyMixin
 * });
 *
 * var a = new MyClass();
 * a.foo();
 * ```
 *
 * You can also do such includes in runtime with the `include` method:
 *
 * ```js
 * MyClass.include(MyMixin);
 * ```
 *
 * `statics` is just a convenience property that injects specified object properties as the static properties of the class, useful for defining constants:
 *
 * ```js
 * var MyClass = L.Class.extend({
 *     statics: {
 *         FOO: 'bar',
 *         BLA: 5
 *     }
 * });
 *
 * MyClass.FOO; // 'bar'
 * ```
 *
 *
 * 🍂section Constructor hooks
 * 🍂example
 *
 * If you're a plugin developer, you often need to add additional initialization code to existing classes (e.g. editing hooks for `L.Polyline`). Leaflet comes with a way to do it easily using the `addInitHook` method:
 *
 * ```js
 * MyClass.addInitHook(function () {
 *     // ... do something in constructor additionally
 *     // e.g. add event listeners, set custom properties etc.
 * });
 * ```
 *
 * You can also use the following shortcut when you just need to make one additional method call:
 *
 * ```js
 * MyClass.addInitHook('methodName', arg1, arg2, …);
 * ```
 *
 * 🍂section
 */

// Thanks to John Resig and Dean Edwards for inspiration!

L.Class = function () {};

L.Class.extend = function (props) {

	// 🍂function extend(props: Object): Function
	// [Extends the current class](#class-inheritance) given the properties to be included.
	// Returns a Javascript function that is a class constructor (to be called with `new`).
	var NewClass = function () {

		// call the constructor
		if (this.initialize) {
			this.initialize.apply(this, arguments);
		}

		// call all constructor hooks
		this.callInitHooks();
	};

	var parentProto = NewClass.__super__ = this.prototype;

	var proto = L.Util.create(parentProto);
	proto.constructor = NewClass;

	NewClass.prototype = proto;

	// inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			NewClass[i] = this[i];
		}
	}

	// mix static properties into the class
	if (props.statics) {
		L.extend(NewClass, props.statics);
		delete props.statics;
	}

	// mix includes into the prototype
	if (props.includes) {
		L.Util.extend.apply(null, [proto].concat(props.includes));
		delete props.includes;
	}

	// merge options
	if (proto.options) {
		props.options = L.Util.extend(L.Util.create(proto.options), props.options);
	}

	// mix given properties into the prototype
	L.extend(proto, props);

	proto._initHooks = [];

	// add method for calling all hooks
	proto.callInitHooks = function () {

		if (this._initHooksCalled) { return; }

		if (parentProto.callInitHooks) {
			parentProto.callInitHooks.call(this);
		}

		this._initHooksCalled = true;

		for (var i = 0, len = proto._initHooks.length; i < len; i++) {
			proto._initHooks[i].call(this);
		}
	};

	return NewClass;
};


// 🍂function include(properties: Object)
// [Includes a mixin](#class-includes) into the current class.
L.Class.include = function (props) {
	L.extend(this.prototype, props);
};

// 🍂function mergeOptions(options: Object)
// [Merges `options`](#class-options) into the defaults of the class.
L.Class.mergeOptions = function (options) {
	L.extend(this.prototype.options, options);
};

// 🍂function addInitHook(fn: Function)
// Adds a [constructor hook](#class-constructor-hooks) to the class.
L.Class.addInitHook = function (fn) { // (Function) || (String, args...)
	var args = Array.prototype.slice.call(arguments, 1);

	var init = typeof fn === 'function' ? fn : function () {
		this[fn].apply(this, args);
	};

	this.prototype._initHooks = this.prototype._initHooks || [];
	this.prototype._initHooks.push(init);
};
