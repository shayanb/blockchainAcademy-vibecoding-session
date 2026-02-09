import { useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { sepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function useVote() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useChainId();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const vote = async (projectId: bigint) => {
    // Switch to Sepolia if not already on it
    if (chainId !== sepolia.id) {
      await switchChainAsync({ chainId: sepolia.id });
    }

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
