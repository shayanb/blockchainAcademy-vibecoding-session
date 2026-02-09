import { useAllProjects } from '../hooks/useProjects';
import { ProjectCard } from './ProjectCard';

export function ProjectList() {
  const { data: projects, isLoading, refetch } = useAllProjects();

  if (isLoading) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-bc-text-muted">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-bc-text mb-6 text-center">Projects</h2>
          <div className="bg-bc-card border border-bc-primary/50 rounded-xl p-8 text-center">
            <p className="text-bc-text-muted">No projects submitted yet. Be the first!</p>
          </div>
        </div>
      </section>
    );
  }

  // Sort by vote count (descending), then by submission time (ascending) for ties
  const sortedProjects = [...projects].sort((a, b) => {
    const voteDiff = Number(b.voteCount) - Number(a.voteCount);
    if (voteDiff !== 0) return voteDiff;
    return Number(a.submittedAt) - Number(b.submittedAt);
  });

  return (
    <section className="py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-bc-text mb-6 text-center">
          Projects ({projects.length})
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {sortedProjects.map((project, index) => (
            <div key={project.id.toString()} className="relative">
              {index === 0 && (
                <div className="absolute -top-2 -left-2 bg-bc-accent text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  #1
                </div>
              )}
              <ProjectCard project={project} onVoteSuccess={() => refetch()} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
