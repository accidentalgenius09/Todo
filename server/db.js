const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Todo',{useNewUrlParser:true})

const TodoSchema = new mongoose.Schema({
    addtodo: {
        type: String,
        required: true
    }
})

const Todo = mongoose.model('TodoList', TodoSchema)

module.exports= Todo
