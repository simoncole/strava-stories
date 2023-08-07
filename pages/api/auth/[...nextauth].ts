import NextAuth from 'next-auth'
import StravaProvider from 'next-auth/providers/strava'

export const authOptions = {
    providers: [
        StravaProvider({
            clientId: process.env.STRAVA_CLIENT_ID as string,
            clientSecret: process.env.STRAVA_CLIENT_SECRET as string
        })
    ],
    jwt: {
        secret: process.env.JWT_SECRET as string
    },
    callbacks: {
        async jwt({token, account}: any) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({session, token}: any) {
            // console.log("token", token)
            // console.log("before", session)
            session.accessToken = token.accessToken
            return session
        }
    }

}

export default NextAuth(authOptions)