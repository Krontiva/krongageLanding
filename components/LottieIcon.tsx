'use client';
import Lottie from 'lottie-react';

interface LottieIconProps {
  animationData: object;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export default function LottieIcon({
  animationData,
  size = 72,
  loop = true,
  autoplay = true,
  className = '',
}: LottieIconProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={{ width: size, height: size }}
      className={className}
    />
  );
}
