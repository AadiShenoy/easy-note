const express = require('express');
const logger = require('./config/logger.js');
const noteRouter = require('./app/routes/note.routes.js');
const userRouter = require('./app/routes/user.routes.js');
const db = require('./config/dbConnect')
const app = express();

app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())

app.use('/notes',noteRouter)
app.use('/user',userRouter)

//connecting to server
const server = app.listen(3000, () => {
   logger.info("Example app listening at port 3000");
   db.dbConnection();
})