const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./Routes/userRoutes.js');
const playlistsRouter = require('./Routes/playlistRoutes.js');
const userInfoRouter = require('./Routes/userInfoRoutes.js');
const searchRouter = require('./Routes/searchRoutes.js');
const app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/altiusHub", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});



app.use('/api/user', userRouter );

app.use('/api/userInfo', userInfoRouter);

app.use('api/playlists', playlistsRouter);

app.use('api/search', searchRouter);

app.get('/', (req, res) => {
  res.send('AltiusHub API');
});

app.listen(8000, () => {console.log('Server listening on port 8000')})