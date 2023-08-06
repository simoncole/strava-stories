import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET"){
        


        res.status(200).json({ status: 'success' })
    }
    else{
        console.error("Not a GET request")
        res.status(400).json({error: "Not a GET request"})
    }
}