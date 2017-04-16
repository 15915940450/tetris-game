window.onload=function(){
  var jsonAll={
    "I":[[4,4,4,4],[0,0,15,0],[2,2,2,2],[0,15,0,0]],
    "J":[[2,2,6,0],[8,14,0,0],[6,4,4,0],[0,15,2,0]],
    "L":[[4,4,6,0],[0,14,8,0],[6,2,2,0],[0,2,14,0]],
    "O":[[0,6,6,0],[0,6,6,0],[0,6,6,0],[0,6,6,0]],
    "S":[[0,6,12,0],[4,6,2,0],[0,6,12,0],[4,6,2,0]],
    "T":[[0,14,4,0],[2,6,2,0],[0,4,14,0],[4,6,4,0]],
    "Z":[[0,12,6,0],[2,6,4,0],[0,12,6,0],[2,6,4,0]]
  };

  drawCeil(jsonAll.Z,0);
};

function drawCeil(arrCeil,x){
  var eleUpcomingCanvas=document.getElementById('upcoming_canvas');
  var ctx=eleUpcomingCanvas.getContext('2d');
  ctx.strokeStyle='#333';
  ctx.fillStyle='#fee300';
  for(var i=0;i<4;i++){
    var ceil=arrCeil[x];
    if(ceil[i]>=8){
      ctx.fillRect(0,30*i,30,30);
      ctx.strokeRect(0,30*i,30,30);
      ceil[i]-=8;
    }
    if(ceil[i]>=4){
      ctx.fillRect(30,30*i,30,30);
      ctx.strokeRect(30,30*i,30,30);
      ceil[i]-=4;
    }
    if(ceil[i]>=2){
      ctx.fillRect(30*2,30*i,30,30);
      ctx.strokeRect(30*2,30*i,30,30);
      ceil[i]-=2;
    }
    if(ceil[i]>=1){
      ctx.fillRect(30*3,30*i,30,30);
      ctx.strokeRect(30*3,30*i,30,30);
      ceil[i]-=1;
    }
  }
}
