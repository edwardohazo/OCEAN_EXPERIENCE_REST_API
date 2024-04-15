import User from '../models/User.js';


// UPDATE User
export const updateUser = async (req, res, next) => {
    let id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
}
// DELETE User
export const deleteUser = async (req, res, next) => {
    let id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json(`User ${id} has been deleted!`);
    } catch (err) {
        next();
    }
}
// GET User
export const getUser = async (req, res, next) => {
    let id = req.params.id;

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}
// GET ALL Users
export const getAllUsers = async (req, res, next) => {
    const failed = true;

    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (err) {
        next(err);
    }
}