const scans = require("../controllers/scansContoller")
const express = require('express')
const router = express.Router()

router.get("/",scans.getScans);
router.get("/results",scans.getScans1);
router.post("/newScan", scans.newScan);
router.delete("/delete/:_id",scans.deleteScan);
router.post("/upload",scans.postupload);
router.get("/getScan/:_id", scans.getScanByID);
router.patch("/updateScan/:id",scans.updateScan);
router.get('/exportfile/:_id',scans.exportfile);
router.get("/rapports",scans.getrapports);

module.exports = router