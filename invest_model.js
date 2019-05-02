const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const investSchema = mongoose.Schema({
	id: {type : Number, required : true, unique : true},
	fecha: {type : Date, required : true},
	userId: {type : String, required : true},
	duracion: {type : Number, required : true},
	inversion: {type : Number, required : true},
	porcentaje: {type : Number, required : true},
	tipo: {type : String, required : true},
	ganancia: {type : Number, required : true},
	comision: {type : Number, required : true},
	gananciaReal: {type : Number, required : true}
});

var Invest = mongoose.model('Invest', investSchema);

const ListInvest = {
	get : function(){
		return Invest.find()
			.then(invests => {
				return invests;
			})
			.catch(err => {
				 throw new Error(err);
			});
	} ,
	post : function(newInvest){
		return Invest.create(newInvest)
			.then(invest => {
				return invest;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	getById : function(investId){
		return Users.findOne({id : investIdv})
			.then(invest => {
				if (invest){
					return invest;
				}
				throw new Err("Inversion no encontrada");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	put : function(investId, newData){
		return Invest.findOneAndUpdate({id : investId}, { $set: newData }, { new: true })
			.then(invest => {
				if (invest){
					return invest;
				}
				throw new Err("Inversion no encontrada");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
}

module.exports = {ListInvest};