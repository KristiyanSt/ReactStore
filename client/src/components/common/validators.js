const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const registerValidator = {
    //must be correct to pass validation

    email: (value) => EMAIL_REGEX.test(value),
    username: (value) => value.trim() != "" && value.length >= 2,
    city: (value) => value.trim() != "",
    password: (value) => value.trim() != "" && value.length > 5,
    confirmPassword: (value, currentValues) => value.trim() != "" &&
                            value === currentValues.password &&
                            registerValidator.password(currentValues.password)
    
}
const loginValidator = {
    //must be correct to pass validation

    email: (value) => EMAIL_REGEX.test(value),
    password: (value) => value.trim() != ""
}
const productValidator = {
    //must be correct to pass validation
    name: (value) => value.trim() != "",
    price: (value) => value.trim() != "",
    quantity: (value) => value.trim() != "",
    imageUrl: (value) => value.trim() != "",
}

export {
    registerValidator,
    loginValidator,
    productValidator
}

