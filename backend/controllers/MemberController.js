const MemberModel = require("../models/MemberModel");
const { Teams } = require("../utils/Constants");
const validator = require("validator");


const addNewMember = async (req, res) => {
    const { firstName, lastName, Job, Description, Image, email, SelectedTeams, Projects, contactNumber, StartedDate, GitUserName } = req.body;
    try {

        if (!validator.isEmail(email)) {
            throw Error("Email not valid");
        }
        const existingUsers = await MemberModel.findOne({ email: email });
        if (existingUsers) {
            throw Error("User already exists"); 
        }
  
        const Member = new MemberModel({
            firstName,
            lastName,
            Job,
            Description,
            Image: Image,
            email,
            SelectedTeams,
            contactNumber,
            Projects,
            StartedDate,
            GitUserName
        });

        await Member.save();

        res.status(200).json({ message: 'Member details  submitted successfully!', Member });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}



const updateMember = async (req, res) => {

    const userId = req.params.id;
    const { firstName, lastName, Job, Description, Image,contactNumber ,email,Projects,
        StartedDate,SelectedTeams,GitUserName} = req.body;
    try {

        const userToUpdate = await MemberModel.findById(userId);

        if (!validator.isEmail(email)) {
            throw Error("Email not valid");
        }
     
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.Job = Job;
        userToUpdate.Description = Description;
        userToUpdate.Image = Image;
        userToUpdate.email = email;
        userToUpdate.contactNumber = contactNumber;
        userToUpdate.Projects = Projects;
        userToUpdate.StartedDate = StartedDate;
        userToUpdate.SelectedTeams = SelectedTeams;
        userToUpdate.GitUserName = GitUserName;


        await userToUpdate.save();

        res.status(200).json({ message: 'Member data  updated successfully!', updatedUser: userToUpdate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};




const deleteMember = async (req, res) => {
    const memberId = req.params.id;

    try {
        const deletedMember = await MemberModel.findByIdAndDelete(memberId);

        if (!deletedMember) {
            throw Error("Member not found");
        }

        res.status(200).json({ message: "Member deleted successfully", deletedMember });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const GetMember = async (req, res) => {
    const userId = req.params.id;
    try {
        const Member = await MemberModel.findById(userId);

        if (!Member) {
            throw Error("User not found");
        }

        res.status(200).json({ Member });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const getMembers = async (req, res) => {
    try {
        const Members = await MemberModel.find();
        res.status(200).json(Members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTeamMembers = async (req, res) => {
    try {
        const teamName = req.params.teamName;

        const validTeams = [Teams.WebTeam, Teams.UiTeam, Teams.FlutterTeam, Teams.QaTeam, Teams.ApiTeam];
        if (!validTeams.includes(teamName)) {
            return res.status(400).json({ error: 'Invalid team name' });
        }

        const members = await MemberModel.find({ SelectedTeams: teamName });

        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    GetMember,
    getMembers,
    deleteMember,
    addNewMember,
    updateMember,
    getTeamMembers
}
