var streakapi = require('streakapi');
var db = require('./db');
var streakApi = "c5662e22c4c14577a2bb693ada72dab2";
var streak = new streakapi.Streak(streakApi);

/**Get all pipelines key using below function**/

 module.exports.streakComment = function(){
  
  (function getAllPipeLineKeys(callback1, callback2){
    streak.Pipelines.getAll().then(function(pipelines){
      var pipelineArr = {};
      for(pipeline in pipelines){
        pipelineArr[pipelines[pipeline].name] = pipelines[pipeline].pipelineKey 
      }
      callback1(pipelineArr, callback2);
      //console.log(pipelineArr);
    }).catch(function(error){
      console.log(error);
    })  
})(getBoxData, setBoxData)


// /** All pipelinekeys **/
// { 'Logistics (Inward)': 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAgKCOgQoM',
//   Sales: 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAgMCcggoM',
//   'Logistics (Outward)': 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAgJjVmAoM',
//   'Sales Deals': 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAkJ7vmwoM',
//   Tenders: 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICA4Ov0mAoM',
//   'Sales / CRM': 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICA4OvgiQoM',
//   'Customer GST Registration': 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICA4MaagwoM',
//   Collections: 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAoMSnmQoM' }

function getBoxData(pipeLineKeyArr, callback){
 //setting up direct pipelinekeys 
 var salesKey = pipeLineKeyArr['Sales']
 var logOutWarKey = pipeLineKeyArr['Logistics (Outward)']
 var logInWKey = pipeLineKeyArr['Logistics (Inward)']
 var salesdeals = pipeLineKeyArr['Bugs']
 var pipeKeys = [salesKey, logOutWarKey, logInWKey, salesdeals];

 //load boxes for each pipelinekey
 for(var i=0; i<pipeKeys.length; i++){
   
   if(pipeKeys[i]){
        
       streak.Boxes.getForPipeline(pipeKeys[i]).then(function(boxes){
       var boxName;
       var boxNote;
       var pipeLineKey;
       var dateLimit = "1525046400000" //in millisec
      
      for(box in boxes){
       
        var checkDate =  new Date(1525046400000);//26 apr 2018 in milliseconds 1524700800000
        var lastUpdatedDate = new Date(boxes[box].lastUpdatedTimestamp);
        //console.log(boxes[box]);
        //This date validation is of box date not notes date
         if(lastUpdatedDate >= checkDate && boxes[box].notes != undefined){
           
             //get box name
             if(boxes[box].name != undefined){
                 boxName = boxes[box].name;
             }else{
                 boxName= '';
             }
             //get box note
             boxNote = boxes[box].notes.trim();

             pipeLineKey = boxes[box].pipelineKey
             //callback to insert data in db
             callback(boxName,boxNote,pipeLineKey,streakApi);
            
           }else{
             continue;
           }
       }
     
     }).catch(function(error){
       console.log(error);
     })
   }
 }  
}

function setBoxData(boxName,boxNote,pipeLineKey,streakApi){
     db.insertData(boxName,boxNote,pipeLineKey,streakApi);
}
 }