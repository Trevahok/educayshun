# Educayshun 
### Learn what you couldn't learn in class, online
---- 

## Features:
- Add courses 
- Remove courses 
- Enroll as teacher
- Enroll as student
- Adopt a course as a teacher
- Enroll for a course as a student 

## Tech Stack: 
- custom Generic Form rendering  - i'm gonna call it Toasty Forms , in loving memory of Django Crispy Forms
- @hapi/joi - Form validation
- express - base web framework
- bootstrap/ bootswatch - UI framework
- Pug - Templating Engine


## To run: 

```bash

npm install
npm start

```


## Toasty Forms 

The provided attributes are used as so: 

- Name is used for Label as such. 
- Name is converted into camelCase version of it for HTML name and ID
- Name is Title Cased for HTML ID 
- Widget can be one of : 
    - select
    - checkbox
    - text ( default if not provided )
    - textarea
- type is given to make the input one of : 
    - email 
    - password 
    - number 
    - tel 
- title attribute is for the form's title after Title Casing 
- action attribute sets the post method's URL which defaults to current url.
- If type is `select` or `checkbox` , Toasty expects an accompanying `values` attribute for options and values. 
- errors is an array of strings that can be attached to the form to render errors as bootstrap alerts at the top.
- submitText attribute changes the submit button's text.

### Example : 
```js

var signupForm = {
    title: "Signup Page",
    fields : [
        {
            name: 'Email',
            type: 'email'
        },
        {
            name: 'Password',
            type: 'password'
        },
        {
            name: 'Confirm Password',
            type: 'password'
        },
        {
            name: 'Address',
            widget: 'textarea'

        },
        {
            name: 'Role',
            widget:'select',
            values : ['faculty', 'student']
        }
    ]


}

```