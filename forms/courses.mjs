
var courseForm =  {
    title: 'Add course',
    fields:[
        { name: 'Title', helpText: 'Enter the title of the course'},
        { name: 'Capacity', type: 'number' , helpText : 'Max. number of students'},
        { name: 'From', type: 'date', helpText: 'Select the course start date' },
        { name: 'To', type: 'date', helpText: 'Select the course end date' },
    ],
}

export {courseForm}