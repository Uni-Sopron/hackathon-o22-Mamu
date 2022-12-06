import express from 'express'
import { pakli } from '../data/pakli.js'

const app = express();
const PORT = 4000;

/* Visszaad egy random kártyát */
app.get('/random', (req, res) => {
    const keys = Object.keys(pakli);
    if (keys.length > 0) {
        const index = Math.floor(keys.length * Math.random());
      	const key = keys[index];
        const value = pakli[key];
        return res.json({"name":key, "pic":value});
    }
    res.json({})
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err });
})

app.listen(PORT, () => {
    console.info(`Server listening on localhost:${PORT}`);
  })
