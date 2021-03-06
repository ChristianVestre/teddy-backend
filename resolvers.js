//const imports = require('./db.js');
var uniqid = require('uniqid');

//console.log(imports)
const resolvers = {
    Query: {
 //       getList(_,args) {return imports.ListModel.findAll({ where:{id:args.id}})}
        getList(_,args,context) {return context.db.ListModel.findAll({where:{listid:args.listid}})},
        getUser(_,args,context) {return context.db.UserModel.findAll({where:{userid:args.userid}})},
    },
    List: {
        getListParts(parent,_,context) {return context.db.ListPartModel.findAll({ where:{listpartid:parent.dataValues.listpartids}})},
        addListPart(parent,args,context) {
            return context.db.ListPartModel.sync().then(function () {
                return context.db.ListPartModel.create({
                  listpartid: uniqid(),
                  partname: args.partname,
                  contenturl: args.contenturl,
                  contenttext: args.contenttext,
                  parentlistids: context.db.Sequelize.fn('array_append',  context.db.Sequelize.col('parentlistids'), parent.dataValues.listid),
                  type:args.type,
                  tags:context.db.Sequelize.fn('array_append',  context.db.Sequelize.col('tags'), args.tags),
                  listid:null//TODO
                }).then(function (data) {
                    context.db.ListModel.update({
                        listpartids: context.db.Sequelize.fn('array_append',  context.db.Sequelize.col('listpartids'), data.dataValues.listpartid)
                      }, {
                        where: {listid:parent.dataValues.listid }
                    });
                    //todo create user table and user model
                    context.db.UserModel.update({
                        listids: context.db.Sequelize.fn('array_append',  context.db.Sequelize.col('listids'), data.dataValues.listid)
                    }, {
                        where: {listid: parent.dataValues.userId }
                    });
                    return data
                });
            })
        },
    },
    User: {
        getLists(parent,_,context) {return context.db.ListModel.findAll({ where:{listid:parent.dataValues.listids}})},
    },
    Mutation: {
        addList(_,args,context) {
            return context.db.ListModel.sync().then(function () {
                return context.db.ListModel.create({
                  listid: uniqid(),
                  name: args.name,
                  userid: args.userid,
                  tags: args.tags
                });
            });
        },
        addUser(_,args,context) {
            return context.db.UserModel.sync().then(function () {
                return context.db.UserModel.create({
                  userid: uniqid(),
                  firstname: args.firstname,
                  lastname: args.lastname,
                  email: args.email,
                });
            });
        }
    }
};

module.exports = resolvers