const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const IPINFO_API_KEY = '34b3ce3f8c5835';

app.use(express.static('public'));

app.get('/check-ip', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    try {
        const response = await axios.get(`https://ipinfo.io/${ip}?token=${IPINFO_API_KEY}`);
        const data = response.data;
        // Implementar lógica de verificação de reputação aqui
        // Por exemplo, bloquear IPs de certos países ou com certas características
        if (data.bogon || data.abuse) {
            res.status(403).send('Access Denied: Bad IP');
        } else {
            res.send('Access Granted');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
