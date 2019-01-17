const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Post model
const Post = require("../../models/Post");

//Validation
const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc Tests post route
// @access Public

router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

// @route GET api/posts
// @desc Get posts
// @access Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

// @route GET api/posts/user/:id
// @desc Get user's post by id
// @access Private

router.get(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.find({ user: req.params.id })
      .sort({ date: -1 })
      .then(posts => res.json(posts))
      .catch(err =>
        res.status(404).json({ nopostfound: "No posts made by this user" })
      );
  }
);

// @route GET api/posts/:id
// @desc Get post by id
// @access Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

// @route POST api/posts
// @desc Create post
// @access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.user.name,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route POST api/posts/location/:id
// @desc Edit post's
// @access Private
router.post(
  "/location/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findByIdAndUpdate(
      req.params.id,
      { $set: { x: req.body.x, y: req.body.y } },
      { new: true }
    )
      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({ nopostfound: "No post found with that ID" })
      );
  }
);

// @route POST api/posts/:id
// @desc Edit post
// @access Private

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    User.findById(req.user.id).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          Post.findByIdAndUpdate(
            req.params.id,
            { $set: { text: req.body.text, deadline: req.body.deadline } },
            { new: true }
          ).then(post => res.json(post));
        })
        .catch(err =>
          res.status(404).json({ nopostfound: "No post found with that ID" })
        );
    });
  }
);

// @route DELETE api/posts/:id
// @desc Delete post
// @access Private

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then(user => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }
          //Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

module.exports = router;
