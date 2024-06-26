const bodyData = {
    name: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Name è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Name deve essere una stringa.',
            bail: true
        }
    }
}

module.exports = {
    bodyData,
}