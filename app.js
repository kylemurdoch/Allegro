let express = require("express");
let app = express();

app.use("/css", express.static(__dirname + "/css"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/scss", express.static(__dirname + "/scss"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/icons", express.static(__dirname + "/icons"));
app.use("/icons", express.static(__dirname + "/icons"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/home.html", (req, res) => {
    res.sendFile(__dirname + "/home.html");
});

app.listen(5555);
