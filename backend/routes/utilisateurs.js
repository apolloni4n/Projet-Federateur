const users = require("../controllers/utilisateuContoller")
const express = require('express')
const router = express.Router()

router.get("/",users.getUsers);
router.post("/addUser", users.setUser);
router.delete("/delete/:_id",users.deleteUser);
router.post("/login", users.login)
router.get("/getUser/:_id", users.getuserByID);
router.patch("/updateUser/:id",users.updateUser);

module.exports = router