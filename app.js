import express from 'express';
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from './routes/user-routes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
 
app.use("/api/user",router);
app.use("/api/blog", blogRouter);


mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://Akash:Easypeasy69@blogapp.rdayjnn.mongodb.net/?retryWrites=true&w=majority')
    .then(() => app.listen(process.env.PORT || 3000))
    .then(() => console.log("Connected to Database and server started on port 3000"))
    .catch((err) => (console.log(err)));