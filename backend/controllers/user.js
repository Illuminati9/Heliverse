const User = require('../models/user.js')
const mongoose = require('mongoose')

exports.getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({}, {
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
        console.log('/', error)
        return res.status(500).json({
            message: 'Something went wrong while retrieving all the users',
            success: false
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.find({ id: id });
        if (user.length==0) {
            return res.status(404).json({
                message: `User not found with given ${id}`,
                success: false,
            })
        }

        return res.status(200).json({
            message: "User details successfully fetched",
            success: true,
            user: user
        })
    } catch (error) {
        console.log('/:id', error);
        return res.status(500).json({
            message: 'Something went wrong while retrieving data of single user',
            success: false
        })
    }
}

exports.createUser = async (req, res) => {
    try {
        const allUsers = await User.find({},{id: true,first_name: true,last_name: true,email: true, available: true, avatar: true,domain: true,gender: true});
    
        console.log(allUsers);

        if (!allUsers) {
            return res.status(403).json({
                message: "Something went wrong while getting details of remaining users",
                success: false
            })
        }

        const { first_name, last_name, email, gender, avatar, domain, available } = req.body;
        if (!first_name || !last_name || !email || !gender || !avatar || !domain || available == null) {
            return res.status(404).json({
                message: "Please provide all the details to create user",
                success: false
            })
        }

        let newId = allUsers[allUsers.length - 1].id;

        console.log(typeof (newId))

        const newUser = await User.create({
            id: newId + 1,
            first_name,
            last_name,
            email,
            gender,
            avatar,
            domain,
            available
        });

        return res.status(201).json({
            message: "User created Successfully",
            success: true,
            user: newUser
        });

    } catch (error) {
        console.log('/createUser', error);
        return res.status(500).json({
            message: "Something went wrong while creating user",
            success: false,
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let newId = parseInt(id)
        // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

        const user = await User.findOne({ id: newId });
        if (!user) {
            return res.status(404).json({
                message: `User not found with given ${id}`,
                success: false,
            })
        }

        const { first_name, last_name, email, avatar, domain, gender, available } = req.body;
        const updatedUser = await User.findOneAndUpdate({ id: newId }, {
            first_name, last_name, email, domain, available, avatar, gender
        })

        if (!updatedUser) {
            return res.status(400).json({
                message: "Something went wrong while updating user details",
                success: false,
            })
        }

        return res.status(200).json({
            message: 'User details updated successfully',
            success: true,
            user: updatedUser,
        });

    } catch (error) {
        console.log('/updateUser', error);
        return res.status(500).json({
            message: 'Something went wrong while updating the user',
            success: false
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        let newId = parseInt(id);
        console.log(typeof(newId));
        const user = await User.findOne({ id: newId });
        if (!user) {
            return res.status(404).json({
                message: `User not found with given ${id}`,
                success: false,
            })
        }

        await User.findOneAndDelete({ id: newId });

        return res.status(200).json({
            message: 'User deleting Successfully',
            success: true
        })

    } catch (error) {
        console.log('/deleteUser', error);
        return res.status(500).json({
            message: 'Something went wrong while deleting user',
            success: false
        })
    }
}

exports.filterData = async (req, res) => {
    try {
        const { search, page, gender, domain,available } = req.query;
        console.log(search,page,gender,domain,available);
        let newPage = parseInt(page) || 1;
        let status=available;
        const pageSize = 20;
        if(status=='true'){
            status=true
        }else{
            status=false
        }

        let filteredData = await User.find({});
        if (!filteredData) {
            return res.status(404).json({
                message: 'Can\'t fetch user data',
                success: false
            })
        }

        if (search) {
            filteredData = filteredData.filter(item => {
                const fullName = `${item.first_name} ${item.last_name}`;
                return fullName.toLowerCase().includes(search.toLowerCase());
            });
        }

        if (gender) {
            filteredData = filteredData.filter(item => {
                return item.gender.toLowerCase().includes(gender.toLowerCase());
            })
        }

        if (domain) {
            filteredData = filteredData.filter(item => {
                return item.domain.toLowerCase() === domain.toLowerCase();
            })
        }

        filteredData = filteredData.filter(item=>{
            return item.available===status;
        })

        const startIndex = (newPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedData = [];

        for (let i = startIndex; i < Math.min(endIndex, filteredData.length); i++) {
            paginatedData.push(filteredData[i]);
        }

        res.json({
            data: paginatedData,
            page: newPage,
            totalPages: Math.ceil(filteredData.length / pageSize),
            message: 'Successfully filtered data',
            success: true
        });

    } catch (error) {
        console.log('/filter', error);
        return res.status(500).json({
            message: 'Something went wrong while filtering the data',
            success: false
        })
    }
}