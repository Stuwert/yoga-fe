if(sequence.length > 1){
  sequence.forEach(function(item, i){
    $.when(getPose(item)).done(function(result){
      newPose(result[0].id, result[0].pose_name, returnImage(result[0].pose_name), 'main', time[i]);
    })
  })
}else{
  $.when(getPose(sequence)).done(function(result){
    newPose(result[0].id, result[0].pose_name, returnImage(result[0].pose_name), 'main', time)
  })
}

function newPose(id, name, image, appendTo, time){
  var newDiv = '<div class="pose"><h2 id="' + id + '"><a href="/poses/'+ id +'">' + name + '</a></h2><h4>Time</h4><p class="time">' + time + '</p><img src="/img/photos/' + image + '"></input></div>'
  $(newDiv).appendTo(appendTo);
}

function getPose (id){
  return $.ajax({
    url: 'https://young-shelf-28645.herokuapp.com/api/poses/id?id=' + id,
    dataType: 'JSON',
    method: 'GET'
  })
}

function returnImage(name){
  var returnable;
  posefiles.forEach(function(item){
    if (item.pose_name == name){
      returnable = item.file_reference;
    }
  })
  return returnable;
}
