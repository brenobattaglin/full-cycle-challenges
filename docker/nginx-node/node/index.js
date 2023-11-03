const express = require("express");
const mysql = require("mysql");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "node_challenge_db",
};

app.get("/", (req, res) => {
  const person = "Breno";
  try {
    const connection = mysql.createConnection(config);

    connection.query(`INSERT INTO people(name) values('${person}')`);
    const result = connection.query(
      `SELECT * FROM people ORDER BY id DESC LIMIT 1;`
    );

    connection.query(
      `SELECT * FROM people ORDER BY id DESC LIMIT 1;`,
      (error, response) => {
        if (error) {
          throw error;
        }
        res.send(`<h1>Full Cycle Rocks!</h1> <br>
        <p>Person: <em>${response[0].name} </p>`);
      }
    );
    connection.end();
  } catch (error) {
    res.send(`<p>An error has ocurred.</p>: ${error}`);
  }
});

app.listen(port, () => {
  console.log("Running at port " + port);
});
