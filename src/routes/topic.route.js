const express = require('express')
const router = express.Router()
const models = require("../db.js");
const controllers = require("../controllers/topic.controller.js");
const auth = require("../middlewares/auth.js");
const ErrorHandling = require("../middlewares/errorHandling.js")

router.post("/CreateTopic", auth.ensureLoggedIn,controllers.createTopic);

router.get("/GetTopic/:id", controllers.getTopic);

router.delete("/RemoveTopic/:id", auth.ensureLoggedIn, controllers.removeTopic);

router.put("/UpdateTopic/:id", auth.ensureLoggedIn, controllers.updateTopic);

router.get("/GetTopic/Posts/:id", controllers.getTopicPosts);

router.get("/AllTopics", controllers.getAllTopics)

module.exports = router;