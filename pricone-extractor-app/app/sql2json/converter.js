const db = require("../models");
const equipment_data = require("../controllers/equipment_data.controller.js");
const Equipment_Data = db.equipment_data;
//"item_id","name","promotion_level","description","0","equipment_enhance_point","sell","craft_flg","{dataint:[hp,phyatk, magic_str,def,magic_def,physical_critical,magic_critical,wave_hp_recovery,wave_energy_recovery,dodge,physical_penetrate,magic_penetrate,life_steal,hp_recovery_rate,energy_recovery_rate,energy_reduce_rate,enable_donation,accuracy",
//wave_hp_recovery,wave_energy_recovery,dodge,physical_penetrate,magic_penetrate,life_steal,hp_recovery_rate,energy_recovery_rate,energy_reduce_rate,enable_donation,accuracy",

"105191|Reaper Axe|5|A.|1|400|24000|1|{\"dataint\":[0,12000,0,0,0,0,0,0,0,0,0,0,200,0,0,0,100]}|{\"dataint\":[0,2400,0,0,0,0,0,0,0,0,0,0,40,0,0,0,20]}"
exports.convert = async (req, res) =>{
    let dataReceived = "";
    const equipments = await Equipment_Data.findAll();
    equipments.forEach(element => {
        dataReceived+= "\""+element.id + "|"
        +element.equipment_name+"|"
        +element.promotion_level+"|"
        +element.description+"|0|"
        +element.equipment_enhance_point + "|"
        +element.sale_price + "|"
        +element.craft_flg + "|"
        +"{\\\"dataint\\\":["
        +element.hp*100 +","
        +element.atk*100+","
        +element.magic_str*100+","
        +element.def*100+","
        +element.magic_def*100+","
        +element.physical_critical*100+","
        +element.magic_critical*100+","
        +element.wave_hp_recovery*100+","
        +element.wave_energy_recovery*100+","
        +element.dodge*100+","
        +element.physical_penetrate*100+","
        +element.magic_penetrate*100+","
        +element.life_steal*100+","
        +element.hp_recovery_rate*100+","
        +element.energy_recovery_rate*100+","
        +element.energy_reduce_rate*100+","
        +element.enable_donation+","
        +element.accuracy*100+"]}|{\\\"dataint\\\":[]}\""
        +"<br>";
    });
    res.send(dataReceived);
}