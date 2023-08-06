import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET"){
        const code = req.query.code
        const scope = req.query.scope
        const state = req.query.state
        console.log(code, scope, state)

        const cookie = `token=${code}; Path=/; HttpOnly; SameSite=Strict;`

        res.setHeader('Set-Cookie', cookie)

        res.writeHead(302, {Location: "http://localhost:3000"})
        res.end()
    }
    else{
        console.error("Not a GET request")
        res.status(400).json({error: "Not a GET request"})
    }
}