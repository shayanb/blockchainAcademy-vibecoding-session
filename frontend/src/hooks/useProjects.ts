import { useReadContract, useReadContracts } from 'wagmi';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export interface Project {
  id: bigint;
  submitter: `0x${string}`;
  name: string;
  description: string;
  voteCount: bigint;
  submittedAt: bigint;
}

export function useAllProjects() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllProjects',
  });
}

export function usePrizePool() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTotalPrizePool',
  });
}

export function useTimeRemaining() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTimeRemaining',
  });
}

export function usePrizeDistributed() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'prizeDistributed',
  });
}

export function useWinner() {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'winner',
  });
}

export function useUserProjectId(address: `0x${string}` | undefined) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getUserProjectId',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
}

export function useHasVoted(userAddress: `0x${string}` | undefined, projectId: bigint) {
  return useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'hasUserVotedForProject',
    args: userAddress ? [userAddress, projectId] : undefined,
    query: {
      enabled: !!userAddress,
    },
  });
}

export function useContractData() {
  return useReadContracts({
    contracts: [
      {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getAllProjects',
      },
      {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getTotalPrizePool',
      },
      {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getTimeRemaining',
      },
      {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'prizeDistributed',
      },
      {
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'winner',
      },
    ],
  });
}
