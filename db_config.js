var db_string = 'mongodb://127.0.0.1/';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

var bcrypt = require('bcrypt-nodejs');

var jwt = require('jsonwebtoken');

db.on('error', console.error.bind(console, 'Erro ao conectar no banco'))

db.once('open', function() {

	var userSchema = mongoose.Schema({

		fullName: {
			type: String,
			required: true
		},
		cpf: {
			type: String,
			required: true,
			unique: true
		},
		age: Number,
		email: String,
		address: String,
		phoneNumber: String,
		login: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true,
			unique: true
		},
		role: {
			type: String,
			default: "Student"
		},
		coach: {
			type: String
		}
	});

	userSchema.methods.generatePassword = function(password){
		return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
	}

	userSchema.methods.validatePassword = function(password){
		return bcrypt.compareSync(password, this.password);
	}

	userSchema.methods.generateToken = function(login, cpf){
		return jwt.sign({"login": login, "cpf": cpf}, "KeyembeddedKey");
	}

	exports.User = mongoose.model('User', userSchema);

	var coachSchema = mongoose.Schema({

		login:{
			type: String,
			required: true
		},
		password:{
			type: String,
			required: true
		},
		fullName: String,
		email: String,
		birthDate: String,
		cpf: String,
		phoneNumber: String,
		address: String,
		students: Array,
		token: String
	});

	coachSchema.methods.generateToken = function(name){
		return jwt.sign({"name": name}, "embedded");
	}

	exports.Coach = mongoose.model('Coach', coachSchema);

	var studentSchema = mongoose.Schema({
		login:{
			type: String,
			required: true
		},
		password:{
			type: String,
			required: true
		},
		fullName: String,
		email: String,
		birthDate: String,
		cpf: String,
		phoneNumber: String,
		address: String,
		coach: String,
		token: String
	});

	exports.Student = mongoose.model('Student', studentSchema);
});

