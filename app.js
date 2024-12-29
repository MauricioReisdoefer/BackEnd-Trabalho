const express = require('express');
const app = express();
const PORT = 8080;
const models = require("./src/db.js");

const PostRoutes = require("./src/routes/post.route.js");
const UserRoutes = require("./src/routes/user.route.js");
const TopicRoutes = require("./src/routes/topic.route.js");

app.use(express.json());

app.use('/Posts', PostRoutes)
app.use('/User', UserRoutes)
app.use('/Topic', TopicRoutes)

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
});