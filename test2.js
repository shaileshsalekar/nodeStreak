var streakapi = require('streakapi');
var db = require('./db');
var streakApi = "37efcf2bd42f46c2b1c6e203cbd7f9c5";
var streak = new streakapi.Streak(streakApi);

/**Get all pipelines key using below function**/

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
//   'Sales Deals': 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAkObMmwoM',
//   Tenders: 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICA4Ov0mAoM',
//   'Sales / CRM': 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICA4OvgiQoM',
//   'Customer GST Registration': 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICA4MaagwoM',
//   Collections: 'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAoMSnmQoM' }

function getBoxData(pipeLineKeyArr, callback){
  //setting up direct pipelinekeys 
  var salesKey = pipeLineKeyArr['Sales']
  var logOutWarKey = pipeLineKeyArr['Logistics (Outward)']
  var logInWKey = pipeLineKeyArr['Logistics (Inward)']
  var pipeKeys = [salesKey, logOutWarKey, logInWKey];

  //load boxes for each pipelinekey
  for(var i=0; i<pipeKeys.length; i++){
    
    //'agxzfm1haWxmb29nYWVyMgsSDE9yZ2FuaXphdGlvbiILYnVsa21yby5jb20MCxIIV29ya2Zsb3cYgICAkN7JnwoM'
      if(pipeKeys[i]){
      
        streak.Boxes.getForPipeline(pipeKeys[i]).then(function(boxes){
        var boxName;
        var boxNote;
        var emailArr = [];
        var pipeLineKey;
        var emailString = "";
        for(box in boxes){
         var checkDate =  new Date(1524700800000);//26 apr 2018 in milliseconds
         var createdDate = new Date(boxes[box].creationTimestamp);
         
         //get only new notes
          if(createdDate >= checkDate && boxes[box].notes != undefined){
              
              if(boxes[box].name != undefined){
                  boxName = boxes[box].name;
              }else{
                  boxName= '';
              }
              boxNote = boxes[box].notes.trim();

              if(boxes[box].assignedToSharingEntries != undefined){
                for(emails in boxes[box].assignedToSharingEntries){
                  //emailString += boxes[box].assignedToSharingEntries[emails].email;
                }
                //emailString = emailArr.join(',');;
              }else{
                //emailString= '';
              }
          
              pipeLineKey = boxes[box].pipelineKey
              //console.log(boxes[box].creationTimestamp);
              //var newDate = checkDate.toISOString().substring(0, 19).replace('T', ' ')
              callback(boxName,boxNote,'',pipeLineKey,streakApi,'');
              //console.log(boxes[box].assignedToSharingEntries);
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

function setBoxData(boxName,boxNote,email,pipeLineKey,streakApi,createdDate){
  //console.log(pipeLineKey);
    db.insertData(boxName,boxNote,email,pipeLineKey,streakApi,createdDate);
}