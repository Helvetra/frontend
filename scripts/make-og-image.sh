#!/usr/bin/env bash
#
# Generate a 1200x630 Open Graph image for a news article from a source
# photo, applying Helvetra branding (Swiss red top bar + helvetra.ch
# wordmark). Output is a letterboxed JPEG suitable for og:image /
# twitter:image.
#
# Usage:
#   scripts/make-og-image.sh <source-image> <output-path>
#
# Example:
#   scripts/make-og-image.sh \
#     public/img/news/uphill-2026/responsible-data-practices.jpg \
#     public/img/news/uphill-2026/og.jpg
#
# Requires ImageMagick 7 (the `magick` command). On macOS:
#   brew install imagemagick
#
# Wire the generated image into the article's useHead as og:image +
# twitter:image. See app/pages/news/apertus-at-uphill-conf-2026.vue
# for the wiring pattern.

set -euo pipefail

# ---- arg parsing ------------------------------------------------------

if [ "$#" -ne 2 ]; then
    cat <<USAGE >&2
Usage: $0 <source-image> <output-path>

Generates a 1200x630 Helvetra-branded Open Graph image.

Arguments:
  source-image   Path to the photo/slide to feature (any common format).
  output-path    Where to save the resulting JPEG. Directory is created
                 if it doesn't exist. Recommended: og.jpg under the
                 article's image folder, e.g.
                 public/img/news/<slug>/og.jpg

Example:
  $0 photo.jpg public/img/news/2026-07-launch/og.jpg
USAGE
    exit 2
fi

src="$1"
dst="$2"

# ---- preflight checks -------------------------------------------------

if ! command -v magick >/dev/null 2>&1; then
    echo "ImageMagick (\`magick\`) is required but not on PATH." >&2
    echo "Install with: brew install imagemagick   (macOS)" >&2
    exit 1
fi

if [ ! -f "$src" ]; then
    echo "Source image not found: $src" >&2
    exit 1
fi

mkdir -p "$(dirname "$dst")"

# ---- branding constants -----------------------------------------------
# Matches the visual treatment used for the first article. Change these
# in one place and every future OG image follows.

CANVAS_W=1200
CANVAS_H=630
INNER_W=1100      # image fits inside this width
INNER_H=540       # leaves margin for the red bar and bottom wordmark
RED='#DA291C'     # Helvetra Swiss red (same as Tailwind swiss.red)
RED_BAR_H=8
WORDMARK_COLOR='#737373'   # Tailwind neutral-500
WORDMARK_FONT='Helvetica'
WORDMARK_SIZE=26
WORDMARK_PAD='+28+22'      # offset from the southeast corner

# ---- compose ----------------------------------------------------------
# Pipeline:
#   1. Start with a 1200x630 white canvas.
#   2. Resize the source to fit within 1100x540 (preserves aspect, no crop).
#   3. Composite the resized source onto the canvas, centered (offset +10
#      vertically so the visible image isn't pushed up against the red bar).
#   4. Draw the red bar across the very top.
#   5. Annotate "helvetra.ch" in the bottom-right corner.

magick \
    -size "${CANVAS_W}x${CANVAS_H}" xc:white \
    \( "$src" -resize "${INNER_W}x${INNER_H}" \) \
        -gravity center -geometry +0+10 -composite \
    -fill "$RED" -draw "rectangle 0,0 ${CANVAS_W},${RED_BAR_H}" \
    -fill "$WORDMARK_COLOR" \
    -font "$WORDMARK_FONT" -pointsize "$WORDMARK_SIZE" \
    -gravity southeast -annotate "$WORDMARK_PAD" 'helvetra.ch' \
    "$dst"

# ---- summary ----------------------------------------------------------

bytes=$(stat -f '%z' "$dst" 2>/dev/null || stat -c '%s' "$dst")
printf '✔ wrote %s (%d bytes, 1200x630)\n' "$dst" "$bytes"
