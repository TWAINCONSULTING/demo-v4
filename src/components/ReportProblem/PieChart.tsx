import React, { useState } from 'react';

interface PieChartProps {
  data: Array<{
    type: string;
    count: number;
    color: string;
  }>;
  size?: number;
}

export function PieChart({ data, size = 128 }: PieChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = data.reduce((sum, item) => sum + item.count, 0);
  let currentAngle = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((item, i) => {
        const angle = (item.count / total) * 360;
        const x1 = Math.cos((currentAngle * Math.PI) / 180) * (size/2) + (size/2);
        const y1 = Math.sin((currentAngle * Math.PI) / 180) * (size/2) + (size/2);
        const x2 = Math.cos(((currentAngle + angle) * Math.PI) / 180) * (size/2) + (size/2);
        const y2 = Math.sin(((currentAngle + angle) * Math.PI) / 180) * (size/2) + (size/2);
        
        const path = `
          M ${size/2} ${size/2}
          L ${x1} ${y1}
          A ${size/2} ${size/2} 0 ${angle > 180 ? 1 : 0} 1 ${x2} ${y2}
          Z
        `;

        const midAngle = currentAngle + angle / 2;
        const tooltipX = Math.cos((midAngle * Math.PI) / 180) * (size/3) + (size/2);
        const tooltipY = Math.sin((midAngle * Math.PI) / 180) * (size/3) + (size/2);

        currentAngle += angle;

        return (
          <g key={i}>
            <path
              d={path}
              fill={item.color}
              className="transition-all duration-300"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{ cursor: 'pointer' }}
            />
            {hoveredIndex === i && (
              <g>
                <rect
                  x={tooltipX - 40}
                  y={tooltipY - 15}
                  width="80"
                  height="30"
                  rx="4"
                  fill="white"
                  stroke={item.color}
                  strokeWidth="1"
                />
                <text
                  x={tooltipX}
                  y={tooltipY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-sm font-medium"
                  fill={item.color}
                >
                  {item.type}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}