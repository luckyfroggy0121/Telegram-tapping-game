import React, { useEffect, useRef } from "react";
import MediaQuery from "react-responsive";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pxs = useRef<Circle[]>([]);
  const rint = 70;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const con = canvas.getContext("2d");
    if (!con) return;

    const windowSize = () => {
      const wrapper = document.querySelector<HTMLDivElement>("#galaxy-wrapper");
      if (!wrapper) return;

      const WIDTH = wrapper.clientWidth;
      const HEIGHT = wrapper.clientHeight;
      canvas.width = WIDTH;
      canvas.height = HEIGHT;
    };

    windowSize();

    window.addEventListener("resize", windowSize);

    for (let i = 0; i < 100; i++) {
      pxs.current[i] = new Circle(con, canvas.width, canvas.height);
      pxs.current[i].reset();
    }

    const draw = () => {
      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      con.clearRect(0, 0, WIDTH, HEIGHT);
      con.globalCompositeOperation = "lighter";
      pxs.current.forEach((p) => {
        p.fade();
        p.move(WIDTH, HEIGHT);
        p.draw();
      });
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", windowSize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  class Circle {
    con: CanvasRenderingContext2D;
    WIDTH: number;
    HEIGHT: number;
    x: number = 0;
    y: number = 0;
    r: number = 0;
    dx: number = 0;
    dy: number = 0;
    hl: number = 0;
    rt: number = 0;
    stop: number = 0;
    s: {
      ttl: number;
      xmax: number;
      ymax: number;
      rmax: number;
      xdef: number;
      ydef: number;
      xdrift: number;
      ydrift: number;
      random: boolean;
      blink: boolean;
      rt: number;
    };

    constructor(con: CanvasRenderingContext2D, WIDTH: number, HEIGHT: number) {
      this.con = con;
      this.WIDTH = WIDTH;
      this.HEIGHT = HEIGHT;
      this.s = {
        ttl: 15000,
        xmax: 1, // Slower movement
        ymax: 1, // Slower movement
        rmax: 17,
        rt: 0.5, // Slower fade
        xdef: 960,
        ydef: 540,
        xdrift: 2,
        ydrift: 2,
        random: true,
        blink: true,
      };
      this.reset();
    }

    reset() {
      this.x = this.s.random ? this.WIDTH * Math.random() : this.s.xdef;
      this.y = this.s.random ? this.HEIGHT * Math.random() : this.s.ydef;
      this.r = (this.s.rmax - 1) * Math.random() + 1;
      this.dx = Math.random() * this.s.xmax * (Math.random() < 0.5 ? -1 : 1);
      this.dy = Math.random() * this.s.ymax * (Math.random() < 0.5 ? -1 : 1);
      this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
      this.rt = Math.random() * this.hl;
      this.s.rt = Math.random() + 1;
      this.stop = Math.random() * 0.2 + 0.4;
      this.s.xdrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
      this.s.ydrift *= Math.random() * (Math.random() < 0.5 ? -1 : 1);
    }

    fade() {
      this.rt += this.s.rt!;
    }

    draw() {
      if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl))
        this.s.rt! *= -1;
      else if (this.rt >= this.hl) this.reset();

      const newo = 1 - this.rt / this.hl;
      this.con.beginPath();
      this.con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
      this.con.closePath();

      const cr = this.r * newo;
      const g = this.con.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        cr <= 0 ? 1 : cr
      );
      g.addColorStop(0.0, `rgba(193,254,254,${newo})`);
      g.addColorStop(this.stop, `rgba(193,254,254,${newo * 0.2})`);
      g.addColorStop(1.0, "rgba(193,254,254,0)");
      this.con.fillStyle = g;
      this.con.fill();
    }

    move(WIDTH: number, HEIGHT: number) {
      this.x += (this.rt / this.hl) * this.dx;
      this.y += (this.rt / this.hl) * this.dy;
      if (this.x > WIDTH || this.x < 0) this.dx *= -1;
      if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
    }
  }
  return (
    <>
      <MediaQuery maxWidth={600}>
        <div className="relative min-h-screen" id="galaxy-wrapper">
          <canvas
            id="galaxy"
            className="absolute top-0 left-0 w-full h-full z-10"
            ref={canvasRef}
          ></canvas>
          {children}
        </div>
      </MediaQuery>
      <MediaQuery minWidth={601}>
        <div className="w-full h-screen text-center flex items-center justify-center bg-gray-800 text-xl">
          Sorry, you are not allowed to <br /> use PC or big screens.
        </div>
      </MediaQuery>
    </>
  );
};

export default Layout;
