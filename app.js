const express = require('express');
const app = express();
const mongoose= require('mongoose');
const bodyParser = require('body-parser');

const url ='mongodb://localhost:27017/digitalRow';

app.use(bodyParser.json());
const postsRoute = require('./routes/posts');

//midlewares need to be protected
app.use('/posts',postsRoute);

mongoose.connect(url).
  catch(error => handleError(error));
try {
   mongoose.connect(url);
} catch (error) {
  handleError(error);
}
//listening to port 8000
app.listen(process.env.port || 4000, function(){
    console.log('Running on 4000');
});