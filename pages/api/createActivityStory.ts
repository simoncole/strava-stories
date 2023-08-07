import type { NextApiRequest, NextApiResponse } from 'next'
import { default as stravaAPI, Strava } from 'strava-v3';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import {getToken} from "next-auth/jwt";
import { getSession } from 'next-auth/react';
import { Configuration, OpenAIApi } from "openai";

const secret = process.env.JWT_SECRET as string
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(!configuration.apiKey){
        console.error("No OpenAI API key")
        res.status(400).json({error: "No OpenAI API key"})
        return
    }

    if(req.method === "POST"){
        const tokenRes = await getToken({req, secret})
        //check to make sure there is a token
        if(!tokenRes){
            console.error("No token")
            res.status(400).json({error: "No token"})
            return
        }
        const token = tokenRes.accessToken as string
        // console.log(token)

        const activityID = req.body.id
        const name = req.body.name
        console.log("name is", name)

        const stravaRes = await fetch(`https://www.strava.com/api/v3/activities/${activityID}`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
            }
          })
        const activityData = await stravaRes.json()

        const generatePrompt = (activityData: any) => {
            //could add in the splits in the future
            const EXCLUDED_KEYS = ["segment_efforts", "map", "splits_metric", "splits_standard", "laps", "best_efforts"]
            let prompt = `
            Generate a story about ${name} who went on the following ${activityData.type}. 
            I will give you all the data about the activity and I want you to write a creative story about it.
            If information seems useless, feel free to ignore it but using specific details is encouraged, however only if the details make sense.

            `
            //loop over all the keys in the activityData and add them to the prompt
            //if the key is in the EXCLUDED_KEYS array, don't add it to the prompt
            for(const key in activityData){
                if(!EXCLUDED_KEYS.includes(key)){
                    prompt += `${key}: ${activityData[key]}. `
                }
            }
            return prompt
        }

        try{
            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{ role: 'user', content: generatePrompt(activityData) }],
                
            })
            const story = response.data.choices[0].message?.content
            res.status(200).json({story: story})

        }
        catch(err){
            console.log("Error generating story")
            console.error(err)
            res.status(400).json({error: err})
            return
        }
    }
    else{
        console.error("Not a POST request")
        res.status(400).json({error: "Not a POST request"})
    }
    
}