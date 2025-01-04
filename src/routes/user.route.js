const express = require('express')
const router = express.Router()
const models = require("../db.js");
const controllers = require("../controllers/user.controller.js");


router.post("/CreateUser", controllers.createUser);

router.get("/GetUser/:id", controllers.getUser);

router.put("/UpdateUser/:id", controllers.updateUser);

router.delete("/RemoveUser/:id", controllers.removeUser);

router.get("/AllUsers", controllers.allUsers);

router.get("/GetUser/Topics/:id", controllers.userTopics);

router.get("/GetUser/Posts/:id", controllers.userPosts);

router.post("/UserLogin", controllers.userLogin);

module.exports = router;