const { validationResult } = require('express-validator');

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
    return res.status(422)
      .json({
        message: 'Validator failed, entered data is incorrect',
        errors: errors.array()
      })
  }

  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    message: 'Post created successfully!',
    post: { 
      id: new Date().toISOString(), 
      title: title, 
      content: content,
      creator: {
        name: 'Test'
      },
      createdAt: new Date()
    }
  });
};
