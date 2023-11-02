import express from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})