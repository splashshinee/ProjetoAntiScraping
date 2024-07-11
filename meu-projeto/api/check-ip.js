const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const response = await fetch(`https://ipinfo.io/${ip}?token=${process.env.IPINFO_API_KEY}`);
  const data = await response.json();

  // Você pode adicionar lógica para verificar a reputação do IP aqui
  // Por exemplo, se o IP estiver em uma lista de bloqueio
  if (data.bogon) {
    res.status(403).send('Access Denied');
  } else {
    res.status(200).send('IP Verified');
  }
};
