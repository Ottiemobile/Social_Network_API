const exprtess = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

mongoose.connect(process.envmMONGODB_URI || 'mongodb://localhost/socialmedia', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`api servers are now running on port ${PORT}`);
    })
})