import { useState, useEffect, useMemo } from "react";
import debounce from "lodash/debounce";
import api from "../lib/api"; // use your axios instance
import UserCard from "./UserCard";
import RepoList from "./RepoList";

export default function Home() {
  const [search, setSearch] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUsers = async (query) => {
    if (!query) {
      setUserResults([]);
      return;
    }
    try {
      const { data } = await api.get(`/search/users?q=${query}`);
      setUserResults(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const debouncedSearch = useMemo(() => debounce(searchUsers, 500), []);
  useEffect(() => {
    debouncedSearch(search);
    return () => debouncedSearch.cancel();
  }, [search]);

  const fetchRepos = async (username, pageNum = 1) => {
    try {
      const { data } = await api.get(`/users/${username}/repos`, {
        params: { per_page: 5, page: pageNum },
      });
      setRepos(data);
      setHasNextPage(data.length === 5);
    } catch (err) {
      console.error("Repo fetch error:", err);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">GitHub User Finder</h1>
      <form onSubmit={(e) => e.preventDefault()} className="max-w-md mx-auto flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search GitHub users"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
      </form>

      {userResults.length > 0 && !selectedUser && (
        <div className="max-w-xl mx-auto mt-4 space-y-3">
          {userResults.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-4 bg-white p-3 rounded shadow cursor-pointer hover:bg-gray-50"
              onClick={async () => {
                setSearch("");
                setUserResults([]);
                setLoading(true);
                try {
                  const { data: profileData } = await api.get(`/users/${u.login}`);
                  setSelectedUser(profileData);
                  setPage(1);
                  await fetchRepos(u.login, 1);
                } catch (err) {
                  setError("Failed to load user profile");
                }
                setLoading(false);
              }}
            >
              <img src={u.avatar_url} className="w-12 h-12 rounded-full" />
              <div>
                <p className="font-medium">{u.login}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {selectedUser && (
        <>
          <UserCard user={selectedUser} />
          <RepoList repos={repos} />
          <div className="max-w-xl mx-auto flex justify-between mt-4">
            {page > 1 && (
              <button
                onClick={async () => {
                  const newPage = page - 1;
                  setPage(newPage);
                  await fetchRepos(selectedUser.login, newPage);
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Previous
              </button>
            )}
            {hasNextPage && (
              <button
                onClick={async () => {
                  const newPage = page + 1;
                  setPage(newPage);
                  await fetchRepos(selectedUser.login, newPage);
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </main>
  );
}
