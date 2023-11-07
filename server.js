// server.js
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080
//const PORT = process.env.PORT || 246
const cors = require('cors');
const fileUpload = require('express-fileupload');
const request = require('request');
const fs = require('fs');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(fileUpload());


app.post('/modify-question-uri', (req, res) => {
    const jsonObj = JSON.parse(JSON.stringify(req.body))

    fs.writeFile('uri.txt', jsonObj.uri, function (err) {
      if (err) throw err;
      res.send('saved')
    });
})


app.get('/questions-uri', (req, res) => {
    function readData(err, data) {
        res.send(data.trim());
    }

    fs.readFile('uri.txt', 'utf8', readData);



 
    // let options = {json: true}; //remove proxy

    // request(url, options, (error, response, body) => {
    //     if (error) {

    //         return  console.log(error)

    //     };

    //     if (!error && response.statusCode == 200) {
    //         //const JSONArr = response.body

    //         //let tmpObjArr = []

    //         //for(let i = 0; i < JSONArr.length; i++){
    //             //JSONArr[i]._id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) + ''
    //             //JSONArr[i]._id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) + ''
    //             //tmpObjArr.push(JSONArr[i])
    //         //}

    //         res.send(response.body);
    //     };
    // });
})




// app.post('/upload', (req, res) => {
//     if (!req.files) {
//         return res.status(500).send({ msg: "file is not found" })
//     }

//     const myFile = req.files.file;

//     myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
//         if (err) {
//             console.log(err)
//             return res.status(500).send({ msg: "Error occured" });
//         }
//         return res.send({name: myFile.name, path: `/${myFile.name}`});
//     });
// })








// app.get('/questions', (req, res) => {
//     //let url = "https://api.npoint.io/479353722360a1f4b218";
//     let url = 'https://api.npoint.io/9deee1f2f440fc15adb5';

//     //let options = {json: true, proxy: 'http://hrdproxy.hrd-s.com:81'}; //remove proxy
//     let options = {json: true}; //remove proxy

//     request(url, options, (error, response, body) => {
//         if (error) {

//             return  console.log(error)

//         };

//         if (!error && response.statusCode == 200) {
//             //const JSONArr = response.body

//             //let tmpObjArr = []

//             //for(let i = 0; i < JSONArr.length; i++){
//                 //JSONArr[i]._id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) + ''
//                 //JSONArr[i]._id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now())) + ''
//                 //tmpObjArr.push(JSONArr[i])
//             //}

//             res.send(response.body);
//         };
//     });

// })

app.listen(PORT, function(){
    console.log('Server is running on Port:',PORT);
});

app.use('/dist/', function(req, res, next) {
        req.url = req.url.replace(/\/([^\/]+)\.[0-9a-f]+\.(css|js|jpg|png|gif|svg)$/, "/$1.$2");
        next();
});

 app.use(express.static(path.join(__dirname, "./dist")))
 app.get('/*', (req, res) => {
     res.sendFile(path.join(__dirname, './dist', 'index.html'))
 })