const express = require('express');
const {
    createProduct,
    getAProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    uploadPhotos,
} = require('../controller/productController');
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadImage, productImgResize } = require('../middlewares/uploadImages');
const router = express.Router();

router.post('/', authMiddleware,isAdmin,  createProduct);
router.put('/upload/:id',authMiddleware,isAdmin,uploadImage.array('images',10),productImgResize,uploadPhotos);
router.get('/', getAllProduct);
router.put('/:id', authMiddleware,isAdmin,  updateProduct);
router.get('/:id', getAProduct);
router.delete('/:id', authMiddleware,isAdmin,  deleteProduct);



module.exports = router;