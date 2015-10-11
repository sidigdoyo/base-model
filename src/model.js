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
	if(typeof define === "function" && define.amd) {
		// Define as an AMD module if possible
		define('BaseModel', ["baseModel"], function(baseModel){
			return (root.BaseModel = factory(baseModel));
		});
	}
	else if(typeof module === "object" && module.exports) {
		// Node/CommonJS
		module.exports = (root.BaseModel = factory(root.baseModel));
	}
	else {
		root.BaseModel = factory(root.baseModel);
	}
}
(this, function(baseModel) {
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

	BaseModel.prototype = {
		constructor: BaseModel,
		register: function() {
			var args = arguments;
			var self = this;

			for(var i=0; i<args.length; i++) {
				var __funcGetName = __getFunctionName(args[i], "get");
				var __funcSetName = __getFunctionName(args[i], "set");

				__private[args[i]] = undefined;

				Object.defineProperty(self, args[i], { enumerable: true, get: __propertyGetter(__private, args[i]), set: __propertySetter(__private, args[i]) });

				Object.defineProperty(self, __funcGetName, { enumerable: false, value: __functionGet(__private, args[i], __funcGetName) } );
				Object.defineProperty(self, __funcSetName, { enumerable: false, value: __functionSet(__private, args[i], __funcSetName) } );

				Object.call(__functionSet(args[i]));
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
	
	return BaseModel;
}));

if(!String.prototype.capitalizeFirstLetter) {
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
}