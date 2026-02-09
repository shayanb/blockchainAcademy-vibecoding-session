import { usePrizePool } from '../hooks/useProjects';
import { formatEth } from '../utils/formatters';
import { CountdownTimer } from './CountdownTimer';

export function Hero() {
  const { data: prizePool } = usePrizePool();

  return (
    <section className="text-center py-12 px-4">
      <div className="inline-block px-4 py-1 bg-bc-accent rounded-full text-white text-sm font-semibold mb-4">
        Nova SBE Project Competition
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-bc-text mb-4">
        Blockchain Academy
      </h1>
      <p className="text-bc-text-muted text-lg md:text-xl mb-8 max-w-2xl mx-auto">
        Submit your project, vote for your favorites, and win the prize pool!
      </p>

      <div className="mb-8">
        <CountdownTimer />
      </div>

      <div className="bg-bc-card border border-bc-primary/50 rounded-xl p-6 inline-block">
        <p className="text-bc-text-muted text-sm mb-1">Total Prize Pool</p>
        <p className="text-bc-primary-light text-3xl font-bold">
          {prizePool !== undefined ? formatEth(prizePool) : '0.0000'} ETH
        </p>
      </div>
    </section>
  );
}
