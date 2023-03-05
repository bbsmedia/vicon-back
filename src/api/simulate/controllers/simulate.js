'use strict'

const resp = data => ({
    data: {
        id: data.id,
        attributes: data
    }
})

module.exports = {
    action: async (ctx) => {
        let tmp
        if (Object.keys(ctx.request.query).length) {
            tmp = await strapi.query('api::price-list.price-list').findOne({
                where: {
                    uid: ctx.request.query.uid
                }
            })
        } else {
            tmp = await strapi.query('api::price-list.price-list').findOne({
                where: {
                    public: true
                }
            })
        }
        ctx.body = resp(tmp)
    }
}
