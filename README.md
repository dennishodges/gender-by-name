## gender-by-name

This simple API/ Node.js app predicts gender, given a first name and a year-of-birth, using US Social Security Administration data. The data can be found at https://www.ssa.gov/oact/babynames/limits.html.

### API installation and use

1. `npm install`
2. `npm start`
3. Go to http://localhost:5555/ 

```
GET /query?name=<first name>&year=<year of birth>
reponse: 
{
  name: String <first name>,
  year: String <year of birth>,
  prediction: String <one of "F" or "M">,
  total: Number <total number of results for name and year>,
  probability: Number <decimal between 1 and 0>
}
```

### Node.js (command-line) installation and use

1. `npm install`
2. `node gender.js <first name> <year of birth>`

