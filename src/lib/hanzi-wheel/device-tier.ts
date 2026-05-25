import type { DeviceTier } from './types';

export function detectDeviceTier(): DeviceTier {
  if (typeof navigator === 'undefined') return 'high';
  const gpu = (navigator as any).gpu;
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;

  if (memory <= 2 || cores <= 2) return 'low';
  if (memory >= 8 && cores >= 8 && gpu) return 'high';
  return 'medium';
}
