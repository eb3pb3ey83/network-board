import { useEffect, useRef } from 'react';
interface BarChart {
  isBarChart: boolean;
}
export const useChartBackground = (matches: boolean, { isBarChart }: BarChart) => {
  const svgRef = useRef<SVGElement>(null);
  const isDraw = useRef(false);
  useEffect(() => {
    if (svgRef.current && !isDraw.current) {
      isDraw.current = true;
      const svg = svgRef.current;
      const children = svg.children;
      const clippathIndex = isBarChart ? children.length - 1 : children.length - 2;
      const clippath = children[clippathIndex];
      const rect = clippath.children[0];
      const x = rect.getAttribute('x') as string;
      const width = rect.getAttribute('width') as string;
      const svgWidth = +x + +width;
      const b = svg.querySelector('g[class*=directionY]') as Element;
      const yElement = [...b.querySelectorAll('g')];
      yElement.forEach((item, index) => {
        if (index === 0) return;

        const transform = item.getAttribute('transform') as string;
        const points = transform.match(/translate\((.*), (.*)\)/) as RegExpMatchArray;
        const y = points[points.length - 1];
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', `M60 ${y} H${svgWidth}`);
        path.setAttribute('stroke', '#ddd');
        path.setAttribute('stroke-dasharray', '5 2');
        svg.insertBefore(path, svg.children[0]);
      });

      return () => {
        svgRef.current?.querySelectorAll('path').forEach((item) => {
          const parentNode = item.parentNode as Element;
          parentNode?.tagName === 'svg' && parentNode.removeChild(item);
        });
        isDraw.current = false;
      };
    }
  }, [matches, isBarChart]);

  return { svgRef };
};
