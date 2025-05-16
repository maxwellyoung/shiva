"use client";

import { useMouseVector } from "@/hooks/use-mouse-vector";
import {
  motion,
  useAnimate,
  Transition,
  Target,
  AnimationSequence,
  useAnimationFrame,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  Children,
  useRef,
  useMemo,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

type TrailSegment = [Target, Transition];
type TrailAnimationSequence = TrailSegment[];

interface ImageTrailProps {
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement>;
  newOnTop?: boolean;
  rotationRange?: number;
  animationSequence?: TrailAnimationSequence;
  interval?: number;
}

interface TrailItem {
  id: string;
  x: number;
  y: number;
  rotation: number;
  animationSequence: TrailAnimationSequence;
  scale: number;
  child: React.ReactNode;
}

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  animationSequence = [
    [
      { scale: 1, opacity: 1 },
      { duration: 0.4, ease: "easeOut" },
    ],
    [
      { scale: 0, opacity: 0 },
      { duration: 1.2, ease: "easeIn" },
    ],
  ],
  interval = 150,
}: ImageTrailProps) => {
  const trailRef = useRef<TrailItem[]>([]);
  const { position: mousePosition } = useMouseVector(containerRef);
  const [isReady, setIsReady] = useState(false);
  const lastAddedTimeRef = useRef<number>(0);
  const currentIndexRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const childrenArray = useMemo(() => Children.toArray(children), [children]);

  // Wait for component to mount before tracking
  useEffect(() => {
    setIsReady(true);
  }, []);

  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      if (!isReady) return;

      const rect = containerRef?.current?.getBoundingClientRect();
      if (!rect) return;

      // Calculate distance moved since last position
      const distance = Math.hypot(
        mousePos.x - lastPositionRef.current.x,
        mousePos.y - lastPositionRef.current.y,
      );

      // Only add new item if mouse has moved enough
      if (distance < 20) return; // Minimum distance threshold

      // Adjust position relative to container
      const x = mousePos.x - 96;
      const y = mousePos.y - 128;

      const newItem: TrailItem = {
        id: uuidv4(),
        x,
        y,
        rotation: (Math.random() - 0.5) * rotationRange * 1.5,
        animationSequence,
        scale: 1,
        child: childrenArray[currentIndexRef.current],
      };

      currentIndexRef.current =
        (currentIndexRef.current + 1) % childrenArray.length;

      if (newOnTop) {
        trailRef.current.push(newItem);
      } else {
        trailRef.current.unshift(newItem);
      }

      lastPositionRef.current = mousePos;
    },
    [childrenArray, rotationRange, animationSequence, newOnTop, isReady],
  );

  const removeFromTrail = useCallback((itemId: string) => {
    trailRef.current = trailRef.current.filter((item) => item.id !== itemId);
  }, []);

  useAnimationFrame((time) => {
    if (time - lastAddedTimeRef.current >= interval) {
      addToTrail(mousePosition);
      lastAddedTimeRef.current = time;
    }
  });

  return (
    <div className="absolute inset-0 pointer-events-none">
      {trailRef.current.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  );
};

interface TrailItemProps {
  item: TrailItem;
  onComplete: (id: string) => void;
}

const TrailItem = ({ item, onComplete }: TrailItemProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const sequence = item.animationSequence.map((segment: TrailSegment) => [
      scope.current,
      ...segment,
    ]);

    animate(sequence as AnimationSequence).then(() => {
      onComplete(item.id);
    });
  }, []);

  return (
    <motion.div
      ref={scope}
      key={item.id}
      style={{
        position: "absolute",
        left: item.x,
        top: item.y,
        rotate: item.rotation,
        transformOrigin: "center center",
      }}
    >
      {item.child}
    </motion.div>
  );
};

export default ImageTrail;
