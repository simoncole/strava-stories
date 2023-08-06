import type { NextApiRequest, NextApiResponse } from 'next'
import strava from 'strava-v3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        const activityID = req.body.id;
        console.log(activityID);
        console.log(process.env.ACCESS_TOKEN)
        // strava.config({
        //     "access_token": process.env.STRAVA_ACCESS_TOKEN

        // }) 
       
    }
    else{
        console.error("Not a POST request")
        res.status(400).json({error: "Not a POST request"})
    }
    
}