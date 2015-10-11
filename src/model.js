/**
 * BaseModel - Library
 * automatic getter and setter function base on registered propery
 * @version v1.0.0
 * @link https://github.com/sidigdoyo/BaseModel
 * @license MIT
 * @author Sidigdoyo Pribadi <sidigdoyo@gmail.com>
 */

(function( root, factory ) {
	"use strict";
	if(!root.msp) {
		root.msp = {};
	}

	if(typeof define === "function" && define.amd) {
		// Define as an AMD module if possible
		define( 'msp.BaseModel', [], ( root.msp.BaseModel = factory() ) );
	}
	else if(typeof module === "object" && module.exports) {
		// Node/CommonJS
		module.exports = (root.msp.BaseModel = factory());
	}
	else {
		root.msp.BaseModel = factory();
	}
}
(this, function() {
	"use strict";

	var BaseModel = function() {};

	var __private = {};

	var __getFunctionName = function(prop, type) {
		var __name = prop.capitalizeFirstLetter();
		return type + __name;
	};

	var __functionGet = function(obj, prop, funcName) {
		return new Function("__private", "return function " + funcName + "() { return __private."+ prop +"; }")(obj);
	};

	var __functionSet = function(obj, prop, funcName) {
		return new Function("__private", "return function " + funcName + "(value) { __private."+ prop +" = value; }")(obj);
	};

	var __propertyGetter = function(obj, prop) {
		return new Function("__private", "return function() { return __private."+ prop +"; }")(obj);
	};

	var __propertySetter = function(obj, prop) {
		return new Function("__private", "return function(value) { __private."+ prop +" = value; }")(obj);
	};

	var __defineProperty = function(self, obj) {

		var __config = { 
			enumerable: obj.enumerable, 
			get: __propertyGetter(__private, obj.name), 
			set: __propertySetter(__private, obj.name) 
		};

		Object.defineProperty(self, obj.name, __config);
	};

	BaseModel.prototype = {
		constructor: BaseModel,
		register: function() {
			var args = arguments;
			var self = this;

			for(var i=0; i<args.length; i++) {
				var __prop = args[i];
				if(typeof __prop === 'string') {
					__prop = {
						name: args[i],
						enumerable: true
					};
				} 

				if(Array.isArray(__prop) || typeof __prop === 'number') {
					throw new TypeError();
				}

				var __funcGetName = __getFunctionName(__prop.name, "get");
				var __funcSetName = __getFunctionName(__prop.name, "set");

				__private[__prop.name] = undefined;
				
				__defineProperty(self, __prop);

				Object.defineProperty(self, __funcGetName, { enumerable: false, value: __functionGet(__private, __prop.name, __funcGetName) } );
				Object.defineProperty(self, __funcSetName, { enumerable: false, value: __functionSet(__private, __prop.name, __funcSetName) } );

				Object.call(__functionSet(__prop.name));
			}
		},
		setValue: function(obj) {
			Object.keys(__private).forEach(function(prop) {
				__private[prop] = obj[prop];
			});
		},
		get value() {
			return __private;
		},
		clear: function() {
			Object.keys(__private).forEach(function(key) {
				__private[key] = undefined;
			});
		},
		toString: function() {
			return JSON.stringify(this);
		}
	};

	// console.log(angular)
	
	return BaseModel;
}));

if(!String.prototype.capitalizeFirstLetter) {
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
}
