const express = require("express");
const router = express.Router();
const Post = require("../models/post");

//Fetch all posts
router.get("/", (req, res) => {
  // res.send("we are on posts");
  try {
    Post.find().then((data) => {
      res.json(data);
    });
  } catch (err) {
    res.json({ message: err });
  }
});

//Fetch a specific post
//Example using async and await
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Testing
// router.get("/specific", (req, res) => {
//   console.log("On Specific Post");
//   res.send("specific post");
// });

//Post - use mongoose schema

//Submit a post
router.post("/", (req, res) => {
  // console.log(req.body);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    date: new Date(req.body.date),
  });
  
  try {
    post.save().then((data) => {
      res.status(200).json(data);
    });
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete a specific post
router.delete("/:postId", (req, res) => {
  try {
    Post.deleteOne({ _id: req.params.postId }).then((data) => {
      res.json({
        message: "Deleted Sucessfully",
        deletedPost: data,
      });
    });
  } catch (err) {
    res.json({ message: err });
  }
});

router.put("/", (req, res) => {
  console.log(req.body);
  const post = new Post({
    _id: req.body._id,
    title: req.body.title,
    description: req.body.description,
    date: new Date(req.body.date),
  });

  try {
    Post.updateOne({_id: req.body._id}, post).then((data) => {
      res.json({
        message: "updated successfully",
        updatedPost: data,
      });
    });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
