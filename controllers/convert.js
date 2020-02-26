const utils = require('../utils/convert');

exports.getConversionResult = (req, res) => {
    const reqVal = utils.extractUnitAndNum(req.query.input);

    if (reqVal.num.includes('/')) reqVal.num = utils.calculateFractions(reqVal.num);

    const unitValid = utils.isUnitValid(reqVal.unit);

    if (reqVal.num <= 0 && !unitValid) return res.status(400).send({ error: "invalid number and unit" });
    if (reqVal.num <= 0) return res.status(400).send({ error: "invalid number" });
    if (!unitValid) return res.status(400).send({ error: "invalid unit" });

    const convertTo = utils.getConversionProps(reqVal.unit);
    const convertedVal = utils.convertValue(reqVal.num, convertTo.converted);
    const string = utils.generateString(reqVal.num, reqVal.unit, convertedVal, convertTo.unit);

    res.status(200).send({
        initNum: +reqVal.num,
        initUnit: reqVal.unit,
        returnNum: convertedVal,
        returnUnit: convertTo.unit,
        string: string
    });
};