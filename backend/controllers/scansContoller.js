const asyncHandler = require('express-async-handler');
const Scan = require('../models/scans');
const User = require('../models/utilisateur');
const Rapports = require('../models/rapports');
const { spawn } = require("child_process");
const express = require("express");
const app = express();
const http = require("http");
const sqlite3 = require('sqlite3').verbose();
const puppeteer = require('puppeteer');
const fs = require('fs');
const pdfGenerator = require('pdfkit');
const jwt_decode = require("jwt-decode");

let db = new sqlite3.Database('/home/aihpos/Downloads/projetfed/site/mabase.db');

let sql = `SELECT * from cara_target_value;`;


//------------------GET SCANS

const getScans = asyncHandler( async (req, res) => { 
     const scan= await Scan.find({user_id:"63d6ae9512b9edb2feb763fd"});

    if (!scan) {
        res.status(404)
        throw new Error('Scan not found');
    }

    res.json(scan);
});
//export pdf file 
const exportfile = async(req, res) => {
    const id = req.params._id;
       let username = await Scan.findById(id);
  logs = username.toString();
  var scan_time=username.scantime;
  let sql1 = `SELECT start_time from targets;`;
 
    var list = [];
    list.push(logs);
 list = list.join("");
 db.all(sql1, [], (err, rows) => {
      if (err) {
      throw err;
    }
    rows.forEach((row) => {
        if (
            Math.abs(Date.parse(scan_time)- Date.parse(row.start_time))<60000
       ){        let sql2 = `SELECT * from cara_target_value INNER JOIN targets ON targets.target_id=cara_target_value.target_id where start_time="`+row.start_time+`" ;`;

db.all(sql2, [], (err, rows2) => {
   
    if (err) {
      throw err;
    }
    let theOutput = new pdfGenerator 

    // pipe to a writable stream which would save the result into the same directory
    theOutput.pipe(fs.createWriteStream('export_'+id+'.pdf'))
    theOutput.image('./logoensias.png', 50, 57, { width: 50 })
    .fillColor('#444444')
    .fontSize(16)
    .text('Report generated by Scansias™', 110, 80)
    .fontSize(12)
    .text('Scan Report', 200, 50, { align: 'right' })
    .fontSize(7)
    .text('User: doulat', 200, 110, { align: 'right' })
    .fontSize(7)
    .text(`Report Number: 1`, 200, 80, { align: 'right' })
    .text('Date: '+Date(Date.now()) , 200, 95, { align: 'right' })
     .moveDown();
   theOutput.lineCap('butt')
 .moveTo(60, 20)
 .lineTo(500, 20)
 .stroke(); 
    
  theOutput.addPage()
  theOutput.fontSize(10).fillColor('red').text(' Scan Information')
  theOutput.lineTo(100, 50, 50)
  .dash(5, {space: 10})
  .stroke();
  theOutput.fontSize(10).fillColor('blue').text('Start time:',{ align: 'left'})
    theOutput.fontSize(10).fillColor('blue').text(row.start_time,{ align: 'right'})
    theOutput.fontSize(10).fillColor('red').text(' Host Information')
    theOutput.lineTo(100, 50, 50).dash(5, {space: 10}).stroke();
    theOutput.fontSize(10).fillColor('blue').text('IP:',{ align: 'left'})
    theOutput.fontSize(10).fillColor('blue').text(rows2[0].value,{ align: 'right'})
    rows2.forEach((row2) => {  
        theOutput
          .text(row2.value, { bold: true,
           
        });
    });
   
    
    // write out file
    theOutput.end()

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
 
  //  timeout(2000);
    var file = fs.createReadStream('export_'+id+'.pdf');
    var stat = fs.statSync('export_'+id+'.pdf');
    res.setHeader('Content-Length', stat.size);
 res.setHeader('Content-Type', 'application/pdf'); 
//var data =fs.readFileSync('export'+id+'.pdf');
     //res.send(data);
    res.json({path: '/export_'+id+'.pdf'});
  file.pipe(res);

 }); 
   }
     
   Date(row.start_time)  
        
    });
  }); 

};
//------------------GET SCANS

const getScans1 = asyncHandler( async (req, res) => {
    let datab=[];let sql = `SELECT * from targets;`;

    db.all(sql, [], (err, rows) => {
      
        if (err) {
          throw err;
        }
        rows.forEach((row) => { row.value;
            
        });res.json(rows);
      }); 
    
    
});
const getrapports = asyncHandler( async (req, res) => {
    const rapport= await Rapports.find();

    if (!rapport) {
        res.status(404)
        throw new Error('rapports not found');
    }

    res.json(rapport);
    
});

//---------------------SET USERS
const newScan= async (req, res) => {
    const {name, targets,scantime } = req.body;
    console.log(scantime);
    if (!name || !targets ) {
        res.status(400)
        throw new Error('All fields are required');
    }
    try{ const scan = await Scan.create({
            name,
            targets,
            scantime,
        }); 
            
        res.json(scan);
    }catch(err){
         console.log(err);
    }
};



//Get User by Id

const getScanByID = asyncHandler( async(req, res) => {
    
    const scan= await Scan.findById(req.params._id);

    if (!scan) {
        res.status(404)
        throw new Error('Scan not found');
    }

    res.json(scan);
})

//Update User

const updateScan = asyncHandler( async(req, res) => {
    const scan= await Scan.findById(req.params.id);

    if (!scan) {
        res.status(404)
        throw new Error('Scan not found');
    }

    const updatedScan = await Scan.findByIdAndUpdate(req.params.id, req.body, {new : true});
    res.json(updatedScan);
});



//Delete user

const deleteScan = asyncHandler(async (req, res) => {
    const id = req.params._id;

    Scan.findByIdAndDelete(id)
    .then(data => {

        if (!data) {
            res.status(404).send({
                message: "Scan not found!"
            });
            } else {
            res.send({
                message: "Scan deleted successfully!"
            });
        }
    })
    .catch(err => console.warn(err))
});
 
const postupload= async(req, res) => {
    const {name, targets,scantime,userid} = req.body;
    if (!name || !targets ) {
        res.status(400)
        throw new Error('All fields are required');
    }
    try{ const scan = await Scan.create({
            name,
            targets,
            scantime,user_id:userid
        }); 
             
    }catch(err){
         console.log(err);
    }
var dataToSend;

    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    if (req) { 
                 
                const python =  spawn('python3',['printip.py', req.body.targets]);
                const ip= req.body.targets;
                python.stdout.on('data', function (data) {
                    console.log(data.toString());
                   
                 });
         python.stdout.on("data", async function(data) {
                dataToSend = [];
                    try {
                        dataToSend = data.toString().split("\n");
                        
                        var i = 0;
                        while (i < dataToSend.length) {
                            if (dataToSend[i] === "\f") {
                                dataToSend.splice(i, 1);
                            } else {
                                ++i;
                            }
                        } 
                    } catch (error) { console.log(error) }
                    //res.json(dataToSend);
             }); 
             let sql1 = `SELECT start_time from targets;`;
 
             
            python.on("close", async(code) => {
                    try { 
                        console.log(`child process close all stdio with code ${code}`);
                     res.send({dataToSend:dataToSend});
                    } catch (error) {
                        console.log(error)
                    }
                });
                await timeout(20000);
db.all(sql1, [],  async(err, rows) => {
try{  rows.forEach((row) => { 
               if (
            (scantime- Date.parse(row.start_time))<
           20000
       ){   let sql2 = `SELECT *  from cara_target_value INNER JOIN targets ON targets.target_id=cara_target_value.target_id where start_time="`+row.start_time+`" ;`;
        
db.all(sql2, [], (err, rows2) => {
   
    if (err) {
      throw err;
    }
    var datab=[];
    rows2.forEach((row2) => { 
        console.log(row2.value);
       
        datab.push(row2.value);
    }); 
   
 
 }); 
   }
     
       
        
    });} 
    catch (err) {
      throw err;
    }
  }); 
       
    }


};

module.exports = {
    getScans,
    newScan,getrapports,
    postupload, getScans1,
    deleteScan,exportfile,
    getScanByID,
    updateScan
};