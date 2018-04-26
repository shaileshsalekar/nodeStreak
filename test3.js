var streakapi = require('streakapi');
var streak = new streakapi.Streak("c5662e22c4c14577a2bb693ada72dab2");

streak.Pipelines.getAll().then(function(pipelines){
    for(pipeline in pipelines){
        console.log(pipelines[pipeline].pipelineKey);
        streak.Boxes.getForPipeline(pipelines[pipeline].pipelineKey).then(function(boxes){
            for(box in boxes){
                console.log(boxes[box].boxKey);
                streak.Boxes.getFields(boxes[box].boxKey).then(function(fields){
                    console.log(fields);
                }).catch(function(error){
                    console.log(error);
                })
            }
        }).catch(function(error){
            console.log(error);
        })
    }
  
}).catch(function(error){
    console.log(error);
})

