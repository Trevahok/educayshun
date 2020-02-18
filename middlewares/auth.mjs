
export const authContextMiddleware = (req, res, next)=>{
    res.locals.isAuthenticated = ()=> req.session.user !== undefined
    res.locals.user = req.session.user;
    res.locals.path = req.path
    res.locals.messages = req.session.messages
    res.locals.errors = req.session.errors
    delete req.session.errors
    delete req.session.messages
    next()
}

export const loginRequiredMiddleware = (req, res, next)=>{
    if( req.session.user ) 
        next()
    else{
        req.session.messages = [ 'Please Login to continue.']
        res.redirect('/auth/login?next=' + req.originalUrl)
    }

}

export const accessRequiredMiddleware = (role)=>{
    return  (req, res , next) =>{
        console.log(role)
        if( req.session.user.role !== role ){
            req.session.messages = [ 'Sorry, you do not have the clearance for this operation. Required role: ' +role]
            res.redirect('/auth/login?next=' + req.originalUrl)
        }
        else
            next()
    }
}