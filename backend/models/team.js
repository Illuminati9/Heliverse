const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    teamId: {
        type: Number
    },
    teamName: {
        type: String,
        required: true,
    },
    teamDetails: {
        type: String,
        required: true,
    },
    teamMembers: [
        {
            type: Number,
        }
    ]
})

module.exports = mongoose.model('Team',teamSchema)