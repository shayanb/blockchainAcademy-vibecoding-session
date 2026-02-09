import { useAccount } from 'wagmi';
import { truncateAddress } from '../utils/formatters';
import { useVote } from '../hooks/useVote';
import { useHasVoted } from '../hooks/useProjects';
import type { Project } from '../hooks/useProjects';

const DEADLINE = 1739404740;

interface ProjectCardProps {
  project: Project;
  onVoteSuccess: () => void;
}

export function ProjectCard({ project, onVoteSuccess }: ProjectCardProps) {
  const { address, isConnected } = useAccount();
  const { vote, isPending, isConfirming, isSuccess, error } = useVote();
  const { data: hasVoted, refetch: refetchHasVoted } = useHasVoted(address, project.id);

  const isDeadlinePassed = Math.floor(Date.now() / 1000) >= DEADLINE;
  const isOwnProject = address?.toLowerCase() === project.submitter.toLowerCase();

  const handleVote = () => {
    vote(project.id);
  };

  if (isSuccess) {
    refetchHasVoted();
    onVoteSuccess();
  }

  return (
    <div className="bg-bc-card border border-bc-primary/50 rounded-xl p-6 flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-bc-text font-bold text-lg line-clamp-1">{project.name}</h3>
        <div className="flex items-center gap-1 bg-bc-primary/30 px-3 py-1 rounded-full">
          <span className="text-bc-primary-light font-bold">{project.voteCount.toString()}</span>
          <span className="text-bc-text-muted text-sm">votes</span>
        </div>
      </div>

      <p className="text-bc-text-muted text-sm mb-4 line-clamp-3 flex-grow">
        {project.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-bc-primary/20">
        <span className="text-bc-text-muted text-xs">
          by {truncateAddress(project.submitter)}
          {isOwnProject && <span className="text-bc-primary-light ml-1">(You)</span>}
        </span>

        {!isDeadlinePassed && !hasVoted && !isOwnProject && (
          <button
            onClick={handleVote}
            disabled={!isConnected || isPending || isConfirming}
            className="px-4 py-2 bg-bc-accent hover:bg-bc-accent-hover rounded-lg text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!isConnected
              ? 'Connect'
              : isPending
              ? 'Confirm...'
              : isConfirming
              ? 'Voting...'
              : 'Vote (0.01 ETH)'}
          </button>
        )}

        {hasVoted && (
          <span className="text-bc-primary-light text-sm font-semibold">Voted!</span>
        )}

        {isOwnProject && !hasVoted && (
          <span className="text-bc-text-muted text-sm">Your project</span>
        )}
      </div>

      {error && (
        <p className="text-bc-accent text-xs mt-2">{error.message}</p>
      )}
    </div>
  );
}
