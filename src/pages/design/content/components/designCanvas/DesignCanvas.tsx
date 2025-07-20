import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Group, Rect } from 'fabric';
import Ruler from '@/components/Ruler';
import { useCanvasEvents } from '@/hooks/useCanvasEvents';

const DesignCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [viewPort, setViewPort] = useState({ x: 0, y: 0 });

  // 调整画布大小的函数
  const resizeCanvas = () => {
    if (!fabricCanvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    // const canvas = fabricCanvasRef.current;

    const { width, height } = container.getBoundingClientRect();

    canvas?.setDimensions({ width, height });
    canvas?.renderAll();
  };

  // 获取容器尺寸
  const containerSize = containerRef.current?.getBoundingClientRect();
  const width = containerSize?.width || 0;
  const height = containerSize?.height || 0;

  // 使用事件监听器Hook - 在组件顶层调用
  useCanvasEvents({
    canvas: canvas,
    onZoomChange: setZoomLevel,
    onViewPortChange: setViewPort,
    onResize: resizeCanvas,
  });

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // 初始化 Fabric.js 画布
    const canvas = new Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: 'transparent',
      selection: false,
    });

    fabricCanvasRef.current = canvas;
    setCanvas(canvas);

    // 创建一个可拖拽的组
    const rect1 = new Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: '#ff6b6b',
      stroke: '#333',
      strokeWidth: 2,
    });

    const rect2 = new Rect({
      left: 250,
      top: 150,
      width: 80,
      height: 80,
      fill: '#4ecdc4',
      stroke: '#333',
      strokeWidth: 2,
    });

    const group = new Group([rect1, rect2], {
      left: 200,
      top: 200,
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });

    canvas.add(group);
    canvas.renderAll();

    // 设置画布容器样式
    const canvasContainer = canvas.wrapperEl;
    if (canvasContainer) {
      canvasContainer.style.width = '100%';
      canvasContainer.style.height = '100%';
      canvasContainer.style.background = `
        linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
      `;
      canvasContainer.style.backgroundSize = '20px 20px';
      canvasContainer.style.cursor = 'default';
    }

    // 清理函数
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {/* 刻度尺组件 */}
      <Ruler
        width={width}
        height={height}
        zoomLevel={zoomLevel}
        viewPort={viewPort}
      />

      {/* 画布容器 */}
      <div className="absolute top-6 left-6 right-0 bottom-0">
        <canvas
          ref={canvasRef}
          className="block"
          style={{
            background: 'transparent',
          }}
        />
      </div>
    </div>
  );
};

export default DesignCanvas;
