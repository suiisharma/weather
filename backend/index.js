import axios from 'axios';
import express from 'express';
import cors from 'cors';

const app = express();

const port = 5000;

app.use(express.json());
app.use(cors());



app.post('/getWeather', async (req, res) => {
    const { cities } = req.body;
    let weatherData=[];
    try {
        let reponses=await Promise.all(cities.map(city=>
            axios.get(`https://api.weatherapi.com/v1/current.json?key=43f846991dc14df78e891631230812&q=${city}`)));
            weatherData=reponses.map(response=>response.data);
            res.json(weatherData);
    } catch (error) {
            res.status(500).send('An error occurred while fetching weather data.');
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})