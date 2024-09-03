const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
    expenseamount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
