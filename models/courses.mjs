import mongoose from 'mongoose'

const CourseSchema = mongoose.Schema({
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
    }

})


export var Course = mongoose.model( 'Course', CourseSchema )