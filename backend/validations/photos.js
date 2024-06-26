const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bodyData = {

    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Il Titolo è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Il Titolo deve essere una stringa',
            bail: true
        },
        trim: true,
    },

    visible: {
        in: ["body"],
        toBoolean: true,
        isBoolean: {
            errorMessage: 'Visible deve essere un booleano.'
        },
    },

    categories: {
        in: ["body"],
        isInt: {
            errorMessage: "Categories deve essere numero intero",
            bail: true
        },
        isArray: {
            errorMessage: "Categories deve essere un array",
            bail: true
        },

        customSanitizer: { options: value => value.map(category => parseInt(category)) },

        custom: {
            options: async (ids) => {
                const categories = await prisma.category.findMany({
                    where: { id: { in: ids } }
                });
                if (categories.length !== ids.length) {
                    throw new Error(`Una o più Categorie non esistono.`);
                }
                return true;
            }
        }
    }
}


module.exports = {
    bodyData,
}