import { formatEther } from 'viem';

export function truncateAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatEth(wei: bigint): string {
  return parseFloat(formatEther(wei)).toFixed(4);
}

export function formatCountdown(seconds: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return { days, hours, minutes, seconds: secs };
}
