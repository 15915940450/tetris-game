var arrI=[[4,4,4,4],[0,0,15,0],[2,2,2,2],[0,15,0,0]];
function draw(x) {
  //javascript-tetris
  var eleUpcomingCanvas = document.getElementById('upcoming_canvas');
  if (eleUpcomingCanvas.getContext) {
    var ctx = eleUpcomingCanvas.getContext('2d');

    var rectangle = new Path2D();
    //[0,0,15,0]
    for(var i=0;i<4;i++){
      var xx=arrI[1][i];

  console.log('init'+xx);
      if(xx>=8){
        rectangle.rect(0+1, 30*i+1, 28, 28);
        xx=xx-8;
      }
      if(xx>=4){
        rectangle.rect(30+1, 30*i+1, 28, 28);
        xx=xx-4;
      }
      if(xx>=2){
        rectangle.rect(30*2+1, 30*i+1, 28, 28);
        xx=xx-2;
      }
      if(xx>=1){
        rectangle.rect(30*3+1, 30*i+1, 28, 28);
        xx=xx-1;
      }
console.log(xx);

    }
    ctx.strokeStyle = '#000';
    ctx.stroke(rectangle);
    ctx.fillStyle = '#fee307';
    ctx.fill(rectangle);

  }
}
window.onload = function() {
  draw();
};
