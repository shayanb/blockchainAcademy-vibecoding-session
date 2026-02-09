import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { truncateAddress } from '../utils/formatters';

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: isSwitching } = useSwitchChain();
  const chainId = useChainId();

  const isWrongNetwork = isConnected && chainId !== sepolia.id;

  if (isConnected && isWrongNetwork) {
    return (
      <button
        onClick={() => switchChain({ chainId: sepolia.id })}
        disabled={isSwitching}
        className="px-4 py-2 bg-bc-accent hover:bg-bc-accent-hover rounded-lg text-white font-semibold transition-colors disabled:opacity-50"
      >
        {isSwitching ? 'Switching...' : 'Switch to Sepolia'}
      </button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <span className="px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-xs font-medium">
          Sepolia
        </span>
        <button
          onClick={() => disconnect()}
          className="px-4 py-2 bg-bc-card border border-bc-primary-light rounded-lg text-bc-text hover:bg-bc-primary/20 transition-colors"
        >
          {truncateAddress(address)}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isPending}
      className="px-4 py-2 bg-bc-accent hover:bg-bc-accent-hover rounded-lg text-white font-semibold transition-colors disabled:opacity-50"
    >
      {isPending ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
