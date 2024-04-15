import express from 'express';
import { 
createOrder, 
deleteOrder, 
getOrder, 
getOrders, 
payOrder } from '../controllers/order.js';


const router = express.Router();

// CREATE
router.post("/", createOrder);
// UPDATE
router.put("/:id/pay", payOrder);
// DELETE
router.delete("/:id", deleteOrder);
// GET
router.get("/:id", getOrder);
// GET ALL
router.get("/", getOrders);

export default router;