import express from 'express';
import {
createService, 
deleteService, 
getAllServices, 
getService, 
updateService
} from '../controllers/service.js';
// import {verifyAdmin, verifyUser} from '../utils/verifyToken.js';
import {verifyAdmin} from '../utils/verifyToken.js';


const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createService);
// UPDATE
router.put("/:id", verifyAdmin, updateService);
// DELETE
router.delete("/:id", verifyAdmin, deleteService);
// GET
router.get("/:id", getService);
// GET ALL
router.get("/", getAllServices);

export default router;