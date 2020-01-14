const extractUnitAndNum = (input) => {
    const unitIndex = input.match(/[a-zA-Z]/).index;

    const result = {
        num: input.slice(0, unitIndex),
        unit: input.slice(unitIndex)
    }

    if (result.num === '') result.num = '1';
    return result;
}

const calculateFractions = (exp) => {
    const inputValues = exp.split('/');
    exp = inputValues.shift();

    for (let x of inputValues) {
        exp /= x;
    }

    return exp;
}

const generateString = (initNum, initUnit, returnNum, returnUnit) => {
    // If numbers, convert to strings.
    initNum += '';
    returnNum += '';

    const unitWords = [
        { unit: 'gal', word: 'gallon' },
        { unit: 'lbs', word: 'pound' },
        { unit: 'mi', word: 'mile' },
        { unit: 'L', word: 'litre' },
        { unit: 'kg', word: 'kilogram' },
        { unit: 'km', word: 'kilometer' },
    ];

    let initUnitWord = unitWords.find(elem => elem.unit === initUnit).word;
    let returnUnitWord = unitWords.find(elem => elem.unit === returnUnit).word;

    if (initNum[initNum.length - 1] !== '0' && initNum[initNum.length - 1] !== '1') {
        initUnitWord += 's';
    }

    if (returnNum[returnNum.length - 1] !== '0' && returnNum[returnNum.length - 1] !== '1') {
        returnUnitWord += 's';
    }

    return `${initNum} ${initUnitWord} converts to ${returnNum} ${returnUnitWord}`;
}

const convertValue = (toConvert, toCalculateWith) => {
    const result = toConvert * toCalculateWith;
    return +result.toFixed(5);
}

const isUnitValid = (reqUnit) => {
    const validUnits = ['gal', 'lbs', 'mi', 'L', 'kg', 'km'];

    return validUnits.includes(reqUnit);
}

const getConversionProps = (reqUnit) => {
    // The "converted" property represents the result of converting one paired unit to the other.
    // For example 1L would convert to 0.264172gal.
    const unitPairs = [
        [{ converted: 0.264172, unit: 'gal' }, { converted: 3.78541, unit: 'L' }],
        [{ converted: 2.20462, unit: 'lbs' }, { converted: 0.453592, unit: 'kg' }],
        [{ converted: 0.621371, unit: 'mi' }, { converted: 1.60934, unit: 'km' }]
    ];

    const relevantElem = unitPairs.find(elem => elem[0].unit === reqUnit || elem[1].unit === reqUnit);
    return relevantElem.find(elem => elem.unit !== reqUnit)
}

exports.convert_get = (req, res) => {
    const reqVal = extractUnitAndNum(req.query.input);

    if (reqVal.num.includes('/')) reqVal.num = calculateFractions(reqVal.num);

    const unitValid = isUnitValid(reqVal.unit);

    if (reqVal.num < 1 && !unitValid) return res.status(400).send({ error: "invalid number and unit" });
    if (reqVal.num < 1) return res.status(400).send({ error: "invalid number" });
    if (!unitValid) return res.status(400).send({ error: "invalid unit" });

    const convertTo = getConversionProps(reqVal.unit);
    const convertedVal = convertValue(reqVal.num, convertTo.converted);
    const string = generateString(reqVal.num, reqVal.unit, convertedVal, convertTo.unit);

    res.send({
        initNum: +reqVal.num,
        initUnit: reqVal.unit,
        returnNum: convertedVal,
        returnUnit: convertTo.unit,
        string: string
    });
};