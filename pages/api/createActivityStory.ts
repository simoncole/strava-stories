import type { NextApiRequest, NextApiResponse } from 'next'
import { default as strava, Strava } from 'strava-v3';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        const activityID = req.body.id;
        console.log(activityID);

        //@ts-ignore
        // strava.config({
        //     access_token: process.env.STRAVA_ACCESS_TOKEN as string
        // }) 

        // const payload = await strava.athlete.get({})

        const payload = await strava.activities.get({id: activityID})
        console.log(payload);
       res.status(200).json({ status: 'success' })
    }
    else{
        console.error("Not a POST request")
        res.status(400).json({error: "Not a POST request"})
    }
    
}