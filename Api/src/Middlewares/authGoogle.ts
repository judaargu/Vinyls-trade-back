import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../config";
import { Users } from "../Models/Users";

passport.use("Auth-google", new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID || '',
    clientSecret: GOOGLE_CLIENT_SECRET || '',
    callbackURL: "http://localhost:3001/auth/google"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
        if (profile.emails && profile.emails[0] && profile.emails[0].value) {
            const user = await Users.findOne({ where: { email: profile.emails[0].value } });
            if (user){
                return cb(null, user);
            } else {   
                return cb(new Error('No se encontró un correo electrónico válido en el perfil.'), undefined);
            }
        }

    } catch (error) {
        return cb(new Error('Algo salió mal en el servidor'), undefined);
    }
  }
));