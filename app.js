var app = require('./app_config.js');

var db = require('./db_config.js');

var validator = require('validator');

var userController = require('./userController.js');

app.get('/', function(req, res) {

	res.end('Bem-vindo ao nosso workshop!');
});

//////////////////////// Exercício 1

app.get('/users', function(req,res){

	db.User.find({}, function(error, users){

		if(error){
			res.json({error:'Não foi possível retornar os usuários'});
		}else{
			res.json(users)
		}
	});

});

app.get('/users/:cpf', function(req,res){

	var cpf = validator.trim(validator.escape(req.param('cpf')));

	db.User.findOne({cpf : cpf}, function(error, users){

		if(error){
			res.json({error:'Não foi possível retornar os usuários'});
		}else{
			res.json(users)
		}
	});
});

app.post('/users', function(req,res){

	var fullName = validator.trim(validator.escape(req.body.fullName));
	var cpf = validator.trim(validator.escape(req.body.cpf));

	new db.User({
		'fullName': fullName,
		'cpf': cpf
	}).save(function(error, user){
		if(error){
			res.json({error:'Não foi possível criar o usuário'});
		}else{
			res.json(user);
		}
	});

});

app.put('/users/:currentcpf', function(req,res){

	var currentcpf = validator.trim(validator.escape(req.param('currentcpf')));

	var fullName = validator.trim(validator.escape(req.body.fullName));
	var age = validator.trim(validator.escape(req.body.age));
	var email = validator.trim(validator.escape(req.body.email));
	var address = validator.trim(validator.escape(req.body.address));
	var newCpf = validator.trim(validator.escape(req.body.cpf));
	var phoneNumber = validator.trim(validator.escape(req.body.phoneNumber));

	db.User.findOne({cpf : currentcpf}, function(error, user){
		if(fullName){
			user.fullName = fullName
		}
		if(age){
			user.age = age;
		}
		if(email){
			user.email;
		}
		if(address){
			user.address = address;
		}
		if(newCpf){
			user.cpf = newCpf;
		}
		if(phoneNumber){
			user.phoneNumber = phoneNumber;
		}

		user.save(function(error,user){
			if(error){
				res.json({error: 'Não foi possivel salvar o usuário'});
			}else{
				res.json(user);
			}
		});
	});

});

app.delete('/users/:currentcpf', function(req,res){

	var cpf = validator.trim(validator.escape(req.param('currentcpf')));

	db.User.findOne({cpf : cpf}, function(error, user){
		if(error){
			res.json('Não foi possivel apagar o usuário');
		}else{
			user.remove(function(error){
				if(!error){
					res.json({error:'O usuário foi excluído com sucesso.'});
				}
			});
		}
	});
});

//////////////////////// Exercício 2
app.get('/users/exercise2/all', function(req,res){

	userController.list(function(resp){
		res.json(resp);
	});
});

app.get('/users/exercise2/:cpf', function(req,res){

	var cpf = validator.trim(validator.escape(req.param('cpf')));

	userController.listOne(cpf, function(resp){
		res.json(resp);
	});
});


app.post('/users/exercise2', function(req,res){

	var fullName = validator.trim(validator.escape(req.body.fullName));
	var cpf = validator.trim(validator.escape(req.body.cpf));

	userController.save(fullName, cpf, function(resp){
		res.json(resp);
	});
});

app.put('/users/exercise2/:currentcpf', function(req,res){

	var currentcpf = validator.trim(validator.escape(req.param('currentcpf')));

	var fullName = validator.trim(validator.escape(req.body.fullName));
	var age = validator.trim(validator.escape(req.body.age));
	var email = validator.trim(validator.escape(req.body.email));
	var address = validator.trim(validator.escape(req.body.address));
	var newCpf = validator.trim(validator.escape(req.body.cpf));
	var phoneNumber = validator.trim(validator.escape(req.body.phoneNumber));

	userController.update(currentcpf, fullName, age, email, address, newCpf, phoneNumber, function(resp){
		res.json(resp);
	});
});

app.delete('/users/exercise2/:currentcpf', function(req,res){

	var cpf = validator.trim(validator.escape(req.param('currentcpf')));

	userController.delete(cpf , function(resp){
		res.json(resp);
	})
});

//////////////////////// Exercício 3

app.get('/users/exercise3/all', function(req,res){

	userController.list(function(resp){
		res.json(resp);
	});
});

app.get('/users/exercise3/:cpf', function(req,res){

	var cpf = validator.trim(validator.escape(req.param('cpf')));

	userController.listOne(cpf, function(resp){
		res.json(resp);
	});
});

app.post('/login', function(req, res){

	var login = validator.trim(validator.escape(req.body.login));
	var password = validator.trim(validator.escape(req.body.password));

	userController.login(login, password, function(resp){
		res.json(resp);
	});
});

app.post('/users/exercise3', function(req,res){

	var fullName = validator.trim(validator.escape(req.body.fullName));
	var cpf = validator.trim(validator.escape(req.body.cpf));
	var login = validator.trim(validator.escape(req.body.login));
	var password = validator.trim(validator.escape(req.body.password));

	userController.save(fullName, cpf, login, password, function(resp){
		res.json(resp);
	});
});

app.put('/users/exercise3/:currentcpf', function(req,res){

	var currentcpf = validator.trim(validator.escape(req.param('currentcpf')));

	var fullName = validator.trim(validator.escape(req.body.fullName));
	var age = validator.trim(validator.escape(req.body.age));
	var email = validator.trim(validator.escape(req.body.email));
	var address = validator.trim(validator.escape(req.body.address));
	var newCpf = validator.trim(validator.escape(req.body.cpf));
	var phoneNumber = validator.trim(validator.escape(req.body.phoneNumber));

	userController.update(currentcpf, fullName, age, email, address, newCpf, phoneNumber, function(resp){
		res.json(resp);
	});
});

app.delete('/users/exercise3/:currentcpf', function(req,res){

	var cpf = validator.trim(validator.escape(req.param('currentcpf')));

	userController.delete(cpf , function(resp){
		res.json(resp);
	})
});

///////////////////////// Exercício 4

function getToken(req, res, next){
	var header = req.headers['authorization']

	if(typeof header !== 'undefined'){
		req.token = header;
		next();
	}else{
		res.sendStatus(403); // Forbidden.
	}
}

app.get('/users/exercise4/list', getToken, function(req, res){

	var token = req.token;

	userController.listProtected(token, function(resp){
		res.json(resp);
	});
});

///////////////////////// Desafio parte 1

app.get('/users/desafio/list', getToken, function(req,res){

	var token = req.token;

	userController.listifCoach(token, function(resp){
		res.json(resp);
	});
});

app.delete('/users/desafio/:currentcpf', getToken, function(req,res){

	var token = req.token;
	var cpf = validator.trim(validator.escape(req.param('currentcpf')));

	userController.deleteifCoach(token, cpf, function(resp){
		res.json(resp);
	})
});
