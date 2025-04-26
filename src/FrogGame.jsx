import React, { useRef, useEffect, useState } from 'react';
import './FrogGame.css';
import frogImg from './assets/frog.svg';
import car1Img from './assets/car1.svg';
import car2Img from './assets/car2.svg';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const FROG_SIZE = 32;
const CAR_WIDTH = 60;
const CAR_HEIGHT = 32;
const LANES = 5;
const LANE_HEIGHT = GAME_HEIGHT / (LANES + 1);
const CAR_SPEEDS = [2, 3, 2.5, 3.5, 2.2];
const CAR_IMAGES = [car1Img, car2Img];

function getRandomX(dir) {
  return dir === 'right' ? -CAR_WIDTH : GAME_WIDTH;
}

function getRandomCar(lane) {
  const direction = lane % 2 === 0 ? 'right' : 'left';
  const img = CAR_IMAGES[Math.floor(Math.random() * CAR_IMAGES.length)];
  return {
    x: getRandomX(direction),
    y: LANE_HEIGHT * (lane + 1) - CAR_HEIGHT / 2,
    speed: CAR_SPEEDS[lane] + Math.random(),
    direction,
    lane,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    img,
  };
}

export default function FrogGame() {
  const [frog, setFrog] = useState({ x: GAME_WIDTH / 2 - FROG_SIZE / 2, y: GAME_HEIGHT - FROG_SIZE - 10 });
  const [cars, setCars] = useState(() =>
    Array.from({ length: LANES }, (_, lane) => getRandomCar(lane))
  );
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const requestRef = useRef();

  useEffect(() => {
    function handleKey(e) {
      if (gameState !== 'playing') return;
      setFrog(frog => {
        let { x, y } = frog;
        if (e.key === 'ArrowUp') y = Math.max(0, y - LANE_HEIGHT);
        if (e.key === 'ArrowDown') y = Math.min(GAME_HEIGHT - FROG_SIZE, y + LANE_HEIGHT);
        if (e.key === 'ArrowLeft') x = Math.max(0, x - 40);
        if (e.key === 'ArrowRight') x = Math.min(GAME_WIDTH - FROG_SIZE, x + 40);
        return { x, y };
      });
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    function update() {
      setCars(prevCars =>
        prevCars.map(car => {
          let x = car.x + (car.direction === 'right' ? car.speed : -car.speed);
          // Reset car if out of bounds
          if (car.direction === 'right' && x > GAME_WIDTH) {
            return getRandomCar(car.lane);
          }
          if (car.direction === 'left' && x < -CAR_WIDTH) {
            return getRandomCar(car.lane);
          }
          return { ...car, x };
        })
      );
      requestRef.current = requestAnimationFrame(update);
    }
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    // Collision detection
    for (let car of cars) {
      if (
        frog.x < car.x + CAR_WIDTH &&
        frog.x + FROG_SIZE > car.x &&
        frog.y < car.y + CAR_HEIGHT &&
        frog.y + FROG_SIZE > car.y
      ) {
        setGameState('lost');
        return;
      }
    }
    // Win condition
    if (frog.y <= 0) {
      setGameState('won');
    }
  }, [cars, frog, gameState]);

  function resetGame() {
    setFrog({ x: GAME_WIDTH / 2 - FROG_SIZE / 2, y: GAME_HEIGHT - FROG_SIZE - 10 });
    setCars(Array.from({ length: LANES }, (_, lane) => getRandomCar(lane)));
    setGameState('playing');
  }

  return (
    <div className="frog-game-container">
      <svg width={GAME_WIDTH} height={GAME_HEIGHT} className="frog-game-canvas">
        {/* Draw lanes */}
        {Array.from({ length: LANES }).map((_, i) => (
          <rect
            key={i}
            x={0}
            y={LANE_HEIGHT * (i + 1) - LANE_HEIGHT / 2}
            width={GAME_WIDTH}
            height={LANE_HEIGHT}
            fill={i % 2 === 0 ? '#e3e3e3' : '#c6e2ff'}
            opacity={0.5}
          />
        ))}
        {/* Draw cars as images */}
        {cars.map((car, idx) => (
          <image
            key={idx}
            href={car.img}
            x={car.x}
            y={car.y}
            width={CAR_WIDTH}
            height={CAR_HEIGHT}
            style={{ pointerEvents: 'none' }}
          />
        ))}
        {/* Draw frog as image */}
        <image
          href={frogImg}
          x={frog.x}
          y={frog.y}
          width={FROG_SIZE}
          height={FROG_SIZE}
          style={{ pointerEvents: 'none' }}
        />
      </svg>
      {gameState !== 'playing' && (
        <div className="frog-game-overlay">
          <h2>{gameState === 'won' ? 'You Win! 🐸' : 'Game Over! 💥'}</h2>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
      <div className="frog-game-instructions">
        <b>How to Play:</b> Use the arrow keys to move the frog. Reach the top to win. Avoid the cars!
      </div>
    </div>
  );
}
