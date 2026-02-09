import { useWriteContract, useWaitForTransactionReceipt, useSwitchChain, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { sepolia } from 'wagmi/chains';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

export function useSubmitProject() {
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract();
  const { switchChainAsync } = useSwitchChain();
  const { chain } = useAccount();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const submit = async (name: string, description: string) => {
    // Switch to Sepolia if wallet is on wrong chain
    if (chain?.id !== sepolia.id) {
      try {
        await switchChainAsync({ chainId: sepolia.id });
      } catch (e) {
        console.error('Failed to switch chain:', e);
        return;
      }
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
