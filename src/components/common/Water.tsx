/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, memo } from "react";
import { easings, useSpring } from "@react-spring/web";

const Water = memo(({ incomingWaterLevel }: { incomingWaterLevel: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const transitionSpeed = 50;
  const WATER_COLOR = "rgb(56, 181, 255)";

  const [{ waterLevel }, setWaterLevel] = useSpring(() => ({
    waterLevel: 0,
    config: {
      duration: 500,
      easing: easings.easeOutCubic,
    },
  }));

  const drawWater = (
    ctx: CanvasRenderingContext2D,
    level: number,
    offset: number
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw container
    ctx.strokeRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Calculate water height
    const waterHeight = (ctx.canvas.height * level) / 100;

    // Draw water surface with flowing wave
    ctx.beginPath();
    ctx.moveTo(0, ctx.canvas.height);
    for (let x = 0; x <= ctx.canvas.width; x++) {
      ctx.lineTo(
        x,
        ctx.canvas.height - waterHeight + Math.sin(x * 0.05 + offset) * 5
      );
    }
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
    ctx.closePath();

    // Fill water
    ctx.fillStyle = WATER_COLOR;
    ctx.fill();
  };

  useEffect(() => {
    setWaterLevel({
      waterLevel: incomingWaterLevel,
      config: {
        duration: 1000 / (transitionSpeed / 20),
        easing: easings.easeOutCubic,
      },
    });
  }, [transitionSpeed, incomingWaterLevel]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");

      const animate = () => {
        offsetRef.current += 0.05;
        if (ctx) drawWater(ctx, waterLevel.get(), offsetRef.current);
        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [waterLevel]);

  return <canvas ref={canvasRef} width="600" className="h-full w-full" />;
});

export default Water;
