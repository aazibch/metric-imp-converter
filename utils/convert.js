module.exports = {
    extractUnitAndNum: (input) => {
        const matchResult = input.match(/[a-zA-Z]/);
        const result = {};

        if (matchResult) {
            const unitIndex = matchResult.index;

            result.num = input.slice(0, unitIndex); 
            result.unit = input.slice(unitIndex);
        } else {
            result.num = input;
            result.unit = null;
        }

        if (result.num === '') result.num = '1';
        return result;
    },
    calculateFractions: exp => exp.split('/').reduce((a, b) => a / b),
    generateString: (initNum, initUnit, returnNum, returnUnit) => {
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
    },
    convertValue: (toConvert, toCalculateWith) => {
        const result = toConvert * toCalculateWith;
        return +result.toFixed(5);
    },
    isUnitValid: (reqUnit) => {
        const validUnits = ['gal', 'lbs', 'mi', 'L', 'kg', 'km'];
    
        return validUnits.includes(reqUnit);
    },
    getConversionProps: (reqUnit) => {
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
};