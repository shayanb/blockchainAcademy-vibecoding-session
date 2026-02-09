import { useAccount, useSwitchChain } from 'wagmi';
import { sepolia } from 'wagmi/chains';

export function NetworkWarning() {
  const { isConnected, chain } = useAccount();
  const { switchChain, isPending } = useSwitchChain();

  const isWrongNetwork = isConnected && chain?.id !== sepolia.id;

  if (!isWrongNetwork) {
    return null;
  }

  return (
    <div className="bg-bc-accent/90 text-white py-3 px-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
        <span className="font-medium">
          Wrong network ({chain?.name || 'Unknown'}). Please switch to Sepolia Testnet.
        </span>
        <button
          onClick={() => switchChain({ chainId: sepolia.id })}
          disabled={isPending}
          className="px-4 py-1.5 bg-white text-bc-accent rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {isPending ? 'Switching...' : 'Switch to Sepolia'}
        </button>
      </div>
    </div>
  );
}
