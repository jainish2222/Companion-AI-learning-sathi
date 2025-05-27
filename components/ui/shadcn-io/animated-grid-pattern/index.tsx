"use client";
import { motion } from "motion/react";
import {
  ComponentPropsWithoutRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<"svg"> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
}

const colorPalette = [
  "#E5D0FF",
  "#FFDA6E",
  "#BDE7FF",
  "#FFC8E4",
  "#FFECC8",
  "#C8FFDF",
];

export function AnimatedGridPattern({
  width = 30,
  height = 30,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.5,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState(() =>
    generateSquares(numSquares, { width, height, container: dimensions }),
  );

  function getPos(containerWidth: number, containerHeight: number) {
    return [
      Math.floor((Math.random() * containerWidth) / width),
      Math.floor((Math.random() * containerHeight) / height),
    ];
  }

  function getRandomColor() {
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
  }

  function generateSquares(
    count: number,
    {
      width,
      height,
      container,
    }: { width: number; height: number; container: { width: number; height: number } },
  ) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(container.width, container.height),
      color: getRandomColor(),
    }));
  }

  const updateSquarePosition = (id: number) => {
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(dimensions.width, dimensions.height),
              color: getRandomColor(),
            }
          : sq,
      ),
    );
  };

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      setSquares(generateSquares(numSquares, { width, height, container: dimensions }));
    }
  }, [dimensions, numSquares, width, height]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <svg
      ref={containerRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30 ",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill="none"
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
      <svg x={x} y={y} className="overflow-visible">
        {squares.map(({ pos: [xPos, yPos], id, color }, index) => (
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: maxOpacity }}
            transition={{
              duration,
              repeat: 1,
              delay: index * 0.1,
              repeatType: "reverse",
            }}
            onAnimationComplete={() => updateSquarePosition(id)}
            key={`${xPos}-${yPos}-${id}`}
            width={width - 3} // Slightly larger than before
            height={height - 3}
            x={xPos * width + 1}
            y={yPos * height + 1}
            fill={color}
            strokeWidth="0"
            rx="4"
            ry="4"
          />
        ))}
      </svg>
    </svg>
  );
}

export default AnimatedGridPattern;
