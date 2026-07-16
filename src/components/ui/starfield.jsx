import React, { useEffect, useRef } from "react";

// Animated starfield background for non-home pages. Deliberately slower and
// sparser than a typical "space warp" effect, since this sits behind
// readable content rather than being the page's focal point.
export function Starfield({
  starColor = "rgba(255,255,255,0.7)",
  quantity = 300,
  speed = 0.3,
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;
    let depth = 0;
    let animationId;
    const ratio = quantity / 2;
    let stars = [];

    const measure = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      cx = w / 2;
      cy = h / 2;
      depth = (w + h) / 2;
      canvas.width = w;
      canvas.height = h;
    };

    const seed = () => {
      stars = Array.from({ length: quantity }, () => ({
        x: Math.random() * w * 2 - cx * 2,
        y: Math.random() * h * 2 - cy * 2,
        z: Math.random() * depth,
        sx: 0,
        sy: 0,
        psx: 0,
        psy: 0,
        visible: true,
      }));
    };

    const draw = () => {
      // Near-black clear each frame - matches the site's --background token.
      // Update this if the design system's background token ever changes.
      ctx.fillStyle = "rgb(8, 8, 8)";
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = starColor;

      for (const star of stars) {
        star.psx = star.sx;
        star.psy = star.sy;
        star.visible = true;

        star.z -= speed;
        if (star.z <= 0) {
          star.z += depth;
          star.visible = false;
        }

        star.sx = cx + (star.x / star.z) * ratio;
        star.sy = cy + (star.y / star.z) * ratio;

        if (
          star.visible &&
          star.psx > 0 &&
          star.psx < w &&
          star.psy > 0 &&
          star.psy < h
        ) {
          ctx.lineWidth = (1 - star.z / depth) * 1.5;
          ctx.beginPath();
          ctx.moveTo(star.psx, star.psy);
          ctx.lineTo(star.sx, star.sy);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    measure();
    seed();
    draw();

    const handleResize = () => measure();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, [quantity, speed, starColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 h-full w-full block ${className}`}
      aria-hidden="true"
    />
  );
}
