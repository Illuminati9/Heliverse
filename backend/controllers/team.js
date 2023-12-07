const express = require('express')

const Team = require('../models/team.js')
const User = require('../models/user.js')

exports.createTeam = async (req, res) => {
    try {
        const { teamName, teamDescription, teamMembers } = req.body;

        if (!teamName || !teamDescription || !teamMembers) {
            return res.status(403).json({
                message: 'Please provide all the required details to create the team',
                success: false
            })
        }
        if(teamMembers.length==0){
            return res.status(400).json({
                message: 'Team Member details not provided',
                success: false,
            })
        }
        
        for(let i=0;i<teamMembers.length;i++){
            let user = await User.find({id:teamMembers[i]});
            if(!user){
                return res.status(400).json({
                    message: `User not found with id: ${teamMembers[i]}`,
                    success: false
                })
            }
        }

        const teams = await Team.find({});
        if(!teams){
            return res.status(404).json({
                message:'Something went wrong while getting details of the teams',
                success: false
            })
        }

        let teamId;
        if(teams.length==0){
            teamId=1;
        }else{
            teamId = teams[teams.length-1].teamId+1;
        }

        const newTeam = await Team.create({
            teamId,teamName,teamDescription,teamMembers
        });

        return res.status(201).json({
            message: 'Team created Successfully',
            success: true,
            team: newTeam
        });

    } catch (error) {
        console.log('/createTeam', error);
        return res.status(500).json({
            message: 'Something went wrong while creating team',
            success: false
        })
    }

}

exports.getTeam = async(req,res)=>{
    try {
        const {id} = req.params;
        const newId = parseInt(id);

        const team = await Team.find({teamId: newId});
        if(team.length==0){
            return res.status(404).json({
                message: `No team found with id: ${id}`,
                success: false
            })
        }

        return res.status(200).json({
            message: 'Team details fetched Successfully',
            success: true,
            team: team
        })

    } catch (error) {
        console.log('/getTeam',error);
        return res.status(500).json({
            message: 'Something went wrong while getting details of the team',
            success: false
        })
    }
}