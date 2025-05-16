import { useCallback, useEffect, useRef, useState } from "react";

interface Vector {
  x: number;
  y: number;
}

interface UseMouseVectorReturn {
  position: Vector;
  vector: Vector;
}

export function useMouseVector(
  containerRef?: React.RefObject<HTMLElement>,
): UseMouseVectorReturn {
  const [position, setPosition] = useState<Vector>({ x: 0, y: 0 });
  const [vector, setVector] = useState<Vector>({ x: 0, y: 0 });
  const previousPosition = useRef<Vector>({ x: 0, y: 0 });
  const frameRef = useRef<number>();

  const updateMousePosition = useCallback(
    (e: MouseEvent) => {
      const container = containerRef?.current;
      const x = container
        ? e.clientX - container.getBoundingClientRect().left
        : e.clientX;
      const y = container
        ? e.clientY - container.getBoundingClientRect().top
        : e.clientY;

      setPosition({ x, y });

      // Calculate vector (movement direction and magnitude)
      setVector({
        x: x - previousPosition.current.x,
        y: y - previousPosition.current.y,
      });

      previousPosition.current = { x, y };
    },
    [containerRef],
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [updateMousePosition]);

  return { position, vector };
}
