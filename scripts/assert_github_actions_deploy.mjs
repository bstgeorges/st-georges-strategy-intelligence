if (process.env.GITHUB_ACTIONS !== "true") {
  throw new Error("Production Cloudflare deployment is restricted to the Site release (Cloudflare) GitHub Actions workflow. Push the reviewed package to main or dispatch that workflow; do not run Wrangler production deploys locally.");
}

console.log("GitHub Actions deployment context confirmed.");
