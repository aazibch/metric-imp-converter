const utils = require('../utils/convert');

exports.getConversionResult = (req, res) => {
    const reqVal = utils.extractUnitAndNum(req.query.input);

    if (reqVal.unit === null) return res.status(400).json({ error: "no unit" });
    if (reqVal.num.includes('/')) reqVal.num = utils.calculateFractions(reqVal.num);

    const unitValid = utils.isUnitValid(reqVal.unit);

    if (reqVal.num <= 0 && !unitValid) return res.status(400).json({ error: "invalid number and unit" });
    if (reqVal.num <= 0) return res.status(400).json({ error: "invalid number" });
    if (!unitValid) return res.status(400).json({ error: "invalid unit" });

    const convertTo = utils.getConversionProps(reqVal.unit);
    const convertedVal = utils.convertValue(reqVal.num, convertTo.converted);
    const string = utils.generateString(reqVal.num, reqVal.unit, convertedVal, convertTo.unit);

    res.status(200).json({
        initNum: +reqVal.num,
        initUnit: reqVal.unit,
        returnNum: convertedVal,
        returnUnit: convertTo.unit,
        string: string
    });
};