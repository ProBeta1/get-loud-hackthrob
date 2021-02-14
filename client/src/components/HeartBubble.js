import React, {useEffect, useState} from 'react'

function HeartBubble(props) {

  const duration = 3000;
  const speed = 0.5;
  const cursorXOffset = 0;
  const cursorYOffset = -5;

  const [down, setDown] = useState(false);
  const [event, setEvent] = useState(null);

  let hearts = [];

  let brd = document.createElement('div');
  document.body.insertBefore(brd, document.getElementById("board"));
		
  function GenerateHeart(x, y, xBound, xStart, scale)
  {
    let heart = document.createElement("div");
    heart.setAttribute('class', 'heart');
    brd.appendChild(heart);
    heart.time = duration;
    heart.x = x;
    heart.y = y;
    heart.bound = xBound;
    heart.direction = xStart;
    heart.style.left = heart.x + "px";
    heart.style.top = heart.y + "px";
    heart.scale = scale;
    heart.style.transform = "scale(" + scale + "," + scale + ")";
    if(hearts == null)
      hearts = [];
    hearts.push(heart);
    return heart;
  }

  document.onmousedown = function(e) {
    // console.log("mouse down " + e);
    setDown(true);
    setEvent(e);
  }
  
  document.onmouseup = function(e) {
    // console.log("mouse up");
    setDown(false);
  }
  
  document.onmousemove = function(e) {
    setEvent(e);
  }
  
  document.ontouchstart = function(e) {
    setDown(true);
    setEvent(e.touches[0]);
  }
  
  document.ontouchend = function(e) {
    setDown(false);
  }
  
  document.ontouchmove = function(e) {
    setEvent(e.touches[0]);
  }
  
  let before = Date.now();
  let id = setInterval(frame, 5);
  let gr = setInterval(check, 100);

  function frame()
  {
    var current = Date.now();
    var deltaTime = current - before;
    before = current;
    for(let i =0;i<hearts.length;i++)
    {
      let heart = hearts[i];
      heart.time -= deltaTime;
      if(heart.time > 0)
      {
        heart.y -= speed;
        heart.style.top = heart.y + "px";
        heart.style.left = heart.x + heart.direction * heart.bound * Math.sin(heart.y * heart.scale / 30) / heart.y * 100 + "px";
      }
      else
      {
        heart.parentNode.removeChild(heart);
        hearts.splice(i, 1);
      }
    }

  }

  function check()
  {
    if(down)
    {
      var start = 1 - Math.round(Math.random()) * 2;
      var scale = Math.random() * Math.random() * 0.8 + 0.2;
      var bound = 30 + Math.random() * 20;
      GenerateHeart(event.pageX - brd.offsetLeft + cursorXOffset, event.pageY - brd.offsetTop + cursorYOffset, bound, start, scale);
    }
  }

  useEffect(() => {
    GenerateHeart(500, 300, null, null, 5);
    console.log("useffect");
  },[])

  return (
    <div>
      <h1>HHHHH</h1>
    </div>
  )
}

export default HeartBubble
