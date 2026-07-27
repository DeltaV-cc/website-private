# IntelHub UX/content enhancements — rollback

Branch: `feat/intelhub-ux-content`

## What this change set does

- Content/UX improvements across Macro, AI, Web3, Infosec (no visual redesign)
- Removes prediction markets (Polymarket panel + API + feed sources)
- Adds `?tab=` deep links, tab-scoped pulse, freshness indicator
- Fixes Arena leaderboard data shape; honest AI metric labels
- Infosec: links, overdue KEV, watchlist panel, severity filter, stale meta

## Rollback options (pick one)

### A. Revert the merge commit on `main` (preferred after merge)

```bash
git log --oneline -5   # find the merge or feature commit SHA
git revert -m 1 <merge_sha>   # if it was a merge commit
# or
git revert <feature_sha>
git push origin main
```

### B. Hard reset `main` to pre-feature (only if not shared / no other commits after)

```bash
git checkout main
git reset --hard <sha_before_feature>
git push --force-with-lease origin main   # coordinate with team
```

### C. Branch never merged — discard

```bash
git branch -D feat/intelhub-ux-content
git push origin --delete feat/intelhub-ux-content
```

### D. Surgical undo of prediction-market removal only

Re-add `PolymarketPanel` + `gamma-api.polymarket.com` fetch from git history:

```bash
git log -p -- app/intelhub/components/Web3Dashboard.tsx app/intelhub/hooks.ts
```

## Baseline SHA before this work

Recorded at branch creation (update if you rebased):

```
0a34d22ddea80ab05ba2b5ef459270f94f85da03
```

```bash
git diff 0a34d22..HEAD -- app/intelhub
```
