import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Group, Rect } from 'fabric';

const DesignCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasInstanceRef = useRef<Canvas | null>(null);
  const [zoom, setZoom] = useState(1);
  const canvasGroupRef = useRef<Group | null>(null);

  // 初始化画布
  useEffect(() => {
    if (!canvasRef.current) return;

    // 获取父容器尺寸
    const parentElement = canvasRef.current.parentElement;
    if (!parentElement) return;

    const rect = parentElement.getBoundingClientRect();

    // 画布大小与容器相同
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    console.log('Canvas dimensions:', { canvasWidth, canvasHeight, containerWidth: rect.width, containerHeight: rect.height });

    const fabricCanvas = new Canvas(canvasRef.current, {
      width: canvasWidth,
      height: canvasHeight,
      selection: false, // 禁用选择功能
      preserveObjectStacking: true,
    });

    canvasInstanceRef.current = fabricCanvas;


    // 创建可缩放的画布组
    createScalableCanvas(fabricCanvas, canvasWidth, canvasHeight);

    // 渲染完后找到upper-canvas元素
    const upperCanvasEl = fabricCanvas.upperCanvasEl; // fabric.Canvas 实例自带upperCanvasEl属性
    if (upperCanvasEl) {
      upperCanvasEl.style.backgroundImage = 'none';  // 去掉背景图
    }
    // 添加Fabric.js事件监听器
    setupFabricEvents(fabricCanvas);

    fabricCanvas.renderAll();

    return () => {
      fabricCanvas.dispose();
      canvasInstanceRef.current = null;
    };
  }, []);

  // 创建可缩放的画布组
  const createScalableCanvas = (fabricCanvas: Canvas, canvasWidth: number, canvasHeight: number) => {
    // 计算画布组的大小（比主画布小一些）
    const groupWidth = Math.min(canvasWidth, canvasHeight) * 0.8;
    const groupHeight = groupWidth;

    // 创建画布背景矩形 - 设置为纯白色
    const canvasBackground = new Rect({
      left: 0,
      top: 0,
      width: groupWidth,
      height: groupHeight,
      fill: '#ffffff',
      opacity: 1,
      selectable: false,
      evented: false,
    });

    // 创建画布组
    const canvasGroup = new Group([canvasBackground], {
      left: (canvasWidth - groupWidth) / 2,
      top: (canvasHeight - groupHeight) / 2,
      selectable: false,
      evented: true,
      hasControls: false,
      hasBorders: false,
    });

    canvasGroupRef.current = canvasGroup;
    fabricCanvas.add(canvasGroup);

    // 设置初始缩放
    canvasGroup.set({
      scaleX: zoom,
      scaleY: zoom,
    });

    fabricCanvas.renderAll();
  };

  // 设置Fabric.js事件监听器
  const setupFabricEvents = (fabricCanvas: Canvas) => {
    let isDraggingGroup = false;
    let lastPosX = 0;
    let lastPosY = 0;

    // 鼠标按下事件
    fabricCanvas.on('mouse:down', (options) => {
      if (options.target === canvasGroupRef.current) {
        isDraggingGroup = true;
        fabricCanvas.defaultCursor = 'grabbing';

        // 记录初始位置
        const pointer = fabricCanvas.getPointer(options.e);
        lastPosX = pointer.x;
        lastPosY = pointer.y;

        // 阻止默认行为
        options.e.preventDefault();
      }
    });

    // 鼠标移动事件
    fabricCanvas.on('mouse:move', (options) => {
      if (isDraggingGroup && canvasGroupRef.current && options.e) {
        const group = canvasGroupRef.current;
        const pointer = fabricCanvas.getPointer(options.e);

        // 计算位置差
        const deltaX = pointer.x - lastPosX;
        const deltaY = pointer.y - lastPosY;

        // 更新组的位置
        group.set({
          left: (group.left || 0) + deltaX,
          top: (group.top || 0) + deltaY,
        });

        // 更新最后位置
        lastPosX = pointer.x;
        lastPosY = pointer.y;

        fabricCanvas.renderAll();

        // 阻止默认行为
        options.e.preventDefault();
      }
    });

    // 鼠标释放事件
    fabricCanvas.on('mouse:up', (options) => {
      if (isDraggingGroup) {
        isDraggingGroup = false;
        fabricCanvas.defaultCursor = 'default';

        // 阻止默认行为
        if (options.e) {
          options.e.preventDefault();
        }
      }
    });

    // 滚轮缩放事件 - 实现无限缩放
    fabricCanvas.on('mouse:wheel', (options) => {
      if (!canvasGroupRef.current) return;
      
      const delta = options.e.deltaY > 0 ? 0.9 : 1.1;
      const currentZoom = canvasGroupRef.current.scaleX || 1;
      const newZoom = currentZoom * delta; // 移除缩放限制
      
      // 获取鼠标位置
      const pointer = fabricCanvas.getPointer(options.e);
      const group = canvasGroupRef.current;
      
      // 计算鼠标相对于组的位置
      const groupLeft = group.left || 0;
      const groupTop = group.top || 0;

      // 计算鼠标在组内的相对位置
      const mouseInGroupX = (pointer.x - groupLeft) / currentZoom;
      const mouseInGroupY = (pointer.y - groupTop) / currentZoom;
      
      
      // 更新组的位置，保持鼠标位置不变
      group.set({
        scaleX: newZoom,
        scaleY: newZoom,
        left: pointer.x - mouseInGroupX * newZoom,
        top: pointer.y - mouseInGroupY * newZoom,
      });
      
      setZoom(newZoom);
      fabricCanvas.renderAll();
      
      options.e.preventDefault();
      options.e.stopPropagation();
    });
  };

  // 监听容器尺寸变化，动态调整画布大小和位置
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !canvasInstanceRef.current) return;

      const parentElement = canvasRef.current.parentElement;
      if (!parentElement) return;

      const rect = parentElement.getBoundingClientRect();

      // 重新计算画布大小
      const canvasWidth = rect.width;
      const canvasHeight = rect.height;

      console.log('Resize - new dimensions:', { canvasWidth, canvasHeight });

      // 更新 Fabric.js 画布尺寸
      const fabricCanvas = canvasInstanceRef.current;
      fabricCanvas.setDimensions({ width: canvasWidth, height: canvasHeight });

      // 重新创建可缩放画布
      if (canvasGroupRef.current) {
        fabricCanvas.remove(canvasGroupRef.current);
      }
      createScalableCanvas(fabricCanvas, canvasWidth, canvasHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="design-stage-grid lower-canvas"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0'
      }}
    />
  );
};

export default DesignCanvas; 