// components/RepoList.js
import RepoItem from "./RepoItem";

export default function RepoList({ repos }) {
  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Repositories:</h3>
      <ul className="space-y-2">
        {repos.map((repo) => (
          <RepoItem key={repo.id} repo={repo} />
        ))}
      </ul>
    </div>
  );
}
