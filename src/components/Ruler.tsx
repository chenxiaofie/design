import React from 'react';

interface RulerTick {
  position: number;
  value: number;
  isMajor: boolean;
  isMedium: boolean;
}

interface RulerProps {
  width: number;
  height: number;
  zoomLevel: number;
  viewPort: { x: number; y: number };
}

const Ruler: React.FC<RulerProps> = ({
  width,
  height,
  zoomLevel,
  viewPort,
}) => {
  /**
   * 找出离 value 最近的 segment 的倍数值
   */
  const getClosestVal = (value: number, segment: number) => {
    const n = Math.floor(value / segment);
    const left = segment * n;
    const right = segment * (n + 1);
    return value - left <= right - value ? left : right;
  };

  // 1. 计算步长 参考知乎
  const getStepByZoom = (zoomLevel: number) => {
    // 使用更平滑的步长数组，避免跳跃
    const steps = [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];

    // 添加边界检查，避免极端情况
    const clampedZoom = Math.max(0.001, Math.min(100, zoomLevel));

    // 优化基础步长计算
    const baseStep = 25 / clampedZoom; // 从 50 改为 25，更平滑

    for (let i = 0; i < steps.length; i++) {
      if (steps[i] >= baseStep) return steps[i];
    }
    return steps[0];
  };

  const step = getStepByZoom(zoomLevel);

  // 2. 计算可见范围（场景坐标）
  const startXInScene = -viewPort.x / zoomLevel;
  const endXInScene = startXInScene + width / zoomLevel;
  const startYInScene = -viewPort.y / zoomLevel;
  const endYInScene = startYInScene + height / zoomLevel;

  // 3. 计算刻度起始位置（对齐到step的倍数）
  const tickStartX = getClosestVal(startXInScene, step);
  const tickEndX = getClosestVal(endXInScene, step);
  const tickStartY = getClosestVal(startYInScene, step);
  const tickEndY = getClosestVal(endYInScene, step);

  // 4. 生成水平刻度
  const generateHorizontalTicks = (): RulerTick[] => {
    const ticks: RulerTick[] = [];

    for (let worldPos = tickStartX; worldPos <= tickEndX; worldPos += step) {
      // 转换为屏幕坐标
      const screenPos = (worldPos + viewPort.x / zoomLevel) * zoomLevel;

      // 只添加在容器范围内的刻度
      if (screenPos >= -step && screenPos <= width + step) {
        const isMajor = worldPos % (step * 5) === 0;
        const isMedium = worldPos % (step * 2) === 0 && !isMajor;

        ticks.push({
          position: screenPos,
          value: worldPos,
          isMajor,
          isMedium,
        });
      }
    }

    return ticks;
  };

  // 5. 生成垂直刻度
  const generateVerticalTicks = (): RulerTick[] => {
    const ticks: RulerTick[] = [];

    for (let worldPos = tickStartY; worldPos <= tickEndY; worldPos += step) {
      // 转换为屏幕坐标
      const screenPos = (worldPos + viewPort.y / zoomLevel) * zoomLevel;

      // 只添加在容器范围内的刻度
      if (screenPos >= -step && screenPos <= height + step) {
        const isMajor = worldPos % (step * 5) === 0;
        const isMedium = worldPos % (step * 2) === 0 && !isMajor;

        ticks.push({
          position: screenPos,
          value: worldPos,
          isMajor,
          isMedium,
        });
      }
    }

    return ticks;
  };

  const horizontalTicks = generateHorizontalTicks();
  const verticalTicks = generateVerticalTicks();

  // 6. 格式化显示值 - 优化负数显示
  const formatValue = (value: number): string => {
    // 对于负数，显示绝对值，但保持负号
    return value.toString();
  };

  return (
    <>
      <div className="bg-white h-full border-t border-black/20">
        {/* 水平刻度尺 */}
        <div className="absolute top-0 left-6 right-0 h-6 z-10 bg-white/95 border border-black/20">
          <svg width="100%" height="24" className="block">
            {horizontalTicks.map((tick, index) => (
              <g key={index}>
                <line
                  x1={tick.position}
                  y1={tick.isMajor ? 0 : tick.isMedium ? 2 : 4}
                  x2={tick.position}
                  y2={tick.isMajor ? 24 : tick.isMedium ? 16 : 20}
                  stroke={
                    tick.isMajor
                      ? 'rgba(0, 0, 0, 0.8)'
                      : tick.isMedium
                        ? 'rgba(0, 0, 0, 0.4)'
                        : 'rgba(0, 0, 0, 0.2)'
                  }
                  strokeWidth="0.5"
                />
                {tick.isMajor && tick.value !== 0 && (
                  <text
                    x={tick.position}
                    y={14}
                    textAnchor="middle"
                    fontSize="10"
                    fill="rgba(0, 0, 0, 0.8)"
                    className="select-none"
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    {formatValue(tick.value)}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>

        {/* 垂直刻度尺 */}
        <div className="absolute top-6 left-0 bottom-0 w-6 z-10 bg-white/95 border border-black/20">
          <svg width="24" height="100%" className="block">
            {verticalTicks.map((tick, index) => (
              <g key={index}>
                <line
                  x1={tick.isMajor ? 0 : tick.isMedium ? 2 : 4}
                  y1={tick.position}
                  x2={tick.isMajor ? 24 : tick.isMedium ? 16 : 20}
                  y2={tick.position}
                  stroke={
                    tick.isMajor
                      ? 'rgba(0, 0, 0, 0.8)'
                      : tick.isMedium
                        ? 'rgba(0, 0, 0, 0.4)'
                        : 'rgba(0, 0, 0, 0.2)'
                  }
                  strokeWidth="0.5"
                />
                {tick.isMajor && tick.value !== 0 && (
                  <text
                    x={12}
                    y={tick.position + 3}
                    textAnchor="middle"
                    fontSize="10"
                    fill="rgba(0, 0, 0, 0.8)"
                    className="select-none"
                    transform={`rotate(-90 12 ${tick.position + 3})`}
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                    }}
                  >
                    {formatValue(tick.value)}
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      </div>
    </>
  );
};

export default Ruler;
