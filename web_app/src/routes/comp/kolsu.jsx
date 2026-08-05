import React, { useRef, useEffect } from 'react'

function Kolsucanvas({ pointsData = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;

    const graphWidth = width - padding;
    const graphHeight = height - padding;

    // Reset trajectory & canvas
    ctx.clearRect(0, 0, width, height);

    const maxValue = 1750;
    const stepValue = 250;
    const scale = graphWidth / maxValue;

    // Grid Vertikal
    ctx.strokeStyle = "#bab7b7";
    ctx.lineWidth = 1;
    for (let x = 0; x <= maxValue; x += stepValue) {
      const px = padding + x * scale;
      ctx.beginPath(); 
      ctx.moveTo(px, 0); 
      ctx.lineTo(px, graphHeight); 
      ctx.stroke();
    }

    // Grid Horizontal
    for (let y = 0; y <= maxValue; y += stepValue) {
      const py = graphHeight - y * scale;
      ctx.beginPath(); 
      ctx.moveTo(padding, py); 
      ctx.lineTo(width, py); 
      ctx.stroke();
    }

    // Sumbu X & Y
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // Sumbu X
    ctx.beginPath(); 
    ctx.moveTo(padding, graphHeight); 
    ctx.lineTo(width, graphHeight); 
    ctx.stroke();

    // Sumbu Y
    ctx.beginPath(); 
    ctx.moveTo(padding, 0); 
    ctx.lineTo(padding, graphHeight); 
    ctx.stroke();

    // Label X
    ctx.fillStyle = "black";
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let x = 0; x <= maxValue; x += stepValue) {
      const px = padding + x * scale;
      ctx.fillText(x, px, graphHeight + 8);
    }

    // Label Y
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let y = stepValue; y <= maxValue; y += stepValue) {
      const py = graphHeight - y * scale;
      ctx.fillText(y, padding - 8, py);
    }

    // Trajectory Drawing (Hanya Menampilkan Garis Ungu Dinamis)
    const startX = 875;
    const startY = 100;

    if (pointsData.length > 0) {
      ctx.strokeStyle = "purple"; // Warna garis lintasan dinamis
      ctx.lineWidth = 3;
      ctx.beginPath();

      const orderedPoints = [...pointsData].reverse();

      orderedPoints.forEach((point, index) => {
        const drawX = startX + point.x;
        const drawY = startY + point.y;

        const xPixel = padding + drawX * scale;
        const yPixel = graphHeight - drawY * scale;

        if (index === 0) {
          ctx.moveTo(xPixel, yPixel);
        } else {
          ctx.lineTo(xPixel, yPixel);
        }
      });
      ctx.stroke();
    }

  }, [pointsData]); 

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} width={800} height={800} />
    </div>
  );
}

export default Kolsucanvas;