const express = require('express');
const app = express();
const PORT = 8080;
const models = require("./src/db.js");

const PostRoutes = require("./src/routes/post.route.js");
const UserRoutes = require("./src/routes/user.route.js");
const TopicRoutes = require("./src/routes/topic.route.js");
const { errorHandler } = require('./src/middlewares/errorHandling.js');
const CORS = require('cors')

app.use(express.json());

app.use(CORS())
app.use('/Posts', PostRoutes)
app.use('/User', UserRoutes)
app.use('/Topic', TopicRoutes)


app.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message);
});

app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`);
});