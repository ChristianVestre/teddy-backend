const Sequelize = require('sequelize');

var db = new Sequelize('tedde_database', 'maxroach', '', {
    dialect: 'postgres',
    port: 26257,
    logging: false
  });
  

const ListModel = db.define('listtable', {
  id: { type: Sequelize.INTEGER, primaryKey:true },
  name: { type: Sequelize.STRING },
  listpartids: {type: Sequelize.ARRAY(Sequelize.INTEGER)}
},{timestamps: false,freezeTableName:true});

const ListPartModel = db.define('listparttable', {
    id: { type: Sequelize.INTEGER, primaryKey:true },
    part_name: { type: Sequelize.STRING },
    content_url: {type: Sequelize.STRING},
    content_text: {type: Sequelize.TEXT}
  },{timestamps: false,freezeTableName:true});

 function getListResolver (args) {
    return ListModel.findAll({where:{id:args.id}}).then((data) =>
    // data[0].dataValue
        { 
            let listPartIds = data[0].dataValues.listpartids
 //           let dataArray = []


 /*           for(var i = 0; i<listPartIds.length;i++) {
                dataArray.push(ListPartModel.findAll({where:{id:listPartIds[i]}}).then(
                    (partData) => { 
                        return partData
                }))
            } */
            const test = getListParts(listPartIds, data)
            console.log(test)
//            return getListParts(listPartIds)
            return data
        }
    )
}

async function getListParts(listpartids,metaList){
    const parts = await Promise.all(listpartids.map(async listpartid =>{
        const response = await ListPartModel.findAll({where:{id:listpartid}}).catch(err => {console.log(err)})
        const part = response[0]
        return part
    })).catch(err => {console.log(err)})
    let dataShaped = []
    dataShaped.push({
        id:metaList[0].dataValues.id,
        name:metaList[0].dataValues.name,
        listparts:[]
    })
    parts.forEach((part)=>{
        if (part != undefined) {
            dataShaped[0].listparts.push(part.dataValues)
        }
    })
    console.log(dataShaped)
    return dataShaped
}

module.exports = { ListModel, getListResolver,ListPartModel} ;