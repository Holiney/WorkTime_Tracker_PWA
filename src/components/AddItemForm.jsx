import { useState, forwardRef } from "react";
import { useUser } from "../contexts/UserContext";
import { useWorkItems } from "../contexts/WorkItemsContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

export default function AddItemForm() {
  const { user } = useUser();
  const { dispatch } = useWorkItems();

  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState("8");
  const [description, setDescription] = useState("");

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !hours) return;

    const formattedDate = date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    });

    const newItem = {
      id: crypto.randomUUID(),
      date: formattedDate,
      hours: Number(hours),
      description,
      rate: Number(user.rate || user.hourlyRate || 10),
      isPaid: false,
    };

    dispatch({ type: "add", payload: newItem });

    setHours("8");
    setDescription("");
  };

  const CustomDateButton = forwardRef(({ value, onClick }, ref) => (
    <button
      type="button"
      onClick={onClick}
      ref={ref}
      className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-sm"
    >
      📅 {value}
    </button>
  ));

  CustomDateButton.displayName = "CustomDateButton";

  CustomDateButton.propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row bg-white rounded-xl p-4 mt-2 shadow-md gap-2 font-bold"
    >
      <div className="flex justify-between items-center gap-2 border-b-2 p-2 border-blue-100">
        <DatePicker
          selected={date}
          onChange={(selectedDate) => {
            setDate(selectedDate);
            setIsDatePickerOpen(false); // закриваємо після вибору
          }}
          open={isDatePickerOpen}
          onClickOutside={() => setIsDatePickerOpen(false)}
          dateFormat="dd.MM.yyyy"
          customInput={<CustomDateButton />}
        />

        <select
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="input border border-gray-300 rounded-lg px-2 py-2 text-sm"
        >
          {[...Array(15)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} год
            </option>
          ))}
        </select>
      </div>

      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Замітка..."
        className="w-full rounded-lg border-b border-gray-300 px-2 py-1"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow"
      >
        Додати
      </button>
    </form>
  );
}
