export default async function handler(req, res) {
    const { username } = req.query;
  
    if (!username) return res.status(400).json({ error: "Username is required" });
  
    try {
      const githubRes = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Authorization: `token ${process.env.GITHUB_PAT}`,
          Accept: "application/vnd.github+json",
        },
      });
      const data = await githubRes.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user profile" });
    }
  }
  