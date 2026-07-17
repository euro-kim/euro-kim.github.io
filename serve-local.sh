#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8080}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$ROOT_DIR/.env"
CONFIG_FILE="$ROOT_DIR/public/site-config.js"

if [ -f "$ENV_FILE" ]; then
  set -a
  # shellcheck disable=SC1090
  . "$ENV_FILE"
  set +a
fi

cat > "$CONFIG_FILE" <<CONFIG
window.SITE_LINKS = {
  githubUrl: "${SITE_GITHUB_URL:-}",
  linkedinUrl: "${SITE_LINKEDIN_URL:-}",
  emailAddress: "${SITE_EMAIL_ADDRESS:-}"
};
CONFIG

cd "$ROOT_DIR"

echo "Serving $ROOT_DIR at http://0.0.0.0:$PORT"
echo "Generated $CONFIG_FILE from .env"
echo "Open /index.html or /post.html through your remote port-forwarded URL."

python3 -m http.server "$PORT"
