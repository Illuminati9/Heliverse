const User = require('../models/user.js')
const mongoose = require('mongoose')

exports.getAllUsers = async(req,res)=>{
    try {
        const allUsers = await User.find({},{
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            gender: true,
            avatar: true,
            domain: true,
            available: true,
        });

        return res.status(200).json({
            message: 'Successfully fetched user data',
            success: true,
            users: allUsers
        })
    } catch (error) {
        console.log('/',error)
        return res.status(500).json({
            message: 'Something went wrong while retrieving all the users',
            success: false
        })
    }
}

exports.getUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.find({id: id});
        if(!user){
            return res.status(404).json({
                message:`User not found with given ${id}`,
                success: false,
            })
        }
        return res.status(200).json({
            message:"User details successfully fetched",
            success: true,
            user: user
        })
    } catch (error) {
        console.log('/:id',error);
        return res.status(500).json({
            message:'Something went wrong while retrieving data of single user',
            success: false
        })
    }
}

exports.createUser = async(req,res)=>{
    try {
        const allUsers = User.find({});
        console.log(allUsers.length);

        if(!allUsers)
        {
            return res.status(403).json({
                message: "Something went wrong while getting details of remaining users",
                success: false
            })
        }

        const {first_name,last_name,email,gender,avatar,domain,available} = req.body;
        if(!first_name||!last_name||!email||!gender||!avatar||!domain||available==null){
            return res.status(404).json({
                message: "Please provide all the details to create user",
                success: false
            })
        }

        const newUser = User.create({
            id: allUsers.length+1,
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available
        });

        return res.status(201).json({
            message:"User created Successfully",
            success: false,
            user: newUser
        });

    } catch (error) {
        console.log('/createUser',error);
        return res.status(500).json({
            message: "Something went wrong while creating user",
            success: false,
        })
    }
}

exports.updateUser=async(req,res)=>{
    try {
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const user = await User.find({id: id});
        if(!user){
            return res.status(404).json({
                message:`User not found with given ${id}`,
                success: false,
            })
        }

        const {first_name,last_name,email,avatar,domain,gender,available} = req.body;
        

    } catch (error) {
        console.log('/updateUser',error);
        return res.status(500).json({
            message: 'Something went wrong while updating the user',
            success: false
        })
    }
}