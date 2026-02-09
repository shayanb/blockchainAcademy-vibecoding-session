import { useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { sepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function useSubmitProject() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useChainId();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const submit = async (name: string, description: string) => {
    // Switch to Sepolia if not already on it
    if (chainId !== sepolia.id) {
      await switchChainAsync({ chainId: sepolia.id });
    }

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
