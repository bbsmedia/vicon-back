const {nanoid} = require("nanoid")
module.exports = {
    beforeCreate: async ({params}) => {
        params.data.uid = nanoid()
    }
}