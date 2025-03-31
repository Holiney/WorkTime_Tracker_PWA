import GroupedByMonth from "./GroupedByMonth";
import GroupedByWeek from "./GroupedByWeek";

export default function ItemsList({ view, groupMode }) {
  return groupMode === "month" ? (
    <GroupedByMonth view={view} />
  ) : (
    <GroupedByWeek view={view} />
  );
}
