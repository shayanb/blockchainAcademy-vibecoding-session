import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function useDistribute() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const distribute = () => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'distributePrize',
      chainId: sepolia.id,
    });
  };

  return { distribute, isPending, isConfirming, isSuccess, error, hash, reset };
}
