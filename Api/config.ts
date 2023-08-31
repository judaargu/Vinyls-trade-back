import dotenv from 'dotenv';

dotenv.config();

export const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
    TOKEN,
    URL
} = process.env;