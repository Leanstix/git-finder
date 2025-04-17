// pages/index.js
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGitHubData = async () => {
    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);

    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");

      const userData = await userRes.json();
      const repoRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=10`);
      const repoData = await repoRes.json();

      setUser(userData);
      setRepos(repoData);
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") fetchGitHubData();
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">GitHub User Finder</h1>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {user && (
        <div className="max-w-xl mx-auto bg-white p-4 rounded shadow mb-6">
          <div className="flex items-center gap-4">
            <img src={user.avatar_url} alt="avatar" className="w-16 h-16 rounded-full" />
            <div>
              <h2 className="text-xl font-semibold">{user.name || user.login}</h2>
              <p className="text-gray-600">{user.bio}</p>
            </div>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="max-w-xl mx-auto bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Repositories:</h3>
          <ul className="space-y-2">
            {repos.map((repo) => (
              <li key={repo.id} className="border-b pb-2">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium">
                  {repo.name}
                </a>
                <p className="text-sm text-gray-600">⭐ {repo.stargazers_count}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
