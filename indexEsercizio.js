const express = require("express")
const bodyParser  = require("body-parser");

const app = express();

app.use(bodyParser.json());

require("./routes/userRoutesEsercizio")(app);

const PORT = 2200;

app.listen(PORT, () => {
    console.log("My exercise server working");
})