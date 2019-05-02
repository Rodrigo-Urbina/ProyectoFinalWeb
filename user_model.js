const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const usersSchema = mongoose.Schema({
	id: {type : Number, required : true, unique : true},
	nombre: {type : String, required : true},
	contra: {type : String, required : true},
	rol: {type : String, required : true},
	ganancias: {type : Number, required : true},
	registro: {type : Date, required : true}
});

var Users = mongoose.model('Users', usersSchema);

const ListUsers = {
	get : function(){
		return Users.find()
			.then(users => {
				return users;
			})
			.catch(err => {
				 throw new Error(err);
			});
	} ,
	post : function(newUser){
		return Users.create(newUser)
			.then(user => {
				return user;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	getById : function(userId){
		return Users.findOne({id : userId})
			.then(user => {
				if (user){
					return user;
				}
				throw new Err("Usuario no encontrado");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	put : function(userId, newData){
		return Users.findOneAndUpdate({id : userId}, { $set: newData }, { new: true })
			.then(user => {
				if (user){
					return user;
				}
				throw new Err("Usuario no encontrado");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
}

module.exports = {ListUsers};