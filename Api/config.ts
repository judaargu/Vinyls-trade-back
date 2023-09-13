import dotenv from 'dotenv';

dotenv.config();

export const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    TOKEN,
    URL,
    GOOGLE_CLIENT_ID, 
    GOOGLE_CLIENT_SECRET,
    DB_DEPLOY,
    PORT

} = process.env;

