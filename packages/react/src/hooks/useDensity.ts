import { useContext, createContext } from 'react';

export type Density = 'compact' | 'normal' | 'relaxed';

export interface DensityContextValue {
  density: Density;
}

export const DensityContext = createContext<DensityContextValue>({ density: 'normal' });

export function useDensity(): Density {
  const { density } = useContext(DensityContext);
  return density;
}

export default useDensity;
