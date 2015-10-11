# base-model

var Model = function() {
	BaseModel.call(this);

	this.register("name", "address");
};

Model.prototype = Object.create(BaseModel.prototype);
Model.prototype.constructor = Model;

try {
	var modelA = new Model();
	console.log('model property:', Object.keys(modelA));

	modelA.setValue({name: 'the name', address: 'the address'});
	console.log('model value:', modelA.value);


	var modelB = new Model();
	modelB.setName('the name');
	modelB.setAddress('the address');

	console.log('call function getName:', modelB.getName());
	console.log('call property address:', modelB.address);

	console.log('call toString', modelB.toString());

} catch(e) {
	console.log(e.name, e.message);
}
