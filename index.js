const express = require("express");

const server = express();

server.use(express.json());

const users = ["Samuel", "Zamuel", "Samuka"];

server.use((req, res, next) => {
	console.time("Request time");
	console.log(`Request type: ${req.method}`);
	console.log(`URL: ${req.url}`);

	next();
	console.timeEnd("Request time");
});

const checkIsValidUser = (req, res, next) => {
	if (!req.body.name) {
		return res.status(400).json({
			error: "The property 'name' is required!"
		});
	}

	return next();
};

const checkUserExists = (req, res, next) => {
	const user = users[req.params.id];
	if (!user) {
		return res.status(400).json({
			error: "The user does not exists!"
		});
	}

	req.user = user;

	return next();
};

server.get("/users", (req, res) => {
	return res.json(
		users.map((u, index) => ({
			id: index,
			name: u
		}))
	);
});

server.get("/users/:id", checkUserExists, (req, res) => {
	const { id } = req.params;
	// const { name } = req.query;
	// return res.json({
	// 	id,
	// 	name,
	// 	message: `Hello World, ${name}!`
	// });

	return res.json({
		id,
		name: req.user
	});
});

server.post("/users", checkIsValidUser, (req, res) => {
	const { name } = req.body;
	users.push(name);
	const id = users.length - 1;
	return res.json({
		id,
		name
	});
});

server.put("/users/:id", checkUserExists, checkIsValidUser, (req, res) => {
	const { name } = req.body;
	const { id } = req.params;
	users[id] = name;
	return res.json({
		id,
		name
	});
});

server.delete("/users/:id", checkUserExists, (req, res) => {
	const { id } = req.params;
	users.splice(id, 1);
	return res.json({
		message: "The user has been successfully deleted!"
	});
});

server.listen(3000);
