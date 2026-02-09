import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useSubmitProject } from '../hooks/useSubmitProject';
import { useUserProjectId } from '../hooks/useProjects';

const DEADLINE = 1739404740;

export function SubmitProject() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { address, isConnected } = useAccount();
  const { submit, isPending, isConfirming, isSuccess, error } = useSubmitProject();
  const { data: userProjectId, refetch } = useUserProjectId(address);

  const hasSubmitted = userProjectId !== undefined && userProjectId > 0n;
  const isDeadlinePassed = Math.floor(Date.now() / 1000) >= DEADLINE;

  useEffect(() => {
    if (isSuccess) {
      setName('');
      setDescription('');
      refetch();
    }
  }, [isSuccess, refetch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      submit(name.trim(), description.trim());
    }
  };

  if (hasSubmitted) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-xl mx-auto bg-bc-card border border-bc-primary/50 rounded-xl p-6 text-center">
          <p className="text-bc-primary-light font-semibold">You have already submitted a project!</p>
          <p className="text-bc-text-muted text-sm mt-2">You can vote for other projects below.</p>
        </div>
      </section>
    );
  }

  if (isDeadlinePassed) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-xl mx-auto bg-bc-card border border-bc-primary/50 rounded-xl p-6 text-center">
          <p className="text-bc-accent font-semibold">Submissions are closed!</p>
          <p className="text-bc-text-muted text-sm mt-2">The deadline has passed.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold text-bc-text mb-6 text-center">Submit Your Project</h2>

        <form onSubmit={handleSubmit} className="bg-bc-card border border-bc-primary/50 rounded-xl p-6">
          <div className="mb-4">
            <label className="block text-bc-text-muted text-sm mb-2">
              Project Name ({name.length}/100)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 100))}
              placeholder="Enter project name"
              className="w-full bg-bc-dark border border-bc-primary/30 rounded-lg px-4 py-3 text-bc-text placeholder-bc-text-muted/50 focus:outline-none focus:border-bc-primary-light"
              disabled={!isConnected || isPending || isConfirming}
            />
          </div>

          <div className="mb-6">
            <label className="block text-bc-text-muted text-sm mb-2">
              Description ({description.length}/1000)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 1000))}
              placeholder="Describe your project..."
              rows={4}
              className="w-full bg-bc-dark border border-bc-primary/30 rounded-lg px-4 py-3 text-bc-text placeholder-bc-text-muted/50 focus:outline-none focus:border-bc-primary-light resize-none"
              disabled={!isConnected || isPending || isConfirming}
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-bc-accent/20 border border-bc-accent rounded-lg">
              <p className="text-bc-accent text-sm">{error.message}</p>
            </div>
          )}

          {isSuccess && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg">
              <p className="text-green-400 text-sm">Project submitted successfully!</p>
            </div>
          )}

          <button
            type="submit"
            disabled={!isConnected || !name.trim() || !description.trim() || isPending || isConfirming}
            className="w-full py-3 bg-bc-accent hover:bg-bc-accent-hover rounded-lg text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!isConnected
              ? 'Connect Wallet to Submit'
              : isPending
              ? 'Confirm in Wallet...'
              : isConfirming
              ? 'Submitting...'
              : 'Submit Project (0.1 ETH)'}
          </button>

          <p className="text-bc-text-muted text-xs text-center mt-3">
            Submitting requires a 0.1 ETH stake that goes to the prize pool
          </p>
        </form>
      </div>
    </section>
  );
}
