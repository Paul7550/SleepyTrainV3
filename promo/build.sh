#!/usr/bin/env bash
# Renders the Sleepy Train promo: GSAP timeline -> PNG frames -> H.264 mp4.
set -euo pipefail
cd "$(dirname "$0")"

FPS="${FPS:-60}"
OUT="sleepy-train-promo.mp4"

echo "==> rendering frames"
FPS="$FPS" node render.mjs

echo "==> encoding $OUT"
ffmpeg -y -loglevel error \
  -framerate "$FPS" -i frames/%05d.png \
  -c:v libx264 -crf 18 -preset slow \
  -pix_fmt yuv420p -movflags +faststart \
  -r "$FPS" "$OUT"

echo "==> done"
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,nb_frames,codec_name,pix_fmt \
  -show_entries format=duration -of default=noprint_wrappers=1 "$OUT"
