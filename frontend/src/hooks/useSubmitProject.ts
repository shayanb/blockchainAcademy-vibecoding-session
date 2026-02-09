import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { sepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function useSubmitProject() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const submit = (name: string, description: string) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'submitProject',
      args: [name, description],
      value: parseEther('0.1'),
      chainId: sepolia.id,
    });
  };

  return { submit, isPending, isConfirming, isSuccess, error, hash, reset };
}
