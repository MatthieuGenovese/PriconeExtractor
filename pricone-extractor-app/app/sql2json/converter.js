const db = require("../models");
const Equipment_Data = db.equipment_data;
const Unit_Promotion = db.unit_promotion;
const Equipment_Enhance_Rate = db.equipment_enhance_rate;
const Unit_Promotion_Status = db.unit_promotion_status;
const Skill_Data = db.skill_data;
const Skill_Action = db.skill_action;

exports.convertEquipment = async (req, res) =>{
    var fs = require("fs");
    let dataReceived = "{\n  \"equipmentDic\": [\n";
    let unitPromotionStatusString = "";
    let cpt = 1;
    var equipmentMap = new Map();
    var equipmentsEnhanceRateMap = new Map();
    const equipments = await Equipment_Data.findAll();
    const equipmentsEnhanceRate = await Equipment_Enhance_Rate.findAll();
    equipments.forEach(element => {
        let result = "\t\""+element.id + "|"
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
        +parseFloat(element.accuracy*100).toFixed(0)+"]}";
        if(equipmentsEnhanceRateMap.has(element.equipment_id)){
            equipmentsEnhanceRateMap.set(element.equipment_id, equipmentsEnhanceRateMap.get(element.equipment_id)+result);
        }
        else{
            equipmentsEnhanceRateMap.set(element.equipment_id, result);
        }
        if(equipmentMap.has(element.equipment_id)){
            equipmentMap.set(element.equipment_id, equipmentMap.get(element.equipment_id)+result);
        }
    });
    for (var [key, value] of equipmentMap) {
        if(equipmentsEnhanceRateMap.has(key)){
            dataReceived = dataReceived + "  " + value +"\",\n";
        }
        else{
            dataReceived = dataReceived + "  " + value +"0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]}\",\n";
        }
    }
    dataReceived = dataReceived.slice(0,-2) + "\n";
    dataReceived = dataReceived + "  ],\n";
    var promise = asyncWriteFileWithGear();
    promise.then(function(result){
        dataReceived = dataReceived + "  " + result;
        var unitPromotionMap = getUnitPromotionMap();
        var unitPromotionStatusMap = getUnitPromotionStatusMap();
        var promise2 = asyncReplaceRank(dataReceived, unitPromotionMap);
        promise2.then(function (result2){
            dataReceived = result2;
            var promise3 = asyncReplacePromotionStatus(unitPromotionStatusMap,unitPromotionStatusString, dataReceived);
            promise3.then(function(result3){
                fs.writeFile("data/AllData.json", result3, (err) => {
                    if (err) console.log(err);
                    console.log("Successfully Written to File.");
                });
            });       
        });
    });
    res.send(dataReceived);
}




function asyncReplacePromotionStatus(unitPromotionStatusMap,unitPromotionStatusString, dataReceived){
    var promise = new Promise(function (resolve, errors){
        unitPromotionStatusMap.then(function(result){
            for (var [key, value] of result) {
                var characterPositionLine = dataReceived.search(key+"~")-1;
                var tmpSubstring = dataReceived.substring(characterPositionLine, dataReceived.length).split('\n')[0];
                var tmpSubstringrank = tmpSubstring.substring(tmpSubstring.search("\\%\\[")+2, tmpSubstring.search("\\]~"+key));
                dataReceived = dataReceived.replace(tmpSubstringrank, value.slice(0, -1));

            };
            resolve(dataReceived);
        });
    });
    return promise;
}

function asyncReplaceRank(dataReceived, unitPromotionMap){
    var promise = new Promise(function (resolve, errors){
        unitPromotionMap.then(function(result2){
            for (var [key, value] of result2) {
                var characterPositionLine = dataReceived.search(key+"~")-1;
                var tmpSubstring = dataReceived.substring(characterPositionLine, dataReceived.length).split('\n')[0];
                var tmpSubstringrank = tmpSubstring.substring(tmpSubstring.search("\\[\\["), tmpSubstring.search("\\]\\]")+2);
                if(tmpSubstringrank.length >= 50){
                    var newRankstring = "[" + value.slice(0, -1)+"]";
                    dataReceived = dataReceived.replace(tmpSubstringrank, newRankstring);
                }
            }
            resolve(dataReceived);
                     
        });
    });
    return promise;
}

function asyncWriteFileWithGear()
{
   var fs = require("fs");
   var promise = new Promise(function (resolve, errors){
       
    fs.readFile("data/AllDataOld.json", function( error, data ) {
            if ( error ) {
                errors( error );
            } else {
                var intPosition = data.toString().search("\"unitRarityDic\"");
                let subStr = data.toString().substring(intPosition, data.toString().length);
                resolve( subStr );
            }
        });
    });

    return promise;
}



exports.convertSkills= async (req, res) =>{
    var fs = require("fs");
    var dataReceived = "";
    var promise = asyncWriteFileWithSkill();
    promise.then(function(result){
        dataReceived = result;
        var skillDataMap = getSkillDataMap();
        var promise2 = asyncReplaceSkillData(dataReceived, skillDataMap);
        promise2.then(function (result2){
            dataReceived = result2;
            console.log("result 2 " + result2 + "\n");
            fs.writeFile("data/AllData.json", result2, (err) => {
                if (err) console.log(err);
                 console.log("Successfully Written to File.");
            });  
        });
    });
    res.send(dataReceived);
}


function asyncReplaceSkillData(dataReceived, skillDataMap){
    var promise = new Promise(function (resolve, errors){
        var totalSkillStr = "\"skillDataDic\": [\n";
        skillDataMap.then(function(result2){
            for (var [key, value] of result2) {
                totalSkillStr = totalSkillStr + value + "\n"               
            }
            //console.log("total skill str : " + totalSkillStr + "\n");
            totalSkillStr = totalSkillStr.slice(0,-2) + "\n  ],\n"
            let stringStart = dataReceived.search("\"skillDataDic\"");
            let stringEnd = dataReceived.search("\"skillActionDic\"");
            //console.log("start " + stringStart + "\n");
            //console.log("end " + stringEnd + "\n");
            //console.log("datareceived sub " + dataReceived.substring(stringStart,stringEnd) + "\n");
            dataReceived = dataReceived.replace(dataReceived.substring(stringStart,stringEnd), totalSkillStr);

            resolve(dataReceived);              
        });
    });
    return promise;
}
function asyncWriteFileWithSkill()
{
   var fs = require("fs");
   var promise = new Promise(function (resolve, errors){
       
    fs.readFile("data/AllData.json", function( error, data ) {
            if ( error ) {
                errors( error );
            } else {
                //var intPosition = data.toString().search("\"skillDataDic\"");
                //let subStr = data.toString().substring(intPosition, data.toString().length);
                resolve( data.toString() );
            }
        });
    });

    return promise;
}

async function getUnitPromotionMap(){
    const unitPromotion = await Unit_Promotion.findAll();
    var unitPromotionMap = new Map();
    unitPromotion.forEach(element => {
        let result ="["
        +element.equip_slot_1+","
        +element.equip_slot_2+","
        +element.equip_slot_3+","
        +element.equip_slot_4+","
        +element.equip_slot_5+","
        +element.equip_slot_6+"],"       
        if(unitPromotionMap.has(element.unit_id)){
            unitPromotionMap.set(element.unit_id, unitPromotionMap.get(element.unit_id)+result);
        }
        else{
            unitPromotionMap.set(element.unit_id, result);
        }
    });
    return unitPromotionMap;    
}

async function getSkillDataMap(){
    const skillData = await Skill_Data.findAll();
    var skillDataMap = new Map();
    cpt = 0;
    skillData.forEach(element => {
        let result = "\t\""
        +element.skill_id + "@"
        +"pongpong" +cpt+"@"
        +element.skill_type + "@"
        +element.skill_area_width + "@"
        +element.skill_cast_time + "@["
        +element.action_1 + ","
        +element.action_2 + ","
        +element.action_3 + ","
        +element.action_4 + ","
        +element.action_5 + "]@["
        +element.depend_action_1 + ","
        +element.depend_action_2 + ","
        +element.depend_action_3 + ","
        +element.depend_action_4 + ","
        +element.depend_action_5 + ","
        +element.depend_action_6 + ","
        +element.depend_action_7 + "]@"
        +"sample@"
        +element.icon_type + "\",";
        skillDataMap.set(element.skill_id, result);
        cpt = cpt + 1;
    });
    return skillDataMap;
}

async function getUnitPromotionStatusMap(){
    const unitPromotionStatus = await Unit_Promotion_Status.findAll();
    var unitPromotionStatusMap = new Map();
    //\"{\\\"dataint\\\":[16710,2268,0,120,100,0,0,0,0,0,0,0,0,0,0,0,0]}\"
    unitPromotionStatus.forEach(element => {
        let result = "\\\"{\\\\\\\"dataint\\\\\\\":["
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
        +parseFloat(element.accuracy*100).toFixed(0)+"]}\\\",";
        if(unitPromotionStatusMap.has(element.unit_id)){
            unitPromotionStatusMap.set(element.unit_id, unitPromotionStatusMap.get(element.unit_id)+result);
        }
        else{
            unitPromotionStatusMap.set(element.unit_id, result);
        }
    });
    return unitPromotionStatusMap;
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
        +element.equip_slot_6+"],"       
        if(unitPromotionMap.has(element.unit_id)){
            unitPromotionMap.set(element.unit_id, unitPromotionMap.get(element.unit_id)+result);
        }
        else{
            unitPromotionMap.set(element.unit_id, result);
        }
    });
    for (var [key, value] of unitPromotionMap) {
        unitPromotionOutput = unitPromotionOutput + key + "[" + value;
        unitPromotionOutput = unitPromotionOutput.slice(0, -1);
        unitPromotionOutput = unitPromotionOutput + "]<br>";
    }
    res.send(unitPromotionOutput);
}