const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IPCSctionSchema = new Schema(
    {
        section_no:{
            type: Number,
            required: true
        },
        description:{
            type: String,
            required: true
        }
    }
);

module.exports = mongoose.model('IPCSctionSchema', IPCSctionSchema, 'ipc_section');