const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      { 
        _id: 'test',
        title: 'First Post', 
        content: 'This is the first post!', 
        imageUrl: '',
        creator: {
          name: 'Test'
        },
        date: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validator failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title,
    content: content,
    imageUrl: 'test',
    creator: {
      name: 'Test'
    }
  });
  post.save()
    .then(result=> {
      console.log(result);
      res.status(201).json({
        message: 'Post created successfully!',
        post: result
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next();
    });  
};
