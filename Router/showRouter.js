import express from "express";
import { } from "../helper.js";
import axios from "axios"
import { client } from "../index.js";

const router = express.Router();

router
    .route("/getShows")
    .post(async (req, resp) => {
        console.log(req.body)
        let response
        const { email } = req.body
        let query = { userId: email }
        let userDetails = await client.db("Recommendation").collection("users").findOne(query)
        let tag = userDetails.lastViewedCategory
        let showList = await axios.get("https://api.tvmaze.com/shows")
        showList = showList.data
        if (tag) {
            response = showList.filter((e) => {
                if (e.genres.includes(tag)) {
                    return true
                }
            })
        }
        else {
            response = showList
        }
        resp.send(response)
    })

router
.route("/getDetails")
.post(async (req, resp) => {
    const { showId } = req.body
    let showList = await axios.get("https://api.tvmaze.com/shows/"+showId)
    showList = showList.data
    resp.send(showList)
})

router
    .route("/getRecommendedShows")
    .post(async (req, resp) => {
        const { genres } = req.body
        let response
        console.log(req.body)
        let showList = await axios.get("https://api.tvmaze.com/shows")
        showList = showList.data
        if(genres) {
        console.log("inside if")
         response = showList.filter((e) => {
            for (let i = 0; i < genres.length; i++) {
                if (e.genres.includes(genres[i])) {
                    return true
                }
            }
        })
    }
    else{
        response = showList
    }
        resp.send(response)
    })



export const showRouter = router