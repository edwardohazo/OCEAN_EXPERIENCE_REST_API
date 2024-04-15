import Service from '../models/Service.js';


// CREATE SERVICE
export const createService = async (req, res, next) => {

    const newService = new Service(req.body);
    try {
        const savedService = await newService.save();
        res.status(200).json(savedService);
    } catch (err) {
        next(err);
    }
}
// UPDATE SERVICE
export const updateService = async (req, res, next) => {
    let id = req.params.id;
    try {
        const updatedService = await Service.findByIdAndUpdate(
            id, 
            {$set: req.body}, 
            {new: true}
        );
        res.status(200).json(updatedService);
    } catch (err) {
        next(err);
    }
}
// DELETE SERVICE
export const deleteService = async (req, res, next) => {
    let id = req.params.id;
    try {
        await Service.findByIdAndDelete(id);
        res.status(200).json(`Service ${id} has been deleted!`);
    } catch (err) {
        next(err);
    }
}
// GET SERVICE
export const getService = async (req, res, next) => {
    let id = req.params.id;

    try {
        const service = await Service.findById(id);
        res.status(200).json(service);
    } catch (err) {
        next(err);
    }
}
// GET ALL SERVICES
export const getAllServices = async (req, res, next) => {
    const failed = true;

    try {
        const allServices = await Service.find();
        res.status(200).json(allServices);
    } catch (err) {
        next(err);
    }
}