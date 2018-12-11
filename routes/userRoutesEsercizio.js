const jsonfile = require("jsonfile");
const file_path = "./DB/usersEsercizio.json";

module.exports = app => {

    app.get("/users", (req, res) => {
        console.log("getting all exercise elements");
        jsonfile.readFile(file_path, function(err, content) {
            res.send(content)
        })
    });

    app.post("/users", (req, res) => {

        let pantheon = req.body.pantheon;
        let dei = req.body.dei;
        jsonfile.readFile(file_path, function (err, content) {
            content.push({
                pantheon: pantheon,
                dei: dei
            });

            console.log("Aggiunti i " + pantheon + " ai pantheon.")
            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err)
            });

            res.sendStatus(200)
        });
    })
}