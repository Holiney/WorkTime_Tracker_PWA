import { useState } from "react";
import { useWorkItems } from "../contexts/WorkItemsContext";

import AddItemForm from "../components/AddItemForm";
import ItemsList from "../components/ItemsList";
import SummaryPanel from "../components/SummaryPanel";

export default function Dashboard() {
  const { summary } = useWorkItems();
  const [view, setView] = useState("unpaid");

  const [groupMode, setGroupMode] = useState(() => {
    return localStorage.getItem("group-mode") || "month";
  });

  const hasForm = view === "unpaid";
  const headerHeight = hasForm ? 220 : 20;

  return (
    <div className="bg-[#e9eff6] min-h-screen flex flex-col relative">
      {hasForm && (
        <div className="fixed top-[64px] left-0 right-0 z-10 bg-[#e9eff6] px-4 py-3 border-b border-gray-200">
          <div className="max-w-md mx-auto">
            <AddItemForm />
          </div>
        </div>
      )}

      <main
        className="flex-1 overflow-y-auto px-4"
        style={{ paddingTop: `${headerHeight}px`, paddingBottom: "110px" }}
      >
        <div className="max-w-md mx-auto">
          <ItemsList view={view} groupMode={groupMode} />
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white px-4 py-2 border-t border-gray-200">
        <div className="max-w-md mx-auto">
          <SummaryPanel
            view={view}
            setView={setView}
            hours={summary[view].hours}
            total={summary[view].total}
            groupMode={groupMode}
            setGroupMode={setGroupMode}
          />
        </div>
      </div>
    </div>
  );
}
