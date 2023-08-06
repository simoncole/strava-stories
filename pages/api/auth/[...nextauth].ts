import NextAuth from 'next-auth'
import StravaProvider from 'next-auth/providers/strava'

export default NextAuth({
    providers: [
        StravaProvider({
            clientId: process.env.STRAVA_CLIENT_ID as string,
            clientSecret: process.env.STRAVA_CLIENT_SECRET as string
        })
    ],
})
