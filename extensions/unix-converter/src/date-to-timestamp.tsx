import { Action, ActionPanel, List } from "@raycast/api";
import { useState } from "react";
import { formatLocal, formatUtc, parseDateInput, toUnixMilliseconds, toUnixSeconds } from "./lib/converters";

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
  const dateText = input.trim();

  if (!dateText) {
    return (
      <List
        searchBarPlaceholder="Type a date (e.g. 2026-03-02T14:30:00-05:00)"
        searchText={input}
        onSearchTextChange={setInput}
      >
        <List.EmptyView title="Enter a date" description="Type any parseable date in the search bar." />
      </List>
    );
  }

  const date = parseDateInput(dateText);

  if (!date) {
    return (
      <List searchBarPlaceholder="Type a date" searchText={input} onSearchTextChange={setInput}>
        <List.EmptyView
          title="Invalid date"
          description="Use a parseable date such as 2026-03-02T14:30:00-05:00 or March 2, 2026 2:30 PM."
        />
      </List>
    );
  }

  const seconds = toUnixSeconds(date);
  const milliseconds = toUnixMilliseconds(date);
  const utc = formatUtc(date);
  const local = formatLocal(date);
  const iso = date.toISOString();
  const fullOutput = [
    `Input: ${dateText}`,
    `UNIX seconds: ${seconds}`,
    `UNIX milliseconds: ${milliseconds}`,
    `UTC: ${utc}`,
    `Local: ${local}`,
    `ISO: ${iso}`,
  ].join("\n");

  return (
    <List searchBarPlaceholder="Type a date" searchText={input} onSearchTextChange={setInput}>
      <List.Section title="Timestamp Output">
        <List.Item title="UNIX Seconds" subtitle={seconds} actions={<CopyActions value={seconds} fullOutput={fullOutput} />} />
        <List.Item
          title="UNIX Milliseconds"
          subtitle={milliseconds}
          actions={<CopyActions value={milliseconds} fullOutput={fullOutput} />}
        />
      </List.Section>
      <List.Section title="Resolved Date">
        <List.Item title="UTC" subtitle={utc} actions={<CopyActions value={utc} fullOutput={fullOutput} />} />
        <List.Item title="Local" subtitle={local} actions={<CopyActions value={local} fullOutput={fullOutput} />} />
        <List.Item title="ISO 8601" subtitle={iso} actions={<CopyActions value={iso} fullOutput={fullOutput} />} />
      </List.Section>
    </List>
  );
}
