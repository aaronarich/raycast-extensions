import { Action, ActionPanel, List } from "@raycast/api";
import { useEffect, useMemo, useState } from "react";
import { formatLocal, formatUtc } from "./lib/converters";

function CopyActions(props: { value: string; fullOutput: string }) {
  const { value, fullOutput } = props;

  return (
    <ActionPanel>
      <Action.CopyToClipboard title="Copy Value" content={value} />
      <Action.CopyToClipboard title="Copy Full Output" content={fullOutput} />
    </ActionPanel>
  );
}

export default function Command() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = Math.floor(now.getTime() / 1000).toString();
  const milliseconds = now.getTime().toString();
  const iso = now.toISOString();
  const utc = formatUtc(now);
  const local = formatLocal(now);

  const fullOutput = useMemo(
    () =>
      [
        `UNIX seconds: ${seconds}`,
        `UNIX milliseconds: ${milliseconds}`,
        `UTC: ${utc}`,
        `Local: ${local}`,
        `ISO: ${iso}`,
      ].join("\n"),
    [seconds, milliseconds, utc, local, iso],
  );

  return (
    <List searchBarPlaceholder="Current UNIX timestamp updates every second">
      <List.Section title="Current Timestamp">
        <List.Item title="UNIX Seconds" subtitle={seconds} actions={<CopyActions value={seconds} fullOutput={fullOutput} />} />
        <List.Item
          title="UNIX Milliseconds"
          subtitle={milliseconds}
          actions={<CopyActions value={milliseconds} fullOutput={fullOutput} />}
        />
      </List.Section>
      <List.Section title="Current Date">
        <List.Item title="UTC" subtitle={utc} actions={<CopyActions value={utc} fullOutput={fullOutput} />} />
        <List.Item title="Local" subtitle={local} actions={<CopyActions value={local} fullOutput={fullOutput} />} />
        <List.Item title="ISO 8601" subtitle={iso} actions={<CopyActions value={iso} fullOutput={fullOutput} />} />
      </List.Section>
    </List>
  );
}
