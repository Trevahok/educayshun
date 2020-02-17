import mongoose from 'mongoose'

const FacultySchema = mongoose.Schema({
    email: {
        type : String, 
        required: true,
    },
    name: {
        type : String, 
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false,
    }
})

const StudentSchema = mongoose.Schema({
    email: {
        type : String, 
        required: true,
    },
    name: {
        type : String, 
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: false,
    }
})


export var Faculty = mongoose.model('Faculty', FacultySchema)
export var Student = mongoose.model('Student', StudentSchema)
