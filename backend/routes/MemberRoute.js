const express = require("express");
const userAuthentication = require("../middleware/userAuthentication");

const router = express.Router();
const {  addNewMember,updateMember,deleteMember,getMembers,getTeamMembers ,GetMember } = require("../controllers/MemberController");

router.post("/addNewMember", userAuthentication, addNewMember);
router.put("/updateMember/:id", updateMember);
router.delete("/deleteMember/:id", deleteMember);
router.get("/getMembers", getMembers);
router.get("/getTeamMembers/:teamName", getTeamMembers);
router.get("/getMember/:id", GetMember);
module.exports = router;
