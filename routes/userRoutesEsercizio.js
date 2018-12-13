const jsonfile = require("jsonfile");
const file_path = "./DB/usersEsercizio.json";

module.exports = app => {

    app.get("/users", (req, res) => {
        console.log("getting all exercise elements");
        jsonfile.readFile(file_path, function (err, content) {
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
    });

    app.delete("/users", (req, res) => {
        let pantheon = req.body.pantheon;
        console.log(pantheon);
        jsonfile.readFile(file_path, function (err, content) {

            for (var i = content.length - 1; i >= 0; i--) {
                if (content[i].pantheon === pantheon) {
                    console.log("removing " + content[i].pantheon + "from DB");
                    content.splice(i, 1);
                }
            }

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });
            res.sendStatus(200);
        });
    });

    app.put("/users", (req, res) => {
        let user;
        let pantheon = req.query.pantheon;
        let pantheonMod = req.body.pantheon;
        let dei = req.body.dei;
        let note = req.body.note;
        console.log(pantheon);
        jsonfile.readFile(file_path, function (err, content) {
            for (i = content.length - 1; i >= 0; i--) {
                if (content[i].pantheon === pantheon) {
                    console.log("updated user " + pantheon + " has now gods : " + dei);
                    user = content[i];
                    user.pantheon = pantheonMod;
                    user.dei = dei;
                    user.note = note;
                }
            }

            jsonfile.writeFile(file_path, content, function (err) {
                console.log(err);
            });
        })
        res.send(200);
    })
}