// console.log(Math.pow(2,3));
window.onload=function(){
  /*
  *變量
  */
  var jsonAll={
    "I":[[4,4,4,4],[0,0,15,0],[2,2,2,2],[0,15,0,0]],
    "J":[[2,2,6,0],[8,14,0,0],[6,4,4,0],[0,15,2,0]],
    "L":[[4,4,6,0],[0,14,8,0],[6,2,2,0],[0,2,14,0]],
    "O":[[0,6,6,0],[0,6,6,0],[0,6,6,0],[0,6,6,0]],
    "S":[[0,6,12,0],[4,6,2,0],[0,6,12,0],[4,6,2,0]],
    "T":[[0,14,4,0],[2,6,2,0],[0,4,14,0],[4,6,4,0]],
    "Z":[[0,12,6,0],[2,6,4,0],[0,12,6,0],[2,6,4,0]]
  };

  var numGrid=30; //每一格的宽度
  var numAllCols=10;
  var numAllRows=18;
  var numWidthCanvas=numGrid*numAllCols;
  var numHeightCanvas=numGrid*numAllRows;

  var initT=0;
  var unitX=6;  //中間位置
  var unitY=1;
  var container=[]; //container[x] container[x][y] 代表x列y行的格子
  for(var i=0;i<10;i++){
    container[i]=[];
    for(var j=0;j<18;j++){
      container[i][j]='';
    }
  }


  /*
  *改變container二維數組,指示格子是否被佔用
  **strLetter:形状所使用的字母
  **tf:四种变形的编号
  **unitX,unitY:距離畫布原點的X，Y單元距離
  */

  function doWithCeilXY(strLetter,tf,unitX,unitY,fn){
    for(var i=0;i<4;i++){
      var ceil=jsonAll[strLetter][tf].slice();  //复制一个数组
      for(var j=3;j>=0;j--){
        if(ceil[i]>=Math.pow(2,j)){
          // container2[unitX+(3-j)]=container2[unitX+(3-j)]?container2[unitX+(3-j)]:[];
          // container2[unitX+(3-j)][unitY+i]=strLetter;
          fn(unitX+(3-j),unitY+i);
          ceil[i]-=Math.pow(2,j);
        }
      }
    }
  }

  function checkWhetherCanOperateOrNot(strLetter,tf,unitX,unitY){
    var bResult=true;
    doWithCeilXY(strLetter,tf,unitX,unitY,function(unitX1,unitY1){
      if((unitX1<0) || (unitX1>=numAllCols) || (unitY1<0) || (unitY1>=numAllRows)){
        bResult=false;
      }
    });
    return bResult;
  }



  /*
  *初始繪製
  */
  drawCeil('tetris_canvas','I',initT,unitX,unitY);



  // drawCeil('upcoming_canvas','I',0,0,0);

  var objKeys={
    up:38,
    right:39,
    down:40,
    start:53
  };

  /*
  *事件
  */
  document.onkeydown=function(ev){
    // console.log(ev.keyCode);
    // ev.preventDefault();
    switch (ev.keyCode) {
      case objKeys.up:
        rotate();
      break;
      case objKeys.down:
        move('down');
      break;

      case objKeys.start:
        start();
      break;
      default:
        console.log(ev.keyCode);
    }
  };



  /*
  *rotate变
  */
  function rotate(){
    var tf=initT+1;
    if(tf>3){
      tf=0;
    }
    // console.log();
    if(checkWhetherCanOperateOrNot('I',tf,unitX,unitY)){
      initT=tf;
      drawCeil('tetris_canvas','I',initT,unitX,unitY);
    }
  }
  /*
  *move移動
  */
  function move(dir){
    switch (dir) {
      case 'down':
        unitY++;
        drawCeil('tetris_canvas','I',initT,unitX,unitY);
      break;
      default:

    }
  }


  /*
  *測試用================================start
  */
  /*
  **strIdCanvas:画布ID
  **strLetter:形状所使用的字母
  **tf:四种变形的编号
  **unitX,unitX:距離畫布原點的X，Y單元距離
  */
  function drawCeil(strIdCanvas,strLetter,tf,unitX,unitY){
    var eleCanvas=document.getElementById(strIdCanvas);
    var ctx=eleCanvas.getContext('2d');

    ctx.clearRect(0,0,numWidthCanvas+2,numHeightCanvas+2);  //清除整个画布
    ctx.strokeStyle='#333';
    ctx.fillStyle='#fee300';
    ctx.translate(0.5, 0.5);  //图变清脆
    for(var i=0;i<4;i++){
      var ceil=jsonAll[strLetter][tf].slice();  //复制一个数组

      for(var j=3;j>=0;j--){
        if(ceil[i]>=Math.pow(2,j)){
          ctx.fillRect(numGrid*(3-j+unitX),numGrid*(unitY+i),numGrid,numGrid);
          ctx.strokeRect(numGrid*(3-j+unitX),numGrid*(unitY+i),numGrid,numGrid);
          ceil[i]-=Math.pow(2,j);
        }
      }
    }
    ctx.translate(-0.5, -0.5);
  }
  /*
  *測試用================================end
  */
};
