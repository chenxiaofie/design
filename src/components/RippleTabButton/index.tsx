// RippleTabButton.tsx
import React from 'react';
import './index.css'; // 包含 ripple 样式
import type { MouseEvent } from 'react';

interface RippleTabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  borderColor: string;
}

const RippleTabButton: React.FC<RippleTabButtonProps> = ({
  label,
  active,
  onClick,
  borderColor,
}) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    createRipple(e);
    onClick();
  };

  return (
    <div
      className="relative overflow-hidden flex-1 h-[40px] flex items-center justify-center cursor-pointer transition-colors duration-200"
      style={{
        borderTop: `1px solid ${borderColor}`,
        backgroundColor: active ? borderColor : 'white',
      }}
      onClick={handleClick}
    >
      {label}
    </div>
  );
};

// 创建 Ripple 动画
function createRipple(event: MouseEvent<HTMLDivElement>) {
  const button = event.currentTarget;
  const circle = document.createElement('span');

  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
  circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
  circle.className = 'ripple';

  const existingRipple = button.getElementsByClassName('ripple')[0];
  if (existingRipple) {
    existingRipple.remove();
  }

  button.appendChild(circle);
}

export default RippleTabButton;
