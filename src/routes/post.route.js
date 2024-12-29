const express = require('express')
const router = express.Router()
const models = require("../db.js");
const controllers = require("../controllers/post.controller.js");

router.post("/CreatePost", controllers.createPost)

router.get("/GetPost/:id", controllers.getPost)

router.get("/RemovePost/:id", controllers.deletePost)

router.put("/UpdatePost/:id", controllers.updatePost)

module.exports = router;