import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/database.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json()) // alows to use json data in the body of the request

app.use('/api/products', productRoutes)

app.listen((process.env.PORT || 5000), () => {
  connectToDatabase()
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

// ! a3L9duPxq4wwvMc8