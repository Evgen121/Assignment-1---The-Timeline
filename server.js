const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const methodOverride = require('method-override')

const app = express()


async function start() {
    try {
        await mongoose.connect('mongodb+srv://user:user123@cluster0.2o8iby9.mongodb.net/?retryWrites=true&w=majority')

        app.listen(5000, () => console.log(`server start on port ${3000}`))
    } catch (err) {
        console.log(err)
    }
}

start()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async(req, res) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles: articles })
})
app.use('/articles', articleRouter)