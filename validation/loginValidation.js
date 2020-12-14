const Validator = require('validatorjs')

const validateUserLogin = (data) => {
    let rules = {
        'email': 'required|email',
        'password': 'required|min:6, regex:/([A-Z]+)(\d+)/'
    }
    let validation = new Validator(data, rules)
    return validation.passes()

}

module.exports = validateUserLogin;