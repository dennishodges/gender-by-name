const fs = require("fs");
const jsonByYear = {};

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
    json[name].prediction = json[name].M > json[name].F ? "M" : "F";
    json[name].total = json[name].M + json[name].F;
    json[name].probability = json[name][json[name].prediction] / json[name].total;
    delete json[name].M;
    delete json[name].F;
  }
  return json;
}

const genderByName = (name, year) => {
  if (year < 1880 || year > 2018){
    return "Year must be in range: 1880 - 2018";
  }
  let namesJson;
  if (! jsonByYear.hasOwnProperty(year)){
    const namesCsv = fs.readFileSync(`./names/yob${year}.txt`, {encoding: "utf8"});
    namesJson = csvToJson(namesCsv);
    jsonByYear[year] = namesJson; // cache json
  } else {
    namesJson = jsonByYear[year]; // use cached json
  }
  if (namesJson.hasOwnProperty(name)){
    return {
      name,
      year,
      ...namesJson[name]
    }
  } else {
    return {
      name,
      year,
      prediction: "name not found",
      probability: "NA",
      total: 0
    }
  }
}

const getGender = (req, res, next) => {
  const name = req.query.name.trim().toLowerCase();
  const year = req.query.year.trim();
  const prediction = genderByName(name, year);
  return res.json(prediction)
}

if (require.main === module){
  const name = process.argv[2];
  const year = process.argv[3];
  const prediction = genderByName(name, year);
  console.log(prediction);
}

module.exports = {
  getGender,
  genderByName
};