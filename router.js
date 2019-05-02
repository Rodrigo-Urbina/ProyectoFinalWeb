const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const router = express.Router();
const {ListUsers} = require('./user_model');
const {ListInvest} = require('./invest_model');


router.get1('/DineroFacilyRapido', (req, res, next) => {

	ListUsers.get()
	.then( users => {
		res.status(200).json({
			message : 'Se pudo mandar la lista de usuarios',
			status : 200,
			users : users
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});

router.get2('./DineroFacilyRapido', (req, res, next) => {

	ListInvest.get()
	.then( invests => {
		res.status(200).json({
			message : 'Se pudo mandar la lista de inversiones',
			status : 200,
			invests : invests
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});



router.post1('./DineroFacilyRapido', (req, res, next) => {
	
	let requiredFields = ['id', 'nombre', 'saldo', 'registro'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	let objectToAdd = {
		id: req.body.id,
		nombre: req.body.name, 
		contra: "clien" + req.body.id,
		saldo: req.body.saldo,
		rol: "Cliente",
		ganancias: 0,
		registro: req.body.registro
	};

	console.log(objectToAdd);
	ListUsers.post(objectToAdd)
		.then(user => {
			res.status(201).json({
				message : "Se pudo agregar al usuario",
				status : 201,
				user : user
			});
		})
		.catch( err => {
			res.status(400).json({
				message : `${err}`,
				status : 400
			});
			return next();
		});
});

router.post2('./DineroFacilyRapido', (req, res, next) => {
	
	let requiredFields = ['id', 'fecha', 'userId', 'duracion', 'inversion', 'porcentaje', 'tipo'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	let objectToAdd = {
		id: req.body.id,
		fecha: req.body.fecha, 
		userId: req.body.userId,
		duracion: req.body.duracion,
		inversion: req.body.inversion,
		porcentaje: req.body.porcentaje,
		tipo: req.body.tipo,
		ganancia: (req.body.inversion * req.body.porcentaje * 0.01 * req.body.duracion) / 360,
		comision: (req.body.inversion * req.body.porcentaje * 0.01 * req.body.duracion) / 3600,
		gananciaReal:  ((req.body.inversion * req.body.porcentaje * 0.01 * req.body.duracion) / 360) * 0.9
	};

	console.log(objectToAdd);
	ListInvest.post(objectToAdd)
		.then(invest => {
			res.status(201).json({
				message : "Se pudo agregar la inversion",
				status : 201,
				invest : invest
			});
		})
		.catch( err => {
			res.status(400).json({
				message : `${err}`,
				status : 400
			});
			return next();
		});
});

router.get1('./DineroFacilyRapido/:id', (req, res) => {
	let UserId = req.params.id;

	ListUsers.getById(UserId)
		.then(user => {
			res.status(200).json({
				message : "Se pudo mandar al usuario",
				status : 200,
				user : user
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "No se encontro al usuario en la lista",
				status : 404
			});
		});
});

router.get2('./DineroFacilyRapido/:id', (req, res) => {
	let InvestId = req.params.id;

	ListInvest.getById(InvestId)
		.then(invest => {
			res.status(200).json({
				message : "Se pudo mandar al usuario",
				status : 200,
				invest : invest
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "No se encontro al usuario en la lista",
				status : 404
			});
		});
});

router.put1('./DineroFacilyRapido:id', (req, res) => {
	let requiredFields = ['ganancias'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			next();
		}
	}

	let userId = req.params.id;

	if (userId){	
		let updatedFields = { ganancias : req.body.ganancias };

		ListUsers.put(userId, updatedFields)
			.then(user => {
				res.status(200).json({
					message : "Se pudo actualizar al usuario",
					status : 200,
					user : user
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "No se encontro al usuario",
					status : 404
				});

				next();
			});	
	}
	else{
		res.status(406).json({
			message : "Falta el parametro 'id'",
			status : 406
		});

		next();
	}
});

/*.put2('./DineroFacilyRapido:id', (req, res) => {
	let requiredFields = ['ganancias'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			next();
		}
	}

	let userId = req.params.id;

	if (userId){	
		let updatedFields = { ganancias : req.body.ganancias };

		ListUsers.put(userId, updatedFields)
			.then(user => {
				res.status(200).json({
					message : "Se pudo actualizar al usuario",
					status : 200,
					user : user
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "No se encontro al usuario",
					status : 404
				});

				next();
			});	
	}
	else{
		res.status(406).json({
			message : "Falta el parametro 'id'",
			status : 406
		});

		next();
	}
});*/

module.exports = router;