const express = require('express')
const router  = express.Router()

const {getAllUsers,getUser,createUser,updateUser,deleteUser,filterData} = require('../controllers/user.js')

router.get('/',getAllUsers);
router.get('/:id',getUser);
router.post('/',createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);


module.exports = router