import React, { useEffect, useRef } from 'react';

const NightSkyBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    const stars = [];
    const shootingStars = [];
    const constellations = [];
    const starCount = 200;
    const shootingStarChance = 0.002; // Chance per frame

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        speed: Math.random() * 0.05 + 0.02,
        pulseDirection: Math.random() > 0.5 ? 1 : -1
      });
    }

    // Create some constellations
    const createConstellation = (x, y, size) => {
      const points = [];
      const pointCount = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: x + (Math.random() - 0.5) * size,
          y: y + (Math.random() - 0.5) * size,
          size: Math.random() * 1.2 + 0.8
        });
      }
      return points;
    };

    // Add some constellations
    for (let i = 0; i < 8; i++) {
      constellations.push(
        createConstellation(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          100 + Math.random() * 150
        )
      );
    }

    // Create a shooting star
    const createShootingStar = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, vx, vy;
      
      switch (side) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = 0;
          vx = (Math.random() - 0.5) * 8;
          vy = Math.random() * 6 + 4;
          break;
        case 1: // right
          x = canvas.width;
          y = Math.random() * canvas.height;
          vx = -(Math.random() * 6 + 4);
          vy = (Math.random() - 0.5) * 8;
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height;
          vx = (Math.random() - 0.5) * 8;
          vy = -(Math.random() * 6 + 4);
          break;
        case 3: // left
          x = 0;
          y = Math.random() * canvas.height;
          vx = Math.random() * 6 + 4;
          vy = (Math.random() - 0.5) * 8;
          break;
      }

      return {
        x,
        y,
        vx,
        vy,
        size: Math.random() * 2 + 1,
        length: 50 + Math.random() * 100,
        brightness: 1,
        life: 1,
        decay: 0.02
      };
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with dark blue/black gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, '#0a0a2a');
      gradient.addColorStop(1, '#000000');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw stars
      stars.forEach(star => {
        // Twinkle effect
        star.brightness += star.speed * star.pulseDirection;
        if (star.brightness > 1 || star.brightness < 0.3) {
          star.pulseDirection *= -1;
        }

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();

        // Add glow for brighter stars
        if (star.brightness > 0.7) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            star.x, star.y, star.size,
            star.x, star.y, star.size * 3
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.brightness * 0.3})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw constellations
      ctx.strokeStyle = 'rgba(100, 150, 255, 0.3)';
      ctx.lineWidth = 1;
      constellations.forEach(constellation => {
        // Draw lines connecting stars
        for (let i = 0; i < constellation.length - 1; i++) {
          for (let j = i + 1; j < constellation.length; j++) {
            const distance = Math.sqrt(
              Math.pow(constellation[i].x - constellation[j].x, 2) +
              Math.pow(constellation[i].y - constellation[j].y, 2)
            );
            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(constellation[i].x, constellation[i].y);
              ctx.lineTo(constellation[j].x, constellation[j].y);
              ctx.stroke();
            }
          }
        }

        // Draw constellation stars
        constellation.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(150, 180, 255, 0.8)';
          ctx.fill();
        });
      });

      // Update and draw shooting stars
      if (Math.random() < shootingStarChance && shootingStars.length < 3) {
        shootingStars.push(createShootingStar());
      }

      shootingStars.forEach((star, index) => {
        // Update position
        star.x += star.vx;
        star.y += star.vy;
        star.life -= star.decay;

        if (star.life <= 0) {
          shootingStars.splice(index, 1);
          return;
        }

        // Draw shooting star trail
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.vx * 2, star.y - star.vy * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.life})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.size;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x - star.vx * (star.length / 10), star.y - star.vy * (star.length / 10));
        ctx.stroke();

        // Draw head
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'linear-gradient(135deg, #0a0a2a 0%, #000000 100%)' }}
    />
  );
};

export default NightSkyBackground;