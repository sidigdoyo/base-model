# base-model

<pre>
var BaseModel = require('./src/model');

// example #1
// inherit BaseModel
var Model = function() {
	BaseModel.call(this);

	this.register("name", "address");
};

Model.prototype = Object.create(BaseModel.prototype);
Model.prototype.constructor = Model;

var modelA = new Model();
console.log('model property:', Object.keys(modelA));

modelA.setValue({name: 'the name', address: 'the address'});
console.log('model value:', modelA.value);


// example #2
var userModel = new BaseModel();
userModel.register("name", "address");

userModel.setName("username");
userModel.setAddress("user address");

console.log(userModel.getName());
console.log(userModel.getAddress());

</pre>

# method
void <b>register(String, [String, [String, ...]])</b>
<br />register properties

String <b>toString()</b>
<br />get object as string (JSON.stringify)

void <b>setValue(Object)</b>
<br />set value of object

void <b>clear()</b>
<br />clear value all registered property

# property
Object <b>value</b>
<br />get value of object

