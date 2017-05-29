var express = require("express")
var app = express();
var router = express.Router();

app.use(express.static(__dirname + "/public"));

router.get("/", function(req, res) {
   res.render("index");
});

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("The Server Has Started");
});