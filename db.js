const Sequelize = require('sequelize');

var db = new Sequelize(process.env.DATABASE_URL || 'postgres://wnvjzneauorqmv:be6d7880ee29ef0a74db17101df14d3e1fe76689386489e410ede7cad9dd5907@ec2-54-217-235-137.eu-west-1.compute.amazonaws.com:5432/dd3k5bll64oi8q',{
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false
  });
  
 

const UserModel = db.define('usertable', {
  userid: { type: Sequelize.STRING, primaryKey:true },
  firstname: { type: Sequelize.STRING },
  lastname: { type: Sequelize.STRING },
  listids: {type: Sequelize.ARRAY(Sequelize.STRING)}
},{timestamps: false,freezeTableName:true});
  

const ListModel = db.define('listtable', {
  listid: { type: Sequelize.STRING, primaryKey:true },
  name: { type: Sequelize.STRING },
  userid:{ type: Sequelize.STRING },
  titlepicture: { type: Sequelize.STRING },
  tags: {type: Sequelize.ARRAY(Sequelize.STRING)},
  listpartids: {type: Sequelize.ARRAY(Sequelize.STRING)}
},{timestamps: false,freezeTableName:true});

const ListPartModel = db.define('listparttable', {
    listpartid: { type: Sequelize.STRING, primaryKey:true },
    part_name: { type: Sequelize.STRING },
    content_url: {type: Sequelize.STRING},
    content_text: {type: Sequelize.TEXT},
    parentlistids: {type: Sequelize.ARRAY(Sequelize.STRING)},
    listid:{type: Sequelize.STRING},
    type:{type: Sequelize.STRING},
  },{timestamps: false,freezeTableName:true});


module.exports = { UserModel,ListModel, ListPartModel,Sequelize} ;