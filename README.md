## gender-by-name

This simple API predicts gender, given a first name and a year-of-birth, using US Social Security Administration data. The data can be found at https://www.ssa.gov/oact/babynames/limits.html.

### installation

1. `npm install`
2. `npm start`
3. Go to http://localhost:5555/ 

### use
```
GET /query?name=<first name>&year=<year of birth>
reponse: 
{
  name: String <first name>,
  year: String <year of birth>,
  prediction: String <one of "F" or "M">,
  probability: Number <decimal between 1 and 0>,
  sample_size: Number <total number of results for name and year>
}
```