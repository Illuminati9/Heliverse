const express = require('express')
const router = express.Router();

const {createTeam, getTeamById, getTeams} = require('../controllers/team.js')

router.post('/',createTeam);
router.get('/:id',getTeamById)
router.get('/',getTeams);

module.exports = router;