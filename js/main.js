window.onload=function(){
  /*
  *jsonAll
  */
  var jsonAll={
    "I":[[4,4,4,4],[0,0,15,0],[2,2,2,2],[0,15,0,0]],
    "J":[[2,2,6,0],[14,2,0,0],[12,8,8,0],[0,8,14,0]],
    "L":[[8,8,12,0],[0,2,14,0],[6,2,2,0],[14,8,0,0]],
    "O":[[0,6,6,0],[0,6,6,0],[0,6,6,0],[0,6,6,0]],
    "S":[[0,6,12,0],[4,6,2,0],[0,6,12,0],[4,6,2,0]],
    "T":[[0,14,4,0],[2,6,2,0],[0,4,14,0],[4,6,4,0]],
    "Z":[[0,12,6,0],[2,6,4,0],[0,12,6,0],[2,6,4,0]]
  };
  //常量
  var numGrid=30; //每一格的宽度
  var numAllCols=10;
  var numAllRows=18;
  var numWidthCanvas=numGrid*numAllCols;
  var numHeightCanvas=numGrid*numAllRows;
  var objKeys={
    up:38,
    right:39,
    down:40,
    start:53
  };

/*
*全局變量 strLetter,TF,strNextLetter,numNextTF,unitY,
*/
  var strLetter='L';  //strLetter=strNextLetter;
  var TF=0; //TF=numNextTF;
  var strNextLetter=Object.keys(jsonAll)[Math.floor(Math.random()*Object.keys(jsonAll).length)];
  var numNextTF=Math.floor(Math.random()*4);
  var unitX=3;  //中間位置
  var unitY=0;
  var container=[]; //container[x] container[x][y] 代表x列y行的格子
  for(var i=0;i<10;i++){
    container[i]=[];
    for(var j=0;j<18;j++){
      container[i][j]='';
    }
  }

  //ctx  CanvasRenderingContext2D
  var eleCanvas=document.getElementById('tetris_canvas');
  var ctx=eleCanvas.getContext('2d');
  var eleUpcomingCanvas=document.getElementById('upcoming_canvas');
  var ctxUpcoming=eleUpcomingCanvas.getContext('2d');

//=======================================functions
  /*
*func:doWithCeilXY
  **strLetter:形状所使用的字母
  **TF:四种变形的编号
  **unitX,unitY:距離畫布原點的X，Y單元距離
  **fn(unitX1,unitY1):其中unitX1=unitX+(3-j)，unitY1=unitY+i；
  */
  function doWithCeilXY(strLetter,TF,unitX,unitY,fn){
    for(var i=0;i<4;i++){
      var ceil=jsonAll[strLetter][TF].slice();  //复制一个数组
      for(var j=3;j>=0;j--){
        if(ceil[i]>=Math.pow(2,j)){
          fn(unitX+(3-j),unitY+i);
          ceil[i]-=Math.pow(2,j);
        }
      }
    }
  }
  /*
*func:checkWhetherCanOperateOrNot
  */
  function checkWhetherCanOperateOrNot(strLetter,TF,unitX,unitY){
    var bResult=true;
    doWithCeilXY(strLetter,TF,unitX,unitY,function(unitX1,unitY1){
      if((unitX1<0) || (unitX1>=numAllCols) || (unitY1<0) || (unitY1>=numAllRows) || container[unitX1][unitY1]){
        bResult=false;
      }
    });
    return bResult;
  }
  /*
*func:clearAll
  */
  function clearAll(){
    ctx.clearRect(0,0,numWidthCanvas+2,numHeightCanvas+2);
  }
  /*
*func:rotate
  */
  function rotate(){
    var TFpi=TF+1;
    if(TFpi>3){
      TFpi=0;
    }
    if(checkWhetherCanOperateOrNot(strLetter,TFpi,unitX,unitY)){
      TF=TFpi;
      //繪製
      clearAll();
      drawContainer();
      drawCeil(ctx,strLetter,TF,unitX,unitY);
    }
  }
  /*
*func:move
  */
  function move(dir){
    switch (dir) {
      case 'down':
        var unitYpi=unitY+1;
        if(checkWhetherCanOperateOrNot(strLetter,TF,unitX,unitYpi)){
          //Y距離加加
          unitY=unitYpi;
          //繪製
          clearAll();
          drawContainer();
          drawCeil(ctx,strLetter,TF,unitX,unitY);
        }else{
          //到達底部
          //修改二維數組Container的值
          doWithCeilXY(strLetter,TF,unitX,unitY,function(unitX1,unitY1){
            container[unitX1][unitY1]=strLetter;
          });
          // console.log(JSON.stringify(container));
          //初始化參數,設置下一個
          unitY=0;
          strLetter=strNextLetter;
          TF=numNextTF;
          strNextLetter=Object.keys(jsonAll)[Math.floor(Math.random()*Object.keys(jsonAll).length)];
          numNextTF=Math.floor(Math.random()*4);

          //繪製，此刻不需要清空畫布，直接畫下一個
          drawCeil(ctx,strLetter,TF,unitX,unitY);
          //預測窗口圖形
          drawCeil(ctxUpcoming,strNextLetter,numNextTF,0,0);
        }
      break;
      default:

    }
  }
  /*
*func:drawContainer
  */
  function drawContainer(){
    // console.log(JSON.stringify(container));
    ctx.strokeStyle='#333';
    ctx.fillStyle='#fee300';
    ctx.translate(0.5, 0.5);  //图变清脆
    for(var i=0;i<numAllCols;i++){
      for(var j=0;j<numAllRows;j++){
        if(container[i][j]){  //不是空字符串
          ctx.fillRect(numGrid*i,numGrid*j,numGrid,numGrid);
          ctx.strokeRect(numGrid*i,numGrid*j,numGrid,numGrid);
        }
      }
    }
    ctx.translate(-0.5, -0.5);
  }
  /*
*func:drawCeil
  **ctx:画布
  **strLetter:形状所使用的字母
  **TF:四种变形的编号
  **unitX,unitY:距離畫布原點的X，Y單元距離
  */
  function drawCeil(ctx,strLetter,TF,unitX,unitY){
    // ctx.clearRect(0,0,numWidthCanvas+2,numHeightCanvas+2);  //清除整个画布
    if(ctx.canvas.id==='upcoming_canvas'){
      ctx.clearRect(0,0,121,121);
    }
    ctx.strokeStyle='#333';
    ctx.fillStyle='#fee300';
    ctx.translate(0.5, 0.5);  //图变清脆

    doWithCeilXY(strLetter,TF,unitX,unitY,function(unitX1,unitY1){
      ctx.fillRect(numGrid*unitX1,numGrid*unitY1,numGrid,numGrid);
      ctx.strokeRect(numGrid*unitX1,numGrid*unitY1,numGrid,numGrid);
    });

    ctx.translate(-0.5, -0.5);
  }
  /*
*func:start
  **每次向下移動一格
  */
  function start(){
    var Timer=window.setInterval(function(){
      move('down');
    },1000);
  }

//=============================events
  /*
  *事件
  */
  document.onkeydown=function(ev){
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
        // console.log(ev.keyCode);
    }
  };



  /*
  *初始繪製FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
  */
  clearAll();
  drawCeil(ctx,strLetter,TF,unitX,unitY);
  drawCeil(ctxUpcoming,strNextLetter,numNextTF,0,0);

  start();
};
