const jsonfile = require("jsonfile");
const file_path = "./DB/users.json";

module.exports = app => {

  app.get("/users", (req, res) => {

    console.log("fetching all users");
    // jsonfile reading
    jsonfile.readFile(file_path, function (err, content) {
      // send file contents back to sender
      res.send(content);
    });

  });


  app.post("/users/new", (req, res) => {

    let email = req.body.email
    let username = req.body.username
    jsonfile.readFile(file_path, function (err, content) {

      content.push({
        email: email,
        username: username
      });

      console.log("added " + email + "to DB");
      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err);
      });

      res.sendStatus(200);
    });
  });


  app.delete("/users", (req, res) => {
    let email = req.body.email;
    console.log(email);
    jsonfile.readFile(file_path, function(err, content) {

      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log("removing " + content[i].email + "from DB");
          content.splice(i, 1);
        }
      }

      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });
      res.sendStatus(200);
    });
  });


  app.put("/user", (req, res) => {
    let user;
    let username = req.body.username;
    let email = req.query.email;
    console.log(email)
    jsonfile.readFile(file_path, function(err, content) {
      for (var i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {  
          console.log("updated user " + email + " has now username : " + username);  
          user = content[i];
          user.username = username;  
          
        }
      }
  
      jsonfile.writeFile(file_path, content, function(err) {
        console.log(err);
      });  
    });
    res.send(200);
  });
};