import mongoose from 'mongoose'
import { StudentSchema } from "../models/auth.mjs";

export const CourseSchema = mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    from:{
        type: Date,
        default: Date.now,
        required: true
    },
    to:{
        type: Date,
        default: Date.now,
        required: true
    },
    capacity: {
        type: Number,
        default: 50,
        required: true,
    },
    instructor:{
        type: String,
        required:true,
    },
    students: [ {type : mongoose.Schema.ObjectId, ref : 'Student'} ]

})


export var Course = mongoose.model( 'Course', CourseSchema )