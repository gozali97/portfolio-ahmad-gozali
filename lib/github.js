/**
 * GitHub contribution data.
 * Uses a free, token-less public API that mirrors the contribution graph.
 * Cached via Next.js ISR (revalidate hourly) so the build stays fast and
 * we never hammer the upstream service.
 */

/** Extract the GitHub username from a profile URL like https://github.com/gozali97 */
export function getGithubUsername(profile) {
  if (!profile?.github_url) return null
  const m = profile.github_url.match(/github\.com\/([^/?#]+)/i)
  return m ? m[1] : null
}

/**
 * Returns { total, contributions: [{ date, count, level }] } or null on failure.
 */
export async function getGithubContributions(username) {
  if (!username) return null
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { next: { revalidate: 3600 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    if (!Array.isArray(data?.contributions)) return null
    return {
      total: data.total?.lastYear ?? 0,
      contributions: data.contributions,
    }
  } catch {
    return null
  }
}
