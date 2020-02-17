import express from 'express'

export default app = express.Router()

app.use('/*', (req, res , next) =>{
    const date = new Date().getTime()
    console.log("start time : " ,  date)
    next()
    console.log("end time : " ,  date)
})

app.get('/users', async (req, res) => {
    res.json(data)
})

app.post('/users', (req, res) => {
    data[count++] = req.body
    res.json(
        req.body
    )
})

app.use('/users/:id',(req, res, next) =>{
    const id = req.params.id
    const username = req.headers.username
    const password = req.headers.password
    console.log(id , username , password , data[id].username , data[id].password)
    if( ! id in data)
        return res.sendStatus(404)
    else if( username && password && data[id] && data[id].username === username && data[id].password === password )
        next()
    else
        res.sendStatus(403)
} )

app.get('/users/:id', (req, res) =>{
    res.json(data[req.params.id])
})

app.put('/users/:id', (req, res) =>{

    data[req.params.id] = req.body

})

app.delete('/users/:id', (req, res) =>{
    var instance = data[req.params.id]
    delete data[req.params.id]
    res.json(instance)

})
