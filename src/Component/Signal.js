import React, { useRef, useEffect } from 'react';

const Signal = () => {
    const canvasRef = useRef(null);

    const frequency = 0.02; // Frekvenca
    const amplitude = Math.random(frequency); // Amplituda

    const canvasWidth = 700;
    const canvasHeight = 300;
    const color = "#E7842D";

    useEffect(() => {
        const canvas = canvasRef.current;

        const ctx = canvas.getContext('2d');
        let phase = 0;

        const generateSignal = () => {
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            ctx.beginPath();
            ctx.moveTo(0, height / 2);
            ctx.strokeStyle = color;

            for (let x = 0; x < width; x++) {
                const y = x * Math.cos(x * frequency + phase) + height / 2;
                ctx.lineTo(x, y);
            }

            ctx.stroke();

            phase += 0.05; // hitrost animacije
            requestAnimationFrame(generateSignal);
        };

        generateSignal();

        return () => cancelAnimationFrame(generateSignal);
    }, []);

    return <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />;
};

export default Signal;

