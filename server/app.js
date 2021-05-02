const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();

app.use(cors());

mongoose
	.connect(
		"mongodb+srv://lucas:lucas@cluster0.nnhlw.mongodb.net/tutorial?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	.then(() => {
		console.log("Connected to database");
	});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('Now listening for requests on port 4000');
})
