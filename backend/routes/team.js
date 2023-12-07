const express = require('express')
const router = express.Router();

const {createTeam, getTeam} = require('../controllers/team.js')

router.post('/',createTeam);
router.get('/:id',getTeam)

module.exports = router;