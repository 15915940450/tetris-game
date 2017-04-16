// console.log(Math.pow(2,3));
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

  var numWidthCanvas=300;
  var numHeightCanvas=540;
  var initX=0;

  drawCeil('tetris_canvas',jsonAll.I,initX);
  drawCeil('upcoming_canvas',jsonAll.I,0);

/*
*rotate变
*/
  var objKeys={
    up:38
  };
  document.onkeydown=function(ev){
    // console.log(ev.keyCode);
    ev.preventDefault();
    switch (ev.keyCode) {
      case objKeys.up:
        rotate();
        break;
      default:
        console.log('default');
    }
  };

  function drawCeil(strIdCanvas,arrCeil,x){
    var numGrid=30; //每一格的宽度
    var eleCanvas=document.getElementById(strIdCanvas);
    var ctx=eleCanvas.getContext('2d');

    ctx.clearRect(0,0,numWidthCanvas,numHeightCanvas);  //清除整个画布
    ctx.strokeStyle='#333';
    ctx.fillStyle='#fee300';
    ctx.translate(0.5, 0.5);  //图变清脆
    for(var i=0;i<4;i++){
      var ceil=arrCeil[x].slice();  //复制一个数组

      for(var j=3;j>=0;j--){
        if(ceil[i]>=Math.pow(2,j)){
          ctx.fillRect(numGrid*(3-j),numGrid*i,numGrid,numGrid);
          ctx.strokeRect(numGrid*(3-j),numGrid*i,numGrid,numGrid);
          ceil[i]-=Math.pow(2,j);
        }
      }
    }
    ctx.translate(-0.5, -0.5);
  }

  function rotate(){
    initX++;
    if(initX>=4){
      initX=0;
    }
    drawCeil('tetris_canvas',jsonAll.I,initX);
  }
};
