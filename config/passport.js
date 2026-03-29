import passport from "passport";
import GitHubStrategy from 'passport-github2'
import User from '../models/User.js'

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL            // e.g., 'http://localhost:3000/api/users/auth/github/callback'
        }
    )
)