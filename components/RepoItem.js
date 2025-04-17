"use client";
import { useEffect, useState } from "react";

export default function RepoItem({ repo }) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const res = await fetch(repo.languages_url);
        const data = await res.json();
        setLanguages(Object.keys(data));
      } catch (error) {
        console.error("Error fetching languages:", error);
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
      {languages.length > 0 && (
        <p className="text-sm text-gray-500">Languages: {languages.join(", ")}</p>
      )}
    </li>
  );
}
