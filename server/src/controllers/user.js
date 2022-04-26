const express = require('express')
const router = express.Router()
// const verifyToken = require('../middlewares/protectedRoute')
// const jwt = require('jsonwebtoken')
// const User = require('../models/User')

// @route GET /auth ------------------------------
// @desc Check if user is logged in
// @access Public
// router.get('/', verifyToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.userId)
//         if (!user)
//             return res.status(400).json({
//                 success: false,
//                 message: 'User is not found'
//             })
//         res.status(200).json({ success: true, user })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: 'Internal server error'
//         })
//     }
// })

module.exports = router