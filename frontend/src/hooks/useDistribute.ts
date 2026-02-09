import { useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useChainId } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function useDistribute() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useChainId();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const distribute = async () => {
    // Switch to Sepolia if not already on it
    if (chainId !== sepolia.id) {
      await switchChainAsync({ chainId: sepolia.id });
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'distributePrize',
      chainId: sepolia.id,
    });
  };

  return { distribute, isPending, isConfirming, isSuccess, error, hash, reset };
}
