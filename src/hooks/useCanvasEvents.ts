import { useEffect, useState, useCallback, useRef } from 'react';
import { Canvas, Point } from 'fabric';

interface UseCanvasEventsProps {
  canvas: Canvas | null;
  onZoomChange?: (zoom: number) => void;
  onViewPortChange?: (viewPort: { x: number; y: number }) => void;
  onResize?: () => void;
}

export const useCanvasEvents = ({
  canvas,
  onZoomChange,
  onViewPortChange,
  onResize,
}: UseCanvasEventsProps) => {
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  // 使用 ref 来存储回调函数，避免依赖项变化
  const onZoomChangeRef = useRef(onZoomChange);
  const onViewPortChangeRef = useRef(onViewPortChange);
  const onResizeRef = useRef(onResize);

  // 更新 ref 值
  useEffect(() => {
    onZoomChangeRef.current = onZoomChange;
    onViewPortChangeRef.current = onViewPortChange;
    onResizeRef.current = onResize;
  }, [onZoomChange, onViewPortChange, onResize]);

  // 更新光标样式
  const updateCursor = useCallback(
    (cursor: string) => {
      if (canvas?.wrapperEl) {
        canvas.wrapperEl.style.cursor = cursor;
      }
    },
    [canvas]
  );

  // 监听画布事件 - 只在 canvas 存在时绑定
  useEffect(() => {
    if (!canvas) {
      console.log('Canvas is null, skipping event binding');
      return;
    }

    // 监听画布移动事件
    const handleCanvasMove = () => {
      const vpt = canvas.viewportTransform;
      if (vpt) {
        onViewPortChangeRef.current?.({ x: -vpt[4], y: -vpt[5] });
      }
    };

    // 监听画布缩放事件 - 直接监听滚轮，不需要Ctrl键
    const handleCanvasWheel = (opt: { e: WheelEvent | MouseEvent }) => {
      opt.e.preventDefault();
      const delta = (opt.e as WheelEvent).deltaY;
      const zoom = canvas.getZoom();
      const newZoom = Math.max(0.1, Math.min(10, zoom - delta * 0.001));

      const pointer = canvas.getPointer(opt.e);
      canvas.zoomToPoint(new Point(pointer.x, pointer.y), newZoom);

      onZoomChangeRef.current?.(newZoom);
    };

    // 监听键盘事件
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpacePressed(true);
        updateCursor('grab');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
        updateCursor('default');
      }
    };

    // 监听窗口大小变化
    const handleResize = () => {
      onResizeRef.current?.();
    };

    // 绑定画布事件
    canvas.on('mouse:move', handleCanvasMove);
    canvas.on('mouse:wheel', handleCanvasWheel);

    // 绑定全局事件（键盘和窗口大小）
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      console.log('Cleaning up canvas events');
      canvas.off('mouse:move', handleCanvasMove);
      canvas.off('mouse:wheel', handleCanvasWheel);

      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [canvas, updateCursor]);

  return {
    isSpacePressed,
  };
};
