let express = require("express");
let app = express();

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/scss", express.static(__dirname + "/scss"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/icons", express.static(__dirname + "/icons"));
app.use("/vendor", express.static(__dirname + "/vendor"));
app.use("/vexflow.js", express.static(__dirname + "/vexflow.js"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/menu.html", (req, res) => {
    res.sendFile(__dirname + "/menu.html");
});

app.get("/trebleGame.html", (req, res) => {
    res.sendFile(__dirname + "/trebleGame.html");
});

app.get("/bass.html", (req, res) => {
    res.sendFile(__dirname + "/bass.html");
});

app.listen(5555);
