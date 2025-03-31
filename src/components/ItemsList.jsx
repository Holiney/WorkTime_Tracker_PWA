import PropTypes from "prop-types";
import GroupedByMonth from "./GroupedByMonth";
import GroupedByWeek from "./GroupedByWeek";

export default function ItemsList({ view, groupMode }) {
  return groupMode === "month" ? (
    <GroupedByMonth view={view} />
  ) : (
    <GroupedByWeek view={view} />
  );
}

// ✅ Пропс валідація
ItemsList.propTypes = {
  view: PropTypes.oneOf(["paid", "unpaid"]).isRequired,
  groupMode: PropTypes.oneOf(["month", "week"]).isRequired,
};
