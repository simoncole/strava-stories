import type { NextApiRequest, NextApiResponse } from 'next'
import { default as stravaAPI, Strava } from 'strava-v3';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import {getToken} from "next-auth/jwt";
import { getSession } from 'next-auth/react';

const secret = process.env.JWT_SECRET as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST"){
        const tokenRes = await getToken({req, secret})
        //check to make sure there is a token
        if(!tokenRes){
            console.error("No token")
            res.status(400).json({error: "No token"})
            return
        }
        const token = tokenRes.accessToken as string
        console.log(token)

        //@ts-ignore
        // const strava = new stravaAPI.client(token);
        // console.log(activityID)
        // //@ts-ignore
        // const activity = await strava.activities.get({id: activityID}) 
        // console.log(activity)

        const activityID = req.body.id

        const stravaRes = await fetch(`https://www.strava.com/api/v3/activities/${activityID}`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
        const activity = await stravaRes.json()
        console.log(activity)
        res.status(200).json({message: "Success"})
        
    }
    else{
        console.error("Not a POST request")
        res.status(400).json({error: "Not a POST request"})
    }
    
}