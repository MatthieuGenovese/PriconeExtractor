const db = require("../models");
const Equipment_Data = db.equipment_data;
const Unit_Promotion = db.unit_promotion;
const Equipment_Enhance_Rate = db.equipment_enhance_rate;
//"item_id","name","promotion_level","description","0","equipment_enhance_point","sell","craft_flg","{dataint:[hp,phyatk, magic_str,def,magic_def,physical_critical,magic_critical,wave_hp_recovery,wave_energy_recovery,dodge,physical_penetrate,magic_penetrate,life_steal,hp_recovery_rate,energy_recovery_rate,energy_reduce_rate,enable_donation,accuracy",
//wave_hp_recovery,wave_energy_recovery,dodge,physical_penetrate,magic_penetrate,life_steal,hp_recovery_rate,energy_recovery_rate,energy_reduce_rate,enable_donation,accuracy",

"105191|Reaper Axe|5|A.|1|400|24000|1|{\"dataint\":[0,12000,0,0,0,0,0,0,0,0,0,0,200,0,0,0,100]}|{\"dataint\":[0,2400,0,0,0,0,0,0,0,0,0,0,40,0,0,0,20]}"
//[[101101,101101,101281,101431,101071,101581],
//[102101,102071,102341,102431,101101,101581],
//[103071,102101,102342,102432,102071,102581],
//[103101,103071,103341,103431,102101,102582],
//[103072,103101,103342,103432,103071,103581],
//[104101,103072,103343,103432,103552,103582],
/*[104102,104101,104341,103583,103072,103552],
[104103,104102,104342,104101,104551,103553],
[104104,104103,104343,104102,104552,104551],
[105101,104104,104284,104103,104553,104552],
[999999,105101,999999,104344,999999,104554]]*/
exports.convertEquipment = async (req, res) =>{
    let dataReceived = "";
    let cpt = 1;
    var equipmentMap = new Map();
    const equipments = await Equipment_Data.findAll();
    const equipmentsEnhanceRate = await Equipment_Enhance_Rate.findAll();
    equipments.forEach(element => {
        let result = "\""+element.id + "|"
        +"randomNamedeFDP"+cpt+"|"
        +element.promotion_level+"|"
        +"randomDescriptiondeFDP"+cpt+"|0|"
        +element.equipment_enhance_point + "|"
        +element.sale_price + "|"
        +element.craft_flg + "|"
        +"{\\\"dataint\\\":["
        +parseFloat(element.hp*100).toFixed(0) +","
        +parseFloat(element.atk*100).toFixed(0)+","
        +parseFloat(element.magic_str*100).toFixed(0)+","
        +parseFloat(element.def*100).toFixed(0)+","
        +parseFloat(element.magic_def*100).toFixed(0)+","
        +parseFloat(element.physical_critical*100).toFixed(0)+","
        +parseFloat(element.magic_critical*100).toFixed(0)+","
        +parseFloat(element.wave_hp_recovery*100).toFixed(0)+","
        +parseFloat(element.wave_energy_recovery*100).toFixed(0)+","
        +parseFloat(element.dodge*100).toFixed(0)+","
        +parseFloat(element.physical_penetrate*100).toFixed(0)+","
        +parseFloat(element.magic_penetrate*100).toFixed(0)+","
        +parseFloat(element.life_steal*100).toFixed(0)+","
        +parseFloat(element.hp_recovery_rate*100).toFixed(0)+","
        +parseFloat(element.energy_recovery_rate*100).toFixed(0)+","
        +parseFloat(element.energy_reduce_rate*100).toFixed(0)+","
        +parseFloat(element.accuracy*100).toFixed(0)+"]}|{\\\"dataint\\\":[";
        if(equipmentMap.has(element.id)){
            equipmentMap.set(element.id, equipmentMap.get(element.id)+result);
        }
        else{
            equipmentMap.set(element.id, result);
        }
        cpt = cpt + 1;
    });
    equipmentsEnhanceRate.forEach(element =>{
        let result = parseFloat(element.hp*100).toFixed(0) +","
        +parseFloat(element.atk*100).toFixed(0)+","
        +parseFloat(element.magic_str*100).toFixed(0)+","
        +parseFloat(element.def*100).toFixed(0)+","
        +parseFloat(element.magic_def*100).toFixed(0)+","
        +parseFloat(element.physical_critical*100).toFixed(0)+","
        +parseFloat(element.magic_critical*100).toFixed(0)+","
        +parseFloat(element.wave_hp_recovery*100).toFixed(0)+","
        +parseFloat(element.wave_energy_recovery*100).toFixed(0)+","
        +parseFloat(element.dodge*100).toFixed(0)+","
        +parseFloat(element.physical_penetrate*100).toFixed(0)+","
        +parseFloat(element.magic_penetrate*100).toFixed(0)+","
        +parseFloat(element.life_steal*100).toFixed(0)+","
        +parseFloat(element.hp_recovery_rate*100).toFixed(0)+","
        +parseFloat(element.energy_recovery_rate*100).toFixed(0)+","
        +parseFloat(element.energy_reduce_rate*100).toFixed(0)+","
        +parseFloat(element.accuracy*100).toFixed(0)+"]}"
        if(equipmentMap.has(element.equipment_id)){
            equipmentMap.set(element.equipment_id, equipmentMap.get(element.equipment_id)+result);
        }
    });
    for (var [key, value] of equipmentMap) {
        dataReceived = dataReceived + value +"<br>";
    }
    res.send(dataReceived);
}

exports.convertUnitPromotion = async (req, res) =>{

    const unitPromotion = await Unit_Promotion.findAll();
    var unitPromotionMap = new Map();
    var unitPromotionOutput ="";
    unitPromotion.forEach(element => {
        let result ="["
        +element.equip_slot_1+","
        +element.equip_slot_2+","
        +element.equip_slot_3+","
        +element.equip_slot_4+","
        +element.equip_slot_5+","
        +element.equip_slot_6+"]],"       
        if(unitPromotionMap.has(element.unit_id)){
            unitPromotionMap.set(element.unit_id, unitPromotionMap.get(element.unit_id)+result);
        }
        else{
            unitPromotionMap.set(element.unit_id, result);
        }
    });
    for (var [key, value] of unitPromotionMap) {
        unitPromotionOutput = unitPromotionOutput + key + " " + value;
        unitPromotionOutput = unitPromotionOutput.slice(0, -1);
        unitPromotionOutput = unitPromotionOutput + "<br>";
    }
    res.send(unitPromotionOutput);
}