const express = require('express')

const Team = require('../models/team.js')
const User = require('../models/user.js');

exports.createTeam = async (req, res) => {
    const { memberIds } = req.body;

  try {
    const members = await User.find({ id: { $in: memberIds } });

    const domains = members.map((member) => member.domain);
    const uniqueDomains = [...new Set(domains)];
    const availableMembers = members.filter((member) => member.available);
    const team = {
      members: availableMembers,
      domains: uniqueDomains,
    };
    const teamData = await Team.create(team);
    return res.status(201).json(
        {message: 'Successfully created team',success: true,team: teamData}
    );
  } catch (err) {
    return res.status(500).json({ msg: err });
  }

}

exports.getTeamById = async (req, res) => {
    const { id } = req.params;
    try {
      const team = await Team.findById(id).populate("members");
      res.status(200).json({
        message: 'Successfully fetched Team details',
        success: true,
        team: team
      });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  };
  
  exports.getTeams = async (req, res) => {
    try {
      const teams = await Team.find({}).populate("members");
      res.status(200).json({
        message: 'Successfully fetched Team Details',
        success: true,
        teams: teams
      });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  };
  