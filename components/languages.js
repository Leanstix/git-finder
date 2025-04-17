export default async function handler(req, res) {
    const { url } = req.query;
  
    if (!url) return res.status(400).json({ error: "Language URL is required" });
  
    try {
      const githubRes = await fetch(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_PAT}`,
          Accept: "application/vnd.github+json",
        },
      });
      const data = await githubRes.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch repo languages" });
    }
  }
  