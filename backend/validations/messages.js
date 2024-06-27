const bodyData = {
    email: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Email è obbligatoria.',
            bail: true
        },
        isEmail: {
            errorMessage: 'Email deve essere in un formato valido',
            bail: true
        },
    }
}

module.exports = {
    bodyData,
}