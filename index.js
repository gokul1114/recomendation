import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { showRouter } from "./Router/showRouter.js";
import { userRouter } from "./Router/userRouter.js";

const app = express();
app.use(cors())
app.use(express.json())
dotenv.config()

const PORT = process.env.PORT || 8000;
const MONGO_URL = process.env.MONGO_URL;

export async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongo connected successfully")
    return client ;
}
  
export const client = await createConnection();

app.use("/show", showRouter)
app.use("/user", userRouter)
app.get("/", (req,res) => {
    res.send("Node Runnning Successfully")
})

app.listen(PORT,() => {console.log("server started")})