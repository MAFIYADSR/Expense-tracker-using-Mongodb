const mongoose = require('mongoose');

const FileSchema =  new mongoose.Schema({

    filesUrl: { type: String, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
})

const Filesdownloaded = mongoose.model('Filesdownloaded', FileSchema);

module.exports = Filesdownloaded;