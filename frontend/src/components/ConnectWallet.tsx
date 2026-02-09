import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { truncateAddress } from '../utils/formatters';

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <button
        onClick={() => disconnect()}
        className="px-4 py-2 bg-bc-card border border-bc-primary-light rounded-lg text-bc-text hover:bg-bc-primary/20 transition-colors"
      >
        {truncateAddress(address)}
      </button>
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
