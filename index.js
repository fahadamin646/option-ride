const express = require('express');
const multer = require('multer');
var cors = require('cors')

const app = express();


app.use(cors())
// Set up Multer to handle file uploads and save them to a designated folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// Set up the file upload route
app.post('/upload', upload.single('file'), (req, res) => {
    // Return a response with the link to the uploaded file
    res.send({ fileUrl: `/${req.file.originalname}` });
});

app.get('/getResponse', (req, res) => {
    res.send({ message: "/uploads/file_example_MP3_700KB.mp3" });
})
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
