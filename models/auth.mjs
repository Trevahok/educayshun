import mongoose from 'mongoose'

export const FacultySchema = mongoose.Schema({
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
    },
    courses: [ {type : mongoose.Schema.ObjectId, ref : 'Course', name: String} ]
})

export const StudentSchema = mongoose.Schema({
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
    },
    courses: [ {type : mongoose.Schema.ObjectId, ref : 'Course', name: String} ]
})


export var Faculty = mongoose.model('Faculty', FacultySchema)
export var Student = mongoose.model('Student', StudentSchema)
