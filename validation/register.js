const Validator = require('validatorjs')

const validateUserRegister = (data) => {
    let rules = {
        'name': 'required',
        'email': 'required|email',
        'password': ['required', 'regex:/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/g']
    }
    let validation = new Validator(data, rules)
    return validation.passes()
}

module.exports = validateUserRegister;