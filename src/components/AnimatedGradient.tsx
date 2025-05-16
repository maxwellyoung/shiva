import { useDimensions } from "@/hooks/useDimensions";
import { cn } from "@/lib/utils";
import React, { useMemo, useRef } from "react";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height) * 0.75,
    [dimensions.width, dimensions.height],
  );

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
        ? "blur-3xl"
        : "blur-[100px]";

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className={cn("absolute inset-0 opacity-50", blurClass)}>
        {colors.map((color, index) => (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={
              {
                top: `${randomInt(-20, 20)}%`,
                left: `${randomInt(-20, 20)}%`,
                "--background-gradient-speed": `${speed}s`,
                "--tx-1": (Math.random() - 0.5).toFixed(2),
                "--ty-1": (Math.random() - 0.5).toFixed(2),
                "--tx-2": (Math.random() - 0.5).toFixed(2),
                "--ty-2": (Math.random() - 0.5).toFixed(2),
                "--tx-3": (Math.random() - 0.5).toFixed(2),
                "--ty-3": (Math.random() - 0.5).toFixed(2),
                "--tx-4": (Math.random() - 0.5).toFixed(2),
                "--ty-4": (Math.random() - 0.5).toFixed(2),
              } as React.CSSProperties
            }
            width={circleSize}
            height={circleSize}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={color}
              className="mix-blend-multiply"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default AnimatedGradient;
