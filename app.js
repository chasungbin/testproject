const express = require('express');
const fs = require('fs');
const https = require('https');
const http = require('http');
const app = express();
const app2 = express();
const sport = 443
const port = 3000
const cors = require('cors')

const log = require('./src/middlewars/log');

app.use(cors());
app.use(express.json());
app.use(log())
//http유저 https 로 접속 다이렉션
app2.use((req, res, next)=>{
    if(req.secure){
        next();
    }else{
        const to = `https://${req.hostname}:${sport}${req.url}`
    }
})

//SSL인증서
const option = {
        ca: fs.readFileSync('/../../etc/letsencrypt/live/sdfoaj.shop/fullchain.pem'),
        key: fs.readFileSync('/../../etc/letsencrypt/live/sdfoaj.shop/privkey.pem'),
        cert: fs.readFileSync('/../../etc/letsencrypt/live/sdfoaj.shop/cert.pem'),
}



http.createServer(app).listen(port, () =>{
    console.log(`${port}server start`)
})

https.createServer(option,app).listen(sport, () =>{
    console.log('서버가 작동!!!!')
})