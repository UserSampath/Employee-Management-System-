const MemberModel = require("../models/MemberModel");
const { Teams } = require("../utils/Constants");


const addNewMember = async (req, res) => {
    const { firstName, lastName, Job, Description, Image,email ,SelectedTeams,Projects,contactNumber,StartedDate} = req.body;
    try {

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
            StartedDate
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
        StartedDate,SelectedTeams,} = req.body;
    try {
        const userToUpdate = await MemberModel.findById(userId);

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
/*
const UpdateRateUser = async (req, res) => {
    const { Rate, userId } = req.body;

    try {
        const updatedRateUser = await RateuserModel.findByIdAndUpdate(
            userId,
            { $push: { Rate: Rate } },
            { new: true, runValidators: true }
        );

        if (!updatedRateUser) {
            throw Error("User not found");
        }

        res.status(200).json({ message: "User updated successfully", updatedRateUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const GetRateUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const rateUser = await RateuserModel.findById(userId);

        if (!rateUser) {
            throw Error("User not found");
        }

        res.status(200).json({ rateUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// new
const rateUser = async (req, res) => {
    const { Rate, id } = req.body;
    try {
        const updatedRateUser = await RateuserModel.findByIdAndUpdate(
            id,
            { $push: { Rate: Rate } },
            { new: true }

        );

        if (!updatedRateUser) {
            throw Error("User not found");
        }

        res.status(200).json({ message: "User updated successfully", Rate: updatedRateUser.Rate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/
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
    //DeleteRateUser,
    //UpdateRateUser,
    //GetRateUser,
    //rateUser,
    //getRateUsers,
    getMembers,
    deleteMember,
    addNewMember,
    updateMember,
    getTeamMembers
}
