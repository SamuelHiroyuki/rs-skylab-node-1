const express = require("express");

const server = express();

server.use(express.json());

const users = ["Samuel", "Zamuel", "Samuka"];

server.get("/users", (req, res) => {
	return res.json(
		users.map((u, index) => ({
			id: index,
			name: u
		}))
	);
});

server.get("/users/:id", (req, res) => {
	const { id } = req.params;
	// const { name } = req.query;
	// return res.json({
	// 	id,
	// 	name,
	// 	message: `Hello World, ${name}!`
	// });

	return res.json({
		id,
		name: users[id]
	});
});

server.post("/users", (req, res) => {
	const { name } = req.body;
	users.push(name);
	const id = users.length - 1;
	return res.json({
		id,
		name
	});
});

server.put("/users/:id", (req, res) => {
	const { name } = req.body;
	const { id } = req.params;
	users[id] = name;
	return res.json({
		id,
		name
	});
});

server.delete("/users/:id", (req, res) => {
	const { id } = req.params;
	users.splice(id, 1);
	return res.json({
		message: "The user has been successfully deleted!"
	});
});

server.listen(3000);
