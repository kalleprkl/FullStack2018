const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user')
    const comments = await Comment.find({})
    console.log(comments)
    const blogsWithComments = blogs.map(blog => {
        return {
            _id: blog._id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes,
            user: blog.user,
            comments: comments.filter(c => c.blog.toString() === blog._id.toString()) 
        }
    })
    response.json(blogsWithComments)
})

blogsRouter.post('/', async (request, response) => {

    const body = request.body

    try {
        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if (body.title === '' || body.url === '') {
            return response.status(400).json('Bad request')
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: decodedToken.id
        })

        const savedBlog = await blog.save()

        response.status(201).json(savedBlog)
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong with creating blog' })
        }
    }

})

blogsRouter.post('/:id/comments', async (request, response) => {

    const body = request.body
    console.log(body)
    try {
        const comment = new Comment({
            content: body.content,
            blog: request.params.id
        })

        const savedComment = await comment.save()

        response.status(201).json(savedComment)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong with creating comment' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const toBeRemoved = await Blog.findById(id)

        const token = request.token
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        if (toBeRemoved.user && toBeRemoved.user.toString() !== decodedToken.id.toString()) {
            return response.status(401).json({ error: 'You do not have the right' })
        }

        await Blog.findByIdAndRemove(id)
        response.status(204).json('Removed from database')
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    const comments = await Comment.find({})
    const blogWithComments = {
        _id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user,
        comments: comments.filter(c => c.blog.toString() === blog._id.toString()) 
    }
    response.status(200).json(blogWithComments)
})

module.exports = blogsRouter