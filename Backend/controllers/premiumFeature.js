const User = require('../models/user');
const Expense = require('../models/expenses');

const getUserLeaderBoard = async (req, res) => {
    try {

  
        const leaderboard = await User.find().sort({ totalExpenses: -1 });

        res.status(200).json(leaderboard)


    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
}

module.exports = {
    getUserLeaderBoard
}