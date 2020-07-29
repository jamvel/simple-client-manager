/**
 * Verify and Validate body data middleware
 * 
 * @name validateData
 * @function
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next
 */
module.exports = (req, res, next) => {
    const [name, surname, address1, town, country, postCode, contact] = [
        req.body.name,
        req.body.surname,
        req.body.address1,
        req.body.town,
        req.body.country,
        req.body.postCode,
        req.body.contact
    ]

    // Verify and Validate data
    if(!name || !surname || !address1 || !town || !country || !postCode || !contact || isNaN(contact)){
        return res.status(400).send({
            'error': 'Invalid data supplied'
        });
    }

    next();
}