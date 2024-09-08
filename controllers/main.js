const { BadRequestError } = require('../errors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
	const { username, password } = req.body;
	// gdy jest baza to robimy walidacje w mongoose
	// a takze mozemy skorzystac z Joi
	// sprawdzenie w kontrolerze

	if (!username || !password) {
		throw new BadRequestError('Please provide username and password');
	}
	//dla celów demo tworzymy id które normalnie pochodzi z bazy danych i wstawioamy jako payload do tokenu
	const id = new Date().getDate();
	const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
	// nigdy nie podajemu do token hasła albo wrażliwych danych możemy podać id i nazwę użytkownika
	// JWT_SECRET w produkcji powinien być o wiele bardzoiej skomplikowany i dłuższy np 256-bitowy ta jest tylko w celach demo
	res.status(200).json({ msg: 'user created', token });
};

const dashboard = async (req, res) => {
	const luckyNumber = Math.trunc(Math.random() * 100);
	res.status(200).json({ msg: `Hello ${req.user.username}`, secret: `Here is your authorized data: ${luckyNumber}` });
};

module.exports = { login, dashboard };
