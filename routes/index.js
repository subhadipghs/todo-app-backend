const express = require('express');
const router = express.Router();
// const todoRoutes = require('./todo');
const userRoutes = require('./user/user');

router.get('/', (req, res) => {
	return res.json({
		success: true,
		message: "Welcome"
	})
})


// router.use('/todo', todoRoutes);
router.use('/user', userRoutes);



module.exports = router;