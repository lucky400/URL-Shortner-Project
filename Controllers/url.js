import { Url } from "../Models/Url.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();


const shortUrl = `http://localhost:1000/${shortCode}`;


//save to database
const newUrl = new Url({
    shortCode: shortCode,
    longUrl: longUrl
});
await newUrl.save();

res.render('index.ejs', { shortUrl: shortUrl });
}


export const getOriginalUrl = async (req, res) => {
    const shortCode = req.params.shortCode;
    
    //find on database
    const orginalUrl = await Url.findOne({ shortCode});

    if(orginalUrl){
        return res.redirect(orginalUrl.longUrl);
    } else {
        return res.status(404).send("URL not found");
    }   }