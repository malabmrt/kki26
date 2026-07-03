import React, { useRef, useEffect } from 'react'

function TrakA() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    const padding = 40;

    const graphWidth = width - padding;
    const graphHeight = height - padding;

    ctx.clearRect(0, 0, width, height);

    const maxValue = 3100;
    const stepValue = 150;

    const scale = graphWidth / maxValue;

    // grid
    ctx.strokeStyle = "#bab7b7";
    ctx.lineWidth = 1;

    // Vertikal
    for (let x = 0; x <= maxValue; x += stepValue) {
      const px = padding + x * scale;

      ctx.beginPath();
      ctx.moveTo(px, 0);
      ctx.lineTo(px, graphHeight);
      ctx.stroke();
    }

    // Horizontal
    for (let y = 0; y <= maxValue; y += stepValue) {
      const py = graphHeight - y * scale;

      ctx.beginPath();
      ctx.moveTo(padding, py);
      ctx.lineTo(width, py);
      ctx.stroke();
    }

    // sumbu
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // X bawah
    ctx.beginPath();
    ctx.moveTo(padding, graphHeight);
    ctx.lineTo(width, graphHeight);
    ctx.stroke();

    // Y kiri
    ctx.beginPath();
    ctx.moveTo(padding, 0);
    ctx.lineTo(padding, graphHeight);
    ctx.stroke();

    // label x
    ctx.fillStyle = "black";
    ctx.font = "10px Arial";

    ctx.textAlign = "center";
    ctx.textBaseline = "top";

    for (let x = 0; x <= maxValue; x += stepValue) {
      const px = padding + x * scale;
      ctx.fillText(x, px, graphHeight + 8);
    }

    // label y
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";

    for (let y = stepValue; y <= maxValue; y += stepValue) {
      const py = graphHeight - y * scale;
      ctx.fillText(y, padding - 8, py);
    }

    // ball
    const greenPoints = [
      { x: 2640, y: 970},
      { x: 2530, y: 1300},
      { x: 2670, y: 1570},

      { x: 1800, y: 2400}, 
      { x: 1630, y: 2400},       
      { x: 1460, y: 2400},       
      { x: 1290, y: 2400},   

      { x: 370, y: 1800},       
      { x: 230, y: 1500},
      { x: 200, y: 1200},            
    ];

    const redPoints = [
      { x: 2440, y: 970},
      { x: 2330, y: 1300}, 
      { x: 2470, y: 1570},

      { x: 1800, y: 2200},    
      { x: 1630, y: 2200},       
      { x: 1460, y: 2200},       
      { x: 1290, y: 2200}, 

      { x: 570, y: 1800}, 
      { x: 430, y: 1500},       
      { x: 400, y: 1200}, 
    ];

    const bluePoints = [
      {x: 2470, y: 300},
      {x: 2470, y: 225},
      {x: 2470, y: 150},
];
    ctx.fillStyle = "green";
    greenPoints.forEach(point => {
      const xPixel = padding + point.x * scale;
      const yPixel = graphHeight - point.y * scale;

      ctx.beginPath();
      ctx.arc(xPixel, yPixel, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "red";
    redPoints.forEach(point => {
      const xPixel = padding + point.x * scale;
      const yPixel = graphHeight - point.y * scale;

      ctx.beginPath();
      ctx.arc(xPixel, yPixel, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = "blue";
    bluePoints.forEach(point => {
      const xPixel = padding + point.x * scale;
      const yPixel = graphHeight - point.y * scale;

      ctx.beginPath();
      ctx.arc(xPixel, yPixel, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // surface dan underwater box; pedok
    const boxes = [
      { x: 530, y: 620, color: "blue", width: 30, height: 15 },
      { x: 830, y: 320, color: "green", width: 30, height: 15 },
      { x: 2550, y: 225, color: "#b9b5b5", width: 20, height: 40 }
    ];

    boxes.forEach(box => {
    const xPixel = padding + box.x * scale;
    const yPixel = graphHeight - box.y * scale;

    ctx.fillStyle = box.color;

    ctx.fillRect(
      xPixel - box.width / 2,
      yPixel - box.height / 2,
      box.width,
      box.height
    );
    });

  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} width={950} height={850} />
    </div>
  );
}

export default TrakA;