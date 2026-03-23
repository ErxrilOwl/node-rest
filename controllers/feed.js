exports.getPosts = (req, res, next) => {
    res.status(200).json({ posts: [
        { title: 'First post', content: 'This is a content' }
    ] });
}