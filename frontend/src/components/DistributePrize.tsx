import { useAccount } from 'wagmi';
import { usePrizeDistributed, useWinner, usePrizePool, useAllProjects } from '../hooks/useProjects';
import { useDistribute } from '../hooks/useDistribute';
import { truncateAddress, formatEth } from '../utils/formatters';

const DEADLINE = 1739404740;

export function DistributePrize() {
  const { address, isConnected } = useAccount();
  const { data: prizeDistributed } = usePrizeDistributed();
  const { data: winner } = useWinner();
  const { data: prizePool } = usePrizePool();
  const { data: projects } = useAllProjects();
  const { distribute, isPending, isConfirming, error } = useDistribute();

  const isDeadlinePassed = Math.floor(Date.now() / 1000) >= DEADLINE;
  const hasProjects = projects && projects.length > 0;

  // Don't show if deadline hasn't passed
  if (!isDeadlinePassed) {
    return null;
  }

  // Find winning project
  const winningProject = projects?.reduce((prev, current) => {
    if (!prev) return current;
    if (current.voteCount > prev.voteCount) return current;
    if (current.voteCount === prev.voteCount && current.submittedAt < prev.submittedAt) return current;
    return prev;
  }, projects[0]);

  const isWinner = address?.toLowerCase() === winningProject?.submitter.toLowerCase();

  // Prize already distributed
  if (prizeDistributed && winner) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-xl mx-auto bg-bc-card border border-bc-primary/50 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-bold text-bc-text mb-4">Competition Ended!</h2>
          <p className="text-bc-text-muted mb-2">The winner is:</p>
          <p className="text-bc-primary-light font-bold text-lg mb-2">
            {winningProject?.name || 'Unknown'}
          </p>
          <p className="text-bc-text-muted text-sm">
            by {truncateAddress(winner)}
          </p>
        </div>
      </section>
    );
  }

  // Prize not yet distributed
  return (
    <section className="py-8 px-4">
      <div className="max-w-xl mx-auto bg-bc-card border border-bc-accent/50 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-bc-text mb-4 text-center">Distribute Prize</h2>

        {!hasProjects ? (
          <p className="text-bc-text-muted text-center">No projects were submitted.</p>
        ) : (
          <>
            <div className="text-center mb-6">
              <p className="text-bc-text-muted mb-2">Leading Project:</p>
              <p className="text-bc-primary-light font-bold text-lg">{winningProject?.name}</p>
              <p className="text-bc-text-muted text-sm">
                {winningProject?.voteCount.toString()} votes
              </p>
            </div>

            <div className="bg-bc-dark/50 rounded-lg p-4 mb-6">
              <p className="text-bc-text-muted text-sm text-center mb-2">Prize Pool</p>
              <p className="text-bc-primary-light text-2xl font-bold text-center">
                {prizePool !== undefined ? formatEth(prizePool) : '0.0000'} ETH
              </p>
            </div>

            {!isWinner && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 mb-4">
                <p className="text-green-400 text-sm text-center">
                  Trigger distribution and earn 10% of the prize pool!
                </p>
              </div>
            )}

            {error && (
              <div className="bg-bc-accent/20 border border-bc-accent rounded-lg p-3 mb-4">
                <p className="text-bc-accent text-sm">{error.message}</p>
              </div>
            )}

            <button
              onClick={() => distribute()}
              disabled={!isConnected || isPending || isConfirming}
              className="w-full py-3 bg-bc-accent hover:bg-bc-accent-hover rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {!isConnected
                ? 'Connect Wallet'
                : isPending
                ? 'Confirm in Wallet...'
                : isConfirming
                ? 'Distributing...'
                : isWinner
                ? 'Claim Prize (100%)'
                : 'Distribute Prize (Earn 10%)'}
            </button>
          </>
        )}
      </div>
    </section>
  );
}
