const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
// const { getUser } = require('./utils/userUtils');
const mongoose = require('mongoose');
const models = require("./models/schema");
// const resolvers = require('./graphql/resolvers');
const { movieTypeDefs } = require("./movie.graphql");

require('dotenv').config();

async function startServer() {
const server = new ApolloServer({
typeDefs: [movieTypeDefs],
formatError: (error) => {
return {
message: error.message,
status: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
};
},
});

try {
await mongoose.connect('mongodb://0.0.0.0:27017/MovieBuffet');
console.log('Database Connected');

const { url } = await startStandaloneServer(server, {
context: async () => models,
listen: { port: process.env.PORT },
});
console.log(`Our graphql server is ⬆️ and 🏃‍♂️ in ${url}`);
} catch (error) {
console.error('Failed to start server:', error);
process.exit(1);
}
}

startServer();