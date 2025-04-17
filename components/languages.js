// /pages/api/languages.js
export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) return res.status(400).json({ error: "Language URL is required" });
  
    try {
      const githubRes = await fetch(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_PAT}`, // Ensure this is being passed correctly
          Accept: "application/vnd.github+json",
        },
      });
  
      if (githubRes.status === 403) {
        return res.status(403).json({ error: "Forbidden: Check GitHub Token permissions or rate limit" });
      }
  
      const data = await githubRes.json();
      if (githubRes.ok) {
        res.status(200).json(data);
      } else {
        res.status(500).json({ error: data.message || "Failed to fetch repo languages" });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Failed to fetch repo languages" });
    }
  }
  