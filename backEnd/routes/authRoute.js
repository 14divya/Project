const express = require('express');
const { 
    createUser, 
    loginUserController, 
    getAllUser, 
    getAUser, 
    deleteAUser, 
    updateUser, 
    handleRefreshToken,
    logout
 } = require('../controller/userController');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
router.post('/register',createUser);
router.post('/login',loginUserController);
router.get('/all-users',getAllUser);
router.get('/refresh',handleRefreshToken);
router.get('/logout',logout);
router.get('/:id',authMiddleware, getAUser);
router.delete('/:id',deleteAUser);
router.put('/edit-user',authMiddleware,updateUser);


module.exports = router;