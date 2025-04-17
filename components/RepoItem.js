// components/RepoItem.js
import axios from "axios";
import { useEffect, useState } from "react";

export default function RepoItem({ repo }) {
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await axios.get("/languages", {
          params: { url: repo.languages_url },
        });
        setLanguages(Object.keys(res.data));
      } catch (error) {
        console.error("Error fetching languages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [repo.languages_url]);

  return (
    <li className="border-b pb-2">
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 font-medium"
      >
        {repo.name}
      </a>
      <p className="text-sm text-gray-600">⭐ {repo.stargazers_count}</p>
      {loading ? (
        <div className="flex items-center gap-2 text-sm text-gray-400 italic">
          <span className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></span>
          Loading languages...
        </div>
      ) : languages.length > 0 ? (
        <p className="text-sm text-gray-500">Languages: {languages.join(", ")}</p>
      ) : (
        <p className="text-sm text-gray-400">No languages found</p>
      )}
    </li>
  );
}
