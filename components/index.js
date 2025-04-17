import { useState } from "react";
import Image from "next/image";
import UserCard from "./UserCard";
import RepoList from "./RepoList";

export default function Home() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchGitHubData = async (pageNum = 1) => {
    setLoading(true);
    setError("");
    setUser(null);
    setRepos([]);
  
    try {
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) throw new Error("User not found");
  
      const userData = await userRes.json();
      const repoRes = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=5&page=${pageNum}`
      );
      const repoData = await repoRes.json();
  
      setUser(userData);
      setRepos(repoData);
      setHasNextPage(repoData.length === 5); // Check if next page exists
    } catch (err) {
      setError(err.message);
    }
  
    setLoading(false);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      setPage(1);
      fetchGitHubData(1);
    }
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

      {user && <UserCard user={user} />}

      {repos.length > 0 && <RepoList repos={repos} />}
      <div className="max-w-xl mx-auto flex justify-between mt-4">
      {page > 1 && (
        <button
          onClick={() => {
            const newPage = page - 1;
            setPage(newPage);
            fetchGitHubData(newPage);
          }}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Previous
        </button>
      )}
      {hasNextPage && (
        <button
          onClick={() => {
            const newPage = page + 1;
            setPage(newPage);
            fetchGitHubData(newPage);
          }}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      )}
    </div>

    </main>
  );
}
