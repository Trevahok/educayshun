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
---
- Custom Generic Form rendering  - i'm gonna call it Toasty Forms , in loving memory of Django Crispy Forms
- Custom Auth framework based on Sessions for Server Side Rendering - could have used Passport.js , but really wanted to re-learn things from scratch in JS this time. 
- @hapi/joi - Form validation
- express - base web framework
- bootstrap/ bootswatch - UI framework
- Pug - Templating Engine

---

## To run: 

```bash

npm install
npm start

```


## Auth Module
---

Express-session is used to maintain server side sessions. It can be configured to use persistent MongoStore sessions.
- constants.mjs files contains names like 'faculty' or 'student' for internationalisation/ localisation purposes in 
- Authentication using `loginRequiredMiddleware`.
- Authorization using `accessRequiredMiddleware` is based on a higher-order function that takes in `role` to return a middleware.
- authContextMiddleware provides context data like `path` , `user` and flash messages `messages`  for Pug and other routes. 
- Flash messages using `req.session.messages` which can be accessed by Pug as `messages`. 
- All redirects take an optional `?next=` Query parameter that will redirect to current page after the redirection is complete.
- `req.session.user` object is set on successful login and contains :

```js
req.session.user  = {
    id: user.id,
    name: user.name,
    role : 'student' || 'faculty'
}
```



#### Endpoints: 
Endpoints | Purpose
--- | --- |
 /auth/login?next=/ |  Login and set req.session.user and redirects |
 /auth/signup | Signup as faculty or student
 /auth/logout | Destroys session and redirect to home




## Toasty Forms - Generic Form rendering engine
---
The provided attributes are used like so: 

- `name` is used for Label as such. 
- `name` is converted into camelCase version of it for HTML name and ID
- `name` is Title Cased for HTML ID 
- `widget` can be one of : 
    - select
    - checkbox
    - text ( default if not provided )
    - textarea
- `type` is given to make the input one of : 
    - email 
    - password 
    - number 
    - tel ... or other accepted HTML type attribute values 
- `title` attribute is for the form's title after Title Casing 
- `action` attribute sets the post method's URL which defaults to current url.
- If type is `select` or `checkbox` , Toasty expects an accompanying `values` attribute for options and values. 
- For `select` type of widgets , an additional `multiple` attribute can be passed for multiple select.
- `errors` is an array of strings that can be attached to the form to render errors as bootstrap alerts at the top.
- `submitText` attribute changes the submit button's text. Defaults to 'Submit'.
- `default` attribute within `fields` is used to prepopulate the data. 
- `values` attribute inside the form contains camelCased key created from the `name` attribute of the field. 
- Toasty also renders flash messages using `messages` variable in res.locals. Or can be provided by context. 

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
            widget: 'textarea',
            default: 'Default address',

        },
        {
            name: 'Role',
            widget:'select',
            multiple: true,
            values : ['faculty', 'student']
        }
    ],
    values: {
        email:'default email to show' ,
        confirmPassword: 'auto camelcased names are used' ,
    }


}

```

### Usage : 

   Use toasty like so: 
   ```js
   res.render( 'toasty' ,
        { form: { 
                values: {defaultValues, ...formName} ,
                errors: [ 'array' , 'of', 'errors'] 
            }
        }
    )
   ```