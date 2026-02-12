import { useRef, useState, useEffect } from 'react';
import type { Density } from './useDensity.js';

export interface UseContainerDensityOptions {
  compact?: number;
  relaxed?: number;
}

export function useContainerDensity<T extends HTMLElement = HTMLDivElement>(
  options: UseContainerDensityOptions = {}
): { ref: React.RefObject<T>; density: Density } {
  const { compact = 200, relaxed = 400 } = options;
  const ref = useRef<T>(null);
  const [density, setDensity] = useState<Density>('normal');

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      if (width < compact) setDensity('compact');
      else if (width > relaxed) setDensity('relaxed');
      else setDensity('normal');
    });
    
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [compact, relaxed]);

  return { ref, density };
}

export default useContainerDensity;
