const express = require('express')
const router = express.Router()
const models = require("../db.js");
const controllers = require("../controllers/post.controller.js");
const auth = require("../middlewares/auth.js");
const ErrorHandling = require("../middlewares/errorHandling.js")

router.post("/CreatePost", auth.ensureLoggedIn, controllers.createPost)

router.get("/GetPost/:id", controllers.getPost);

router.get("/RemovePost/:id", auth.ensureLoggedIn, controllers.deletePost)

router.put("/UpdatePost/:id", auth.ensureLoggedIn, controllers.updatePost)

module.exports = router;