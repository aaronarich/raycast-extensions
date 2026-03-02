import { Action, ActionPanel, List } from "@raycast/api";
import { useState } from "react";
import { formatLocal, formatUtc, parseUnixTimestamp, toUnixMilliseconds, toUnixSeconds } from "./lib/converters";

function CopyActions(props: { value: string; fullOutput?: string }) {
  const { value, fullOutput } = props;

  return (
    <ActionPanel>
      <Action.CopyToClipboard title="Copy Value" content={value} />
      {fullOutput ? <Action.CopyToClipboard title="Copy Full Output" content={fullOutput} /> : null}
    </ActionPanel>
  );
}

export default function Command() {
  const [input, setInput] = useState("");
  const timestamp = input.trim();

  if (!timestamp) {
    return (
      <List searchBarPlaceholder="Type a UNIX timestamp (e.g. 1710096610)" searchText={input} onSearchTextChange={setInput}>
        <List.EmptyView title="Enter a UNIX timestamp" description="Type seconds or milliseconds in the search bar." />
      </List>
    );
  }

  const date = parseUnixTimestamp(timestamp);

  if (!date) {
    return (
      <List searchBarPlaceholder="Type a UNIX timestamp" searchText={input} onSearchTextChange={setInput}>
        <List.EmptyView title="Invalid timestamp" description="Try seconds (e.g. 1710096610) or milliseconds." />
      </List>
    );
  }

  const utc = formatUtc(date);
  const local = formatLocal(date);
  const iso = date.toISOString();
  const seconds = toUnixSeconds(date);
  const milliseconds = toUnixMilliseconds(date);
  const fullOutput = [
    `Input: ${timestamp}`,
    `UTC: ${utc}`,
    `Local: ${local}`,
    `ISO: ${iso}`,
    `UNIX seconds: ${seconds}`,
    `UNIX milliseconds: ${milliseconds}`,
  ].join("\n");

  return (
    <List searchBarPlaceholder="Type a UNIX timestamp" searchText={input} onSearchTextChange={setInput}>
      <List.Section title="Date Output">
        <List.Item title="UTC" subtitle={utc} actions={<CopyActions value={utc} fullOutput={fullOutput} />} />
        <List.Item title="Local" subtitle={local} actions={<CopyActions value={local} fullOutput={fullOutput} />} />
        <List.Item title="ISO 8601" subtitle={iso} actions={<CopyActions value={iso} fullOutput={fullOutput} />} />
      </List.Section>
      <List.Section title="Normalized Timestamp">
        <List.Item title="UNIX Seconds" subtitle={seconds} actions={<CopyActions value={seconds} fullOutput={fullOutput} />} />
        <List.Item
          title="UNIX Milliseconds"
          subtitle={milliseconds}
          actions={<CopyActions value={milliseconds} fullOutput={fullOutput} />}
        />
      </List.Section>
    </List>
  );
}
