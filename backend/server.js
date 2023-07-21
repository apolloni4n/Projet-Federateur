const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const http = require("http");
const path = require("path");
const { spawn } = require("child_process");
var cookies = require("cookie-parser");


// import  WebSocket from 'ws';
// const wss = new WebSocket.Server(
//     {
//         port:8080,
//     }
// );
require("dotenv").config();
 
app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

var server = http.createServer(app);

app.use("/js", express.static(path.join(__dirname, "./js")));
app.use("/", express.static(path.join(__dirname, "static")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// ------------------------ User Routes -----------------------------

const user = require("./routes/utilisateurs")
app.use("/api/utilisateurs/",user)

const scan = require("./routes/scans")
app.use("/api/scans/",scan)
const rapports = require("./routes/scans")
app.use("/api/rapports/",rapports)
app.use(cookies());


app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 




//---------------------Data Routes -------------------

// const data =require("./routes/dataRoute")
// app.use("/api/data",data)
// ------------------------ Port ------------------------
const connection = "mongodb://localhost:27017/store";

// Connect to db and run app
mongoose
    .connect(connection, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        server.listen(9999, () => console.log("Listening in PORT 9999"));
    })
    .catch((error) => console.log("Connection ddbb Error::", error));