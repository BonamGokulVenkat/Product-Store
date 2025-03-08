import express from 'express';
import { connectDB } from './config/db.js';
import productsRoutes from './routes/product.router.js'
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products",productsRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(port, ()=>{
    connectDB();
    console.log(`running on ${port}`);
});