import type { NextApiRequest, NextApiResponse } from 'next'
import { default as strava, Strava } from 'strava-v3';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import {getToken} from "next-auth/jwt";
import { getSession } from 'next-auth/react';

const secret = process.env.JWT_SECRET as string

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const session = await getServerSession(req, res, authOptions)
    // console.log(session)

    // if(!session){
    //     res.status(401).json({error: "Not authenticated"})
    //     return
    // }

    const token = await getToken({req, secret})
    console.log("token", token)
    //@ts-ignore
    // console.log(session.accessToken)
    if(req.method === "POST"){
        const activityID = req.body.id;
        console.log(activityID);



        //@ts-ignore
        strava.config({
            access_token: process.env.STRAVA_ACCESS_TOKEN as string
        }) 

        const payload = await strava.athlete.get({})
        console.log(payload)
        // const res = await fetch(`https://www.strava.com/api/v3/athlete/`)

       res.status(200).json({ status: 'success' })
    }
    else{
        console.error("Not a POST request")
        res.status(400).json({error: "Not a POST request"})
    }
    
}