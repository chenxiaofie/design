// RippleTabButton.tsx
import React from 'react';
import './index.css'; // 包含 ripple 样式
import styles from './RippleTabButton.module.scss'; // 引入 module 样式
import { theme } from 'antd';
import type { MouseEvent } from 'react';

interface RippleTabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
  borderColor?: string;
  icon?: React.ReactNode; // 添加图标属性
  vertical?: boolean; // 添加垂直布局属性
  height?: string; // 添加高度属性
  className?: string;
  iconColor?: string;
}

const RippleTabButton: React.FC<RippleTabButtonProps> = ({
  label,
  active,
  onClick,
  borderColor = '#fff',
  icon,
  vertical = false, // 默认为水平布局
  height = '40px', // 设置默认高度
  className,
}) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    createRipple(e);
    onClick();
  };
  const { token } = theme.useToken();
  return (
    <div
      className={`relative overflow-hidden flex-1 flex items-center justify-center cursor-pointer transition-colors duration-200 ${className || ''} ${styles.tabButton}`}
      style={{
        borderTop: `1px solid ${borderColor}`,
        ['--tab-bg' as string]: active
          ? token.colorPrimary
          : token.colorTextLightSolid,
        ['--tab-color' as string]: active
          ? token.colorTextLightSolid
          : 'inherit',
        height, // 使用传入的高度值
      }}
      onClick={handleClick}
    >
      <div
        className={`flex ${vertical ? 'flex-col' : 'flex-row'} items-center gap-1`}
      >
        {icon && <span className={`flex items-center icons`}>{icon}</span>}
        <span className={`label`}>{label}</span>
      </div>
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
