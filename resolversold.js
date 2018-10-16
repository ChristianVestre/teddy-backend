//const imports = require('./db.js');
var uniqid = require('uniqid');

//console.log(imports)
const resolvers = {
    Query: {
 //       getList(_,args) {return imports.ListModel.findAll({ where:{id:args.id}})}
        getList(_,args,context) {return context.db.ListModel.findAll({where:{id:args.id}})},
    },
    List: {
        getListParts(parent,_,context) {return context.db.ListPartModel.findAll({ where:{id:parent.dataValues.listpartids}})},
        addListPart(parent,args,context) {
            return context.db.ListPartModel.sync().then(function () {
                return context.db.ListPartModel.create({
                  id: uniqid(),
                  part_name: args.part_name,
                  content_url: args.content_url,
                  content_text: args.content_text
                }).then(function (data) {
                    context.db.ListModel.update({
                        listpartids: context.db.Sequelize.fn('array_append',  context.db.Sequelize.col('listpartids'), data.dataValues.id)
                      }, {
                        where: {id:parent.dataValues.id }
                    });
                    return data
                });
            })
        }
    },
    Mutation: {
        addList(_,args,context) {
            return context.db.ListModel.sync().then(function () {
                return context.db.ListModel.create({
                  id: uniqid(),
                  name: args.name
                });
            });
        },
    }
};

module.exports = resolvers