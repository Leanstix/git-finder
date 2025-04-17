export default function RepoList({ repos }) {
    return (
      <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Repositories:</h3>
        <ul className="space-y-2">
          {repos.map((repo) => (
            <li key={repo.id} className="border-b pb-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 font-medium"
              >
                {repo.name}
              </a>
              <p className="text-sm text-gray-600">⭐ {repo.stargazers_count}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  