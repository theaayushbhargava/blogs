const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1:27017/Blogss')
    .then(() => {
        console.log("Db is connected");
    }).catch((err) => {
        console.log("Db is not connected");
    })

app.set('view engine', 'ejs');
app.set('Views', path.join(__dirname, 'Views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }))  //body parsing middleware -> formdata
app.use(methodOverride('_method'))


// Task 1 Display all Blogs
app.get('/blogs', async(req, res) => {
    let allBlogs = await Blog.find({});
    res.render('index',{allBlogs});
})

// Task 2 form
app.get('/blog/new' , (req,res)=>{
    res.render('new')
})

// Task 3 actually adding in the db
app.post('/blogs' ,async(req,res)=>{
    let {title , author , comment} = req.body;
    let newBlog = await Blog.create({title , author , comment});
    res.redirect('/blogs')
 })


  //Task 4 show a particular blog
  app.get('/blogs/:id' , async(req,res)=>{
    let {id} = req.params;
    let foundProduct = await Blog.findById(id);
    res.render('show' , {foundProduct})
})

//Task 5 edit
app.get('/blogs/:idd/edit' , async(req,res)=>{
    let {idd} = req.params;
    let foundProduct =  await Blog.findById(idd);
    res.render('edit' , {foundProduct});
})

//Task 6 update a blog
app.patch('/blogs/:id' , async(req,res)=>{
    let {id} =  req.params;
    // console.log(req.params.id);
    let {comment} = req.body;
    // console.log(req.body.comment)
    await Blog.findByIdAndUpdate(id , {comment});
    res.redirect('/Blogs')
})


// Task 7 deleting
app.delete('/blogs/:id' , async(req,res)=>{
    let {id} =  req.params;
    await Blog.findByIdAndDelete(id);
    res.redirect('/blogs')
})


app.listen(8080, () => {
    console.log("Server is connected to port 8080");
})