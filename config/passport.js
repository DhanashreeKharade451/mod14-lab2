import passport from "passport";
import GitHubStrategy from 'passport-github2'
import User from '../models/User.js'

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL            // e.g., 'http://localhost:3001/api/users/auth/github/callback'
        },

        async(accessToken, refreshToken, Profiler, done) => {
            try{
                 // The "profile" object contains the user's GitHub information
                 const existingUser = await User.findOne({githubID: Profiler.id});

                 if (existingUser){
                    // If user already exists, pass them to the next middleware
                    return done(null, existingUser);
                 }


              // If it's a new user, create a record in our database
              const newUSer = new User({
                githubID: Profiler.id,
                username: Profiler.usrname,
                email: (Profiler.emaials && Profiler.emails[0].value) || `${Profiler.username}@gmail.com` // Some providers return an array of emails
               });

               await newUSer.save();
               done(null,newUSer)

            }catch(err){
                done(err);
            }
        }

        // This is the "verify" callback
    )
);

passport.serializeUser((user,done) => {
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(IdleDeadline,(err,user) => done(err, user));
});

export default passport;
