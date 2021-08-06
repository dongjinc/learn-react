/**
 * Map对象保存键值对
 */

export function demo1() {
  const objMap = new Map();
  console.log(objMap);
  objMap.set("name", "y");
  console.log(objMap.size);
}

var ele = document.getElementById("sj");
function animate(ele, spd) {
  var start = Date.now(); // remember start time
  var timer = setInterval(function () {
    var timePassed = Date.now() - start;
    var step = Math.ceil(Math.abs(timePassed - 5000) / 10);
    console.log(step);
    if (timePassed >= 5000) {
      clearInterval(timer); // finish the animation after 2 seconds
      return;
    }
    ele.style.left = ele.offsetLeft + step + "px";
  }, spd);
}
