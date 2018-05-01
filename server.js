const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./schema/schema');

const app = express();

const port = 4000;

/**
 * Listening to the endpoint graphql to process those
 */
app.use('/graphql', expressGraphQL({
    schema,
    graphiql: true,
}))

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
})