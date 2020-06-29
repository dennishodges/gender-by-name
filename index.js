const app = require("express")();
const ip = require("ip");
const bodyParser = require("body-parser");
const {getGender} = require("./gender.js");

const PORT = process.env.PORT || 5555;
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res, next) => {
  res.json("Gender prediction by first name and year of birth. To use, go to: /query?name=<first name>&year=<year>");
})
app.get("/query/", (req, res, next) => {
  return getGender(req, res, next);
});

app.listen(PORT, () => {
  console.log("Express app listening on Local: http://localhost:" + PORT);
  console.log("on Network: http://" + ip.address() + ":" + PORT);
})