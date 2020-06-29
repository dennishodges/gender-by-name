const fs = require("fs");
const jsonByYear = {};

const getGender = (req, res, next) => {
  const name = req.query.name.trim().toLowerCase();
  const year = req.query.year.trim();
  let namesJson;
  if (! jsonByYear.hasOwnProperty(year)){
    const namesCsv = fs.readFileSync(`./names/yob${year}.txt`, {encoding: "utf8"});
    namesJson = csvToJson(namesCsv);
    jsonByYear[year] = namesJson; // cache json
  } else {
    namesJson = jsonByYear[year]; // use cached json
  }
  if (namesJson.hasOwnProperty(name)){
    return res.json({
      name: name, 
      year: year, 
      prediction: namesJson[name].prediction, 
      probability: namesJson[name].probability,
      sample_size: namesJson[name].total
    });
  } else { // name not found
    return res.json({
      name: name,
      year: year,
      prediction: "name not found",
      probability: "NA",
      sample_size: 0
    });
  }
}

const csvToJson = csv => {
  const json = {};
  const csvArray = csv.split("\n").map(row => row.replace(/\r/g, "")); // split into array of csv rows
  csvArray.forEach(row => {
    const [capitalizedName, gender, number] = row.split(",");
    const name = capitalizedName.trim().toLowerCase();
    if (name.length < 1){
      return;
    }
    if (! json.hasOwnProperty(name)){
      json[name] = {
        M: 0,
        F: 0,
        [gender]: parseInt(number)
      }
    } else {
      json[name][gender] = parseInt(number);
    }
  });
  for (let name in json) {
    json[name].total = json[name].M + json[name].F;
    json[name].prediction = json[name].M > json[name].F ? "M" : "F";
    json[name].probability = json[name][json[name].prediction] / json[name].total;
  }
  return json;
}

module.exports = getGender;