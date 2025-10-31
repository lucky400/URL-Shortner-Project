import express from 'express';
import mongoose from 'mongoose';
import {shortUrl,getOriginalUrl} from './Controllers/url.js';

const app = express();
const port = 1000;

app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://vermaprabhkar_db_user:1gCHrfX1FPmErsGj@cluster0.68emvpx.mongodb.net/",{
    dbName:"NodeJs_Mastery_course"
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

app.get('/', (req, res) => {
  res.render('index.ejs',{shortUrl :null});
})

app.post('/shorten', shortUrl);

//redirect to original URL using shorCode
app.get('/:shortCode', getOriginalUrl);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});