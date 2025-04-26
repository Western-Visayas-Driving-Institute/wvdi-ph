import React, { useRef, useEffect, useState, useCallback } from 'react';
import './FrogGame.css';
import frogImg from './assets/frog.svg';
import car1Img from './assets/car1.svg';
import car2Img from './assets/car2.svg';

let carIdCounter = 0;

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const FROG_SIZE = 32;
const CAR_WIDTH = 60;
const CAR_HEIGHT = 32;
const LANES = 5;
const LANE_HEIGHT = GAME_HEIGHT / LANES;
const CAR_SPEEDS = [2, 3, 2.5, 3.5, 2.2];
const CAR_IMAGES = [car1Img, car2Img];

function getRandomX(dir) {
  return dir === 'right' ? -CAR_WIDTH : GAME_WIDTH;
}

function getRandomCar(lane) {
  const direction = lane % 2 === 0 ? 'right' : 'left';
  const img = CAR_IMAGES[Math.floor(Math.random() * CAR_IMAGES.length)];
  return {
    id: ++carIdCounter,
    x: getRandomX(direction),
    y: LANE_HEIGHT * (lane + 0.5) - CAR_HEIGHT / 2,
    speed: CAR_SPEEDS[lane] + Math.random(),
    direction,
    lane,
    img,
  };
}

export default function FrogGame() {
  const [frog, setFrog] = useState({
    x: GAME_WIDTH / 2 - FROG_SIZE / 2,
    lane: LANES - 1
  });
  const frogY = LANE_HEIGHT * (frog.lane + 0.5) - FROG_SIZE / 2;
  const [cars, setCars] = useState(() =>
    Array.from({ length: LANES }, (_, lane) => getRandomCar(lane))
  );
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const requestRef = useRef();
  const lastTimeRef = useRef(null);

  const moveFrog = useCallback(direction => {
    setFrog(f => {
      let { x, lane } = f;
      if (direction === 'up') lane = Math.max(0, lane - 1);
      if (direction === 'down') lane = Math.min(LANES - 1, lane + 1);
      if (direction === 'left') x = Math.max(0, x - 40);
      if (direction === 'right') x = Math.min(GAME_WIDTH - FROG_SIZE, x + 40);
      return { x, lane };
    });
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (gameState !== 'playing') return;
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
        e.preventDefault();
        const dirMap = {
          ArrowUp: 'up', ArrowDown: 'down',
          ArrowLeft: 'left', ArrowRight: 'right'
        };
        moveFrog(dirMap[e.key]);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, moveFrog]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    function update(timestamp) {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      // Move cars
      setCars(prevCars =>
        prevCars.map(car => {
          const directionFactor = car.direction === 'right' ? 1 : -1;
          let x = car.x + directionFactor * car.speed * (delta / 16.67);
          if (car.direction === 'right' && x > GAME_WIDTH) return getRandomCar(car.lane);
          if (car.direction === 'left' && x < -CAR_WIDTH) return getRandomCar(car.lane);
          return { ...car, x };
        })
      );

      // Collision detection & win/loss
      for (let car of cars) {
        if (
          frog.x < car.x + CAR_WIDTH &&
          frog.x + FROG_SIZE > car.x &&
          frogY < car.y + CAR_HEIGHT &&
          frogY + FROG_SIZE > car.y
        ) {
          setGameState('lost');
          return;
        }
      }
      if (frogY <= 0) {
        setGameState('won');
        return;
      }

      requestRef.current = requestAnimationFrame(update);
    }
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, cars, frog, frogY]);

  const resetGame = useCallback(() => {
    setFrog({
      x: GAME_WIDTH / 2 - FROG_SIZE / 2,
      lane: LANES - 1
    });
    setCars(Array.from({ length: LANES }, (_, lane) => getRandomCar(lane)));
    setGameState('playing');
  }, []);

  return (
    <div className="frog-game-container">
      <svg width={GAME_WIDTH} height={GAME_HEIGHT} className="frog-game-canvas">
        {/* Draw lanes */}
        {Array.from({ length: LANES }).map((_, i) => (
          <rect
            key={i}
            x={0}
            y={LANE_HEIGHT * i}
            width={GAME_WIDTH}
            height={LANE_HEIGHT}
            fill={i % 2 === 0 ? '#e3e3e3' : '#c6e2ff'}
            opacity={0.5}
          />
        ))}
        {/* Draw cars as images */}
        {cars.map(car => (
          <image
            key={car.id}
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
          y={frogY}
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
