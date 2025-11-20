"use client";
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import PETAL from "../../assets/petal.png";
import PETAL2 from "../../assets/petal-2.png";
import PETAL3 from "../../assets/petal-3.png";
import Image from "next/image";

interface PetalProps {
  delay: number;
  duration: number;
  left: number;
  size: number;
}

const Petal: React.FC<PetalProps> = ({ delay, duration, left, size }) => {
  const [styles] = useSpring(() => ({
    from: {
      top: `-100%`,
      left: `${left}%`,
      opacity: 1,
      transform: "rotate(0deg)",
    },
    to: {
      top: `110$`,
      left: `${left + 10}%`,
      opacity: Math.random() * 0.9,
      transform: "rotate(360deg)",
    },
    config: {
      duration: duration * 1000,
      delay: delay * 1000,
    },
    loop: true,
  }));

  const petalUrls = [PETAL, PETAL2, PETAL3];

  const randomPetal = petalUrls[Math.floor(Math.random() * petalUrls.length)];

  return (
    <animated.div
      style={{
        position: "absolute",
        width: size,
        height: size,
        ...styles,
      }}
    >
      <Image
        src={randomPetal}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
        alt="petal"
      />
    </animated.div>
  );
};

const CherryBlossom: React.FC = () => {
  const petals = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    delay: 50 + Math.random() * 5,
    duration: 10 + Math.random() * 10,
    left: Math.random() * 100,
    size: 10 + Math.random() * 30,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {petals.map((petal) => (
        <Petal
          key={petal.id}
          delay={petal.delay}
          duration={petal.duration}
          left={petal.left}
          size={petal.size}
        />
      ))}
    </div>
  );
};

export default CherryBlossom;
