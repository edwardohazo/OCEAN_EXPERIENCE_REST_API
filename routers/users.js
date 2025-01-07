import express from 'express';
import {
deleteUser, 
getAllUsers, 
getUser, 
updateUser
} from '../controllers/user.js';
// import {verifyAdmin, verifyUser} from '../utils/verifyToken.js';
import {verifyAdmin} from '../utils/verifyToken.js';


const router = express.Router();

// // UPDATE
// router.put("/:id", verifyUser, updateUser);
// // DELETE
// router.delete("/:id", verifyUser, deleteUser);
// // GET
// router.get("/:id", verifyUser, getUser);
// // GET ALL
// router.get("/", verifyAdmin, getAllUsers);

// UPDATE
router.put("/:id", verifyAdmin, updateUser);
// DELETE
router.delete("/:id", verifyAdmin, deleteUser);
// GET
router.get("/:id", verifyAdmin, getUser);
// GET ALL
router.get("/", verifyAdmin, getAllUsers);

export default router;