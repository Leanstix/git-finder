import axios from "axios";

const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_PAT}`,
  },
});

export default github;
