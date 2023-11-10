import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';
import connectDB from './config/db.js';
dotenv.config();
const PORT = process.env.PORT || 3005;

const app = express();
connectDB();
app.use(cors());


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})