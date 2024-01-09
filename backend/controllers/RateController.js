const RateuserModel = require("../models/RateModel");





const addNewRateUser = async (req, res) => {
    const { firstName, lastName, Job, Description, Image } = req.body;
    try {

        const rateUser = new RateuserModel({
            firstName,
            lastName,
            Job,
            Description,
            Image: Image,
        });

        await rateUser.save();

        res.status(200).json({ message: 'User  submitted successfully!', rateUser });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { firstName, lastName, Job, Description, Image } = req.body;
    try {
        const userToUpdate = await RateuserModel.findById(userId);

        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }


        userToUpdate.firstName = firstName;
        userToUpdate.lastName = lastName;
        userToUpdate.Job = Job;
        userToUpdate.Description = Description;
        userToUpdate.Image = Image;


        await userToUpdate.save();

        res.status(200).json({ message: 'User updated successfully!', updatedUser: userToUpdate });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





const DeleteRateUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedRateUser = await RateuserModel.findByIdAndDelete(userId);

        if (!deletedRateUser) {
            throw Error("UserRate not found");
        }

        res.status(200).json({ message: "RateUser deleted successfully", deletedRateUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

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
const getRateUsers = async (req, res) => {
    try {
        const rateUsers = await RateuserModel.find();
        res.status(200).json(rateUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    DeleteRateUser,
    UpdateRateUser,
    GetRateUser,
    rateUser,
    getRateUsers,
    addNewRateUser,
    updateUser
}
