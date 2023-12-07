const express = require('express')
const router  = express.Router()

const {getAllUsers,getUser} = require('../controllers/user.js')

router.get('/',getAllUsers);
router.get('/:id',getUser)


module.exports = router