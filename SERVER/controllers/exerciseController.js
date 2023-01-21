import 'dotenv/config';
import axios from 'axios';

const apiKey = process.env.NINJA_API_KEY;




export const getAllExercises = ( req, res) => {

    const url = 'https://api.api-ninjas.com/v1/exercises';
    const headers = {
        'X-Api-Key': apiKey
    
}

}