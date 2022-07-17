import express from "express";
import {} from "../helper.js";
import axios from "axios"
import { Db } from "mongodb";
import { client } from "../index.js";
const router = express.Router();

router
.route("/login")
.post(async(req,resp) => {
    let query = { userId: req.body?.email }
    let userDetails = await client.db("Recommendation").collection("users").findOne(query)
    if(!userDetails) {
        await client.db("Recommendation").collection("users").insertOne(query)
        userDetails = query
    }
    resp.send(query)    
})

export const userRouter = router