import express from 'express'
import { getAllUsers, getMessages } from '../controllers/user.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';


const router= express.Router()

router.get('/', protectRoute, getAllUsers)
router.get("/messages/:userId", getMessages)
//:todo getMessages

export default router;