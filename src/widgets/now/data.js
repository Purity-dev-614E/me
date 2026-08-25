// Keep this to 1-2 items max — a long list reads as scattered, not focused.

export const RightNowData = {
  sectionLabel: "04 — RIGHT NOW",
  heading1: "CURRENTLY BUILDING",
  currentlyBuildingData: [
    {
      id: "cloud-platform",
      status: "in progress",
      title: "Cloud deployment platform",
      description:
        "Building a distributed system as independent microservices — starting with the load balancer, then auth and monitoring. Learning distributed systems architecture from the ground up.",
    },
  ],
  heading2: "DEV JOURNAL",
  journalEntries: [
    {
      date: "2026-08-01",
      displayDate: "1 Aug",
      entry:
        "Started the load balancer with plain HTTP before touching raw TCP — wanted to understand routing logic before adding protocol complexity.",
    },
    {
      date: "2026-07-25",
      displayDate: "25 Jul",
      entry:
        "Decided against a monorepo for this project — wanted each service deployable on its own, closer to how it'd work in production.",
    },
  ],
  closing: "View more entries"
};

// This is your "publish" file. To add a new entry: add an object to the
// TOP of this array, commit, push, redeploy. The public site only ever
// reads this array — there's no live write access in production, so
// there's nothing to secure beyond your own repo.
//
// Keep entries specific: a decision + the reasoning beats a generic
// "learned React today" note.
