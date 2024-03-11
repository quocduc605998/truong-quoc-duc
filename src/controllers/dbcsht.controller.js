
const db = require("../models");
const Lastvals = db.lastvals;
const tele2 = db.tele2;

async function insertDBCSHTUpdate(val, obj) {
    // Create filter objects
    const newDoc = new tele2({ name: obj.name,sysname:obj.sysname, CSHT: obj.CSHT, Sensors: obj.Sensors, time: obj.time });
    const filter = { CSHT: val, name: obj.name,sysname:obj.sysname };
  
    // Update documents in dcvals and Lastvals collections concurrently
    await Promise.all([
      newDoc.save(),    
      Lastvals.findOneAndUpdate(filter, { Sensors: obj.Sensors, time: obj.time }, { new: true, upsert: true })
    ]);
  }
module.exports = {
  insertDBCSHTUpdate
};