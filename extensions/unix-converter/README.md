# Unix Converter

Convert UNIX timestamps and date strings directly in Raycast.

## Commands

- **Timestamp to Date**
  - Input: UNIX timestamp (seconds or milliseconds)
  - Output: UTC, local time, ISO 8601, normalized seconds/milliseconds
  - Actions: copy value, copy full output
- **Date to Timestamp**
  - Input: parseable date string (for example `2026-03-02T14:30:00-05:00`)
  - Output: UNIX seconds/milliseconds, UTC, local time, ISO 8601
  - Actions: copy value, copy full output
- **Current Unix Timestamp**
  - Input: none (live command)
  - Output: current UNIX seconds/milliseconds, UTC, local time, ISO 8601
  - Actions: copy value, copy full output

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publish

```bash
npm run publish
```
