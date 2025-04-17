import RepoItem from "./RepoItem";
export default function RepoList({ repos }) {
    return (
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Repositories:</h3>
        {repos.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No repositories found.</p>
        ) : (
          <ul className="space-y-2">
            {repos.map((repo) => (
              <RepoItem key={repo.id} repo={repo} />
            ))}
          </ul>
        )}
      </div>
    );
  }
  