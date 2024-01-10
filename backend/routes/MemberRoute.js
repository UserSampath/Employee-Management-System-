const express = require("express");
const multer = require('multer');
const userAuthentication = require("../middleware/userAuthentication");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
const {  addNewMember,updateMember,deleteMember,getMembers,getTeamMembers ,GetMember } = require("../controllers/MemberController");

router.post("/addNewMember", userAuthentication, addNewMember);
router.put("/updateMember/:id", updateMember);
router.delete("/deleteMember/:id", deleteMember);
router.get("/getMembers", getMembers);
router.get("/getTeamMembers/:teamName", getTeamMembers);
router.get("/getMember/:id", GetMember);

/*
router.delete("/deleteRateUser/:id", DeleteRateUser);
router.put("/UpdateRateUser", UpdateRateUser);
router.put("/rateUser", rateUser);
router.get("/getRateUsers", getRateUsers);
router.get("/getRateUsersForAdmin", userAuthentication, getRateUsers);
router.get("/getRateUser/:id", GetRateUser);*/
module.exports = router;
