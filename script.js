// Contact Form Submission
document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();
    alert("Thanks! I'll get back to you soon.");
    this.reset();
  });
  
  // Spider Web Interactive Background
  const canvas = document.getElementById('webCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let points = [];
  const pointCount = 80;
  const maxDist = 120;
  const repulsion = 150;
  const mouse = {x:-9999, y:-9999};
  
  // Create points
  for(let i=0;i<pointCount;i++){
    points.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      vx: (Math.random()-0.5)*0.5,
      vy: (Math.random()-0.5)*0.5
    });
  }
  
  // Track mouse
  window.addEventListener('mousemove', e => { mouse.x=e.clientX; mouse.y=e.clientY; });
  window.addEventListener('mouseout', e => { mouse.x=-9999; mouse.y=-9999; });
  
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    points.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>canvas.width)p.vx*=-1;
      if(p.y<0||p.y>canvas.height)p.vy*=-1;
  
      // Mouse repulsion
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let dist = Math.sqrt(dx*dx+dy*dy);
      if(dist<repulsion){ p.x += dx/dist*3; p.y += dy/dist*3; }
    });
  
    // Draw lines
    for(let i=0;i<points.length;i++){
      for(let j=i+1;j<points.length;j++){
        let dx = points[i].x - points[j].x;
        let dy = points[i].y - points[j].y;
        let dist = Math.sqrt(dx*dx+dy*dy);
        if(dist<maxDist){
          ctx.strokeStyle = `rgba(0,255,255,${1-dist/maxDist})`;
          ctx.lineWidth=1;
          ctx.beginPath();
          ctx.moveTo(points[i].x,points[i].y);
          ctx.lineTo(points[j].x,points[j].y);
          ctx.stroke();
        }
      }
    }
  
    // Draw points
    points.forEach(p=>{
      ctx.fillStyle='#0ff';
      ctx.beginPath();
      ctx.arc(p.x,p.y,3,0,Math.PI*2);
      ctx.fill();
    });
  
    requestAnimationFrame(animate);
  }
  animate();
  
  // Responsive
  window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  