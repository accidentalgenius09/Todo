const express = require('express')
const cors = require('cors')
const Todolist = require('./db')
const app = express()
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))
app.get("/test", (req, res) => {
    res.json("test ok");
  });

app.post("/addtodo",async(req,res)=>{
    const {addtodo} = req.body
    try {
        const newTodo = await Todolist.create({
            addtodo
        })
        res.json({newTodo})
    } catch (e) {
        res.status(422).json(e)
    }
})

app.listen(3001,()=>{
    console.log("server listening at port 3001");
})