# API Project: Metric-Imperial Converter

### User Stories
1. I can GET /api/convert with a single parameter containing an accepted number and unit and have it converted.
2. I can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)
3. I can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)
4. I can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)
5. If my unit of measurement is invalid, returned will be 'invalid unit'.
6. If my number is invalid, returned with will 'invalid number'.
7. If both are invalid, return will be 'invalid number and unit'.
8. I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.
9. My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format {initNum} {initial_Units} converts to {returnNum} {return_Units} with the result rounded to 5 decimals.

### Example usage :
* /api/convert?input=4gal
* /api/convert?input=1/2km
* /api/convert?input=5.4/3lbs
* /api/convert?input=kg

### Example return :
`{initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', string: '3.1 miles converts to 5.00002 kilometers'}`