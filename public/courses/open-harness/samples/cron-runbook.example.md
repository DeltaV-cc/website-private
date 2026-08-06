# cron-runbook.md (example)

## Job
- Schedule: weekdays 08:00 local
- Delivery: Telegram (or file `~/notes/daily-ai.md` if offline)

## Amnesia prompt (paste into cron job)
You are a fresh session. You do not remember prior runs.
1. Fetch three short AI headlines from trusted sources you can reach.
2. Write a 120-word summary with source titles only (no invented stats).
3. Deliver to the configured channel OR write absolute path ~/notes/daily-ai.md.
4. On failure: one-line error to the same channel; do not invent success.

## Success
- Summary delivered; no empty body.

## Failure
- Network or tool error → notify human; do not retry infinitely.
