const Sequelize = require('sequelize');

var db = new Sequelize('teddy_database', 'maxroach', '', {
    dialect: 'postgres',
    port: 26257,
    logging: false
  });

const UserModel = db.define('usertable', {
  userid: { type: Sequelize.STRING, primaryKey:true },
  firstname: { type: Sequelize.STRING },
  lastname: { type: Sequelize.STRING },
  listids: {type: Sequelize.ARRAY(Sequelize.STRING)}
},{timestamps: false,freezeTableName:true});
  

const ListModel = db.define('listtable', {
  id: { type: Sequelize.STRING, primaryKey:true },
  name: { type: Sequelize.STRING },
  userid:{ type: Sequelize.STRING },
  titlepicture: { type: Sequelize.STRING },
  tags: {type: Sequelize.ARRAY(Sequelize.STRING)},
  listpartids: {type: Sequelize.ARRAY(Sequelize.STRING)}
},{timestamps: false,freezeTableName:true});

const ListPartModel = db.define('listparttable', {
    id: { type: Sequelize.STRING, primaryKey:true },
    part_name: { type: Sequelize.STRING },
    content_url: {type: Sequelize.STRING},
    content_text: {type: Sequelize.TEXT},
    parentlistids: {type: Sequelize.ARRAY(Sequelize.STRING)},
    listid:{type: Sequelize.STRING},
    type:{type: Sequelize.STRING},
  },{timestamps: false,freezeTableName:true});


module.exports = { UserModel,ListModel, ListPartModel,Sequelize} ;