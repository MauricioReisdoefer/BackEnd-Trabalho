const express = require('express');
const app = express();
const PORT = 3000;
const { sincronizaBanco, models } = require("./src/db.js");

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

app.delete('/resetdb', async (req, res, next) => {
    try {
        await sincronizaBanco();
    } catch (err) {
        return next(err);
    }
    return res.status(200).json({ msg: 'banco resetado!' });
});

// .env NODE_ENV, PORT, SENHA_JWT, etc.
app.use((err, req, res, next) => {
    // if (process.env.NODE_ENV === 'development')  
    console.error(err);
    console.log('===============')
    console.log('===============')
    console.log('===============')
    return res.status(err.status || 500).json(err.message);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));