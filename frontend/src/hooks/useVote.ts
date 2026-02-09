import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { sepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function useVote() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const vote = (projectId: bigint) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'vote',
      args: [projectId],
      value: parseEther('0.01'),
      chainId: sepolia.id,
    });
  };

  return { vote, isPending, isConfirming, isSuccess, error, hash, reset };
}
