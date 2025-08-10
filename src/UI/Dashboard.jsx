import React, { useState, useReducer, createContext, useContext } from "react";

// Контекст для налаштувань
const SettingsContext = createContext();

// Переклади
const translations = {
  uk: {
    appName: "WorkTime Pro",
    greeting: "Вітаю",
    baseRate: "Базова ставка",
    newEntry: "Новий запис",
    hourlyWork: "Погодинна робота",
    fixedPayment: "Фіксований платіж",
    date: "Дата",
    hours: "Години",
    amount: "Сума",
    description: "Опис",
    hourlyPlaceholder: "Що робили сьогодні...",
    fixedPlaceholder: "За що отримуєте платіж...",
    amountToReceive: "Сума до отримання",
    addWorkTime: "Додати робочий час",
    addPayment: "Додати платіж",
    editing: "Редагування",
    cancel: "Скасувати",
    save: "Зберегти",
    unpaid: "Неоплачені",
    paid: "Оплачені",
    records: "записів",
    months: "Місяці",
    weeks: "Тижні",
    hourly: "Погодинно",
    fixed: "Фіксовано",
    deleteConfirm: "Видалити цей запис назавжди?",
    noUnpaidRecords: "Час почати працювати!",
    noPaidRecords: "Ще немає оплачених записів",
    noUnpaidDesc: "Додайте свій перший запис і почніть відстежувати доходи",
    noPaidDesc: "Позначте записи як оплачені щоб вони з'явилися тут",
    settings: "Налаштування",
    language: "Мова",
    hourlyRate: "Погодинна ставка",
    enterAmount: "Введіть суму",
    name: "Ім'я",
    avatar: "Аватар",
    profile: "Профіль",
    preview: "Попередній перегляд",
  },
  en: {
    appName: "WorkTime Pro",
    greeting: "Hello",
    baseRate: "Base rate",
    newEntry: "New entry",
    hourlyWork: "Hourly work",
    fixedPayment: "Fixed payment",
    date: "Date",
    hours: "Hours",
    amount: "Amount",
    description: "Description",
    hourlyPlaceholder: "What did you work on today...",
    fixedPlaceholder: "What is this payment for...",
    amountToReceive: "Amount to receive",
    addWorkTime: "Add work time",
    addPayment: "Add payment",
    editing: "Editing",
    cancel: "Cancel",
    save: "Save",
    unpaid: "Unpaid",
    paid: "Paid",
    records: "records",
    months: "Months",
    weeks: "Weeks",
    hourly: "Hourly",
    fixed: "Fixed",
    deleteConfirm: "Delete this record permanently?",
    noUnpaidRecords: "Time to start working!",
    noPaidRecords: "No paid records yet",
    noUnpaidDesc: "Add your first entry and start tracking income",
    noPaidDesc: "Mark records as paid for them to appear here",
    settings: "Settings",
    language: "Language",
    hourlyRate: "Hourly rate",
    enterAmount: "Enter amount",
    name: "Name",
    avatar: "Avatar",
    profile: "Profile",
    preview: "Preview",
  },
  nl: {
    appName: "WorkTime Pro",
    greeting: "Hallo",
    baseRate: "Basistarief",
    newEntry: "Nieuwe invoer",
    hourlyWork: "Uurwerk",
    fixedPayment: "Vaste betaling",
    date: "Datum",
    hours: "Uren",
    amount: "Bedrag",
    description: "Beschrijving",
    hourlyPlaceholder: "Waar heb je vandaag aan gewerkt...",
    fixedPlaceholder: "Waarvoor is deze betaling...",
    amountToReceive: "Te ontvangen bedrag",
    addWorkTime: "Werktijd toevoegen",
    addPayment: "Betaling toevoegen",
    editing: "Bewerken",
    cancel: "Annuleren",
    save: "Opslaan",
    unpaid: "Onbetaald",
    paid: "Betaald",
    records: "records",
    months: "Maanden",
    weeks: "Weken",
    hourly: "Per uur",
    fixed: "Vast",
    deleteConfirm: "Dit record permanent verwijderen?",
    noUnpaidRecords: "Tijd om te gaan werken!",
    noPaidRecords: "Nog geen betaalde records",
    noUnpaidDesc:
      "Voeg je eerste invoer toe en begin met het bijhouden van inkomsten",
    noPaidDesc: "Markeer records als betaald om ze hier te laten verschijnen",
    settings: "Instellingen",
    language: "Taal",
    hourlyRate: "Uurtarief",
    enterAmount: "Voer bedrag in",
    name: "Naam",
    avatar: "Avatar",
    profile: "Profiel",
    preview: "Voorbeeld",
  },
};

// Провайдер налаштувань
const SettingsProvider = ({ children }) => {
  const [language, setLanguage] = useState("uk");
  const [hourlyRate, setHourlyRate] = useState(15);
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("icon2.png");

  // Ініціалізація імені
  React.useEffect(() => {
    if (!userName) {
      const defaultNames = {
        uk: "Олександр",
        en: "Alexander",
        nl: "Alexander",
      };
      setUserName(defaultNames[language]);
    }
  }, [language, userName]);

  return (
    <SettingsContext.Provider
      value={{
        language,
        setLanguage,
        hourlyRate,
        setHourlyRate,
        userName,
        setUserName,
        userAvatar,
        setUserAvatar,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

// Хук для налаштувань
const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};

// Модал налаштувань
const SettingsModal = ({ isOpen, onClose }) => {
  const {
    language,
    setLanguage,
    hourlyRate,
    setHourlyRate,
    userName,
    setUserName,
    userAvatar,
    setUserAvatar,
  } = useSettings();

  const [tempRate, setTempRate] = useState(hourlyRate);
  const [tempName, setTempName] = useState(userName);
  const [tempAvatar, setTempAvatar] = useState(userAvatar);

  React.useEffect(() => {
    if (isOpen) {
      setTempRate(hourlyRate);
      setTempName(userName);
      setTempAvatar(userAvatar);
    }
  }, [isOpen, hourlyRate, userName, userAvatar]);

  if (!isOpen) return null;

  const handleSave = () => {
    setHourlyRate(tempRate);
    setUserName(tempName);
    setUserAvatar(tempAvatar);
    onClose();
  };

  const avatarOptions = [
    "icon1.png",
    "icon2.png",
    "icon3.png",
    "icon4.png",
    "icon5.png",
    "icon6.png",
    "icon7.png",
    "icon8.png",
  ];

  const t = translations[language];

  const getProfileLabel = () => {
    if (language === "uk") return "Профіль";
    if (language === "en") return "Profile";
    return "Profiel";
  };

  const getAvatarLabel = () => {
    if (language === "uk") return "Аватар";
    return "Avatar";
  };

  const getNameLabel = () => {
    if (language === "uk") return "Ім'я";
    if (language === "en") return "Name";
    return "Naam";
  };

  const getNamePlaceholder = () => {
    if (language === "uk") return "Введіть ваше ім'я";
    if (language === "en") return "Enter your name";
    return "Voer je naam in";
  };

  const getPreviewLabel = () => {
    if (language === "uk") return "Попередній перегляд";
    if (language === "en") return "Preview";
    return "Voorbeeld";
  };

  const getHourUnit = () => {
    if (language === "uk") return "год";
    if (language === "en") return "hr";
    return "uur";
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-6 border border-purple-500/20 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white">⚙️</span>
            </div>
            <h3 className="text-white font-semibold text-lg">{t.settings}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white transition-colors text-xl"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Профіль */}
          <div className="bg-slate-800/30 rounded-2xl p-4 border border-purple-500/20">
            <h4 className="text-purple-300 font-medium mb-4 flex items-center">
              <span className="mr-2">👤</span>
              {getProfileLabel()}
            </h4>

            {/* Аватар */}
            <div className="space-y-3 mb-4">
              <label className="text-purple-300 text-sm font-medium">
                {getAvatarLabel()}
              </label>
              <div className="grid grid-cols-4 gap-3">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setTempAvatar(avatar)}
                    className={`relative w-16 h-16 rounded-2xl overflow-hidden transition-all duration-200 ${
                      tempAvatar === avatar
                        ? "ring-4 ring-purple-500 scale-110"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={`/userIcons/${avatar}`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
                            <rect width="64" height="64" fill="#6366f1"/>
                            <circle cx="32" cy="24" r="8" fill="white"/>
                            <path d="M16 48c0-8.8 7.2-16 16-16s16 7.2 16 16" fill="white"/>
                          </svg>
                        `)}`;
                      }}
                    />
                    {tempAvatar === avatar && (
                      <div className="absolute inset-0 bg-purple-500/20 flex items-center justify-center">
                        <span className="text-white text-xl">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Ім'я */}
            <div className="space-y-2">
              <label className="text-purple-300 text-sm font-medium">
                {getNameLabel()}
              </label>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full bg-slate-800/70 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                placeholder={getNamePlaceholder()}
              />
            </div>
          </div>

          {/* Мова */}
          <div className="space-y-3">
            <label className="text-purple-300 text-sm font-medium flex items-center">
              <span className="mr-2">🌍</span>
              {t.language}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { code: "uk", name: "🇺🇦 Українська", shortName: "UA" },
                { code: "en", name: "🇬🇧 English", shortName: "EN" },
                { code: "nl", name: "🇳🇱 Nederlands", shortName: "NL" },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    language === lang.code
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                      : "bg-slate-800/50 text-purple-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <div className="text-lg mb-1">{lang.name.split(" ")[0]}</div>
                  <div className="text-xs">{lang.shortName}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Ставка */}
          <div className="space-y-3">
            <label className="text-purple-300 text-sm font-medium flex items-center">
              <span className="mr-2">💰</span>
              {t.hourlyRate}
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={tempRate}
                onChange={(e) => setTempRate(Number(e.target.value))}
                className="flex-1 bg-slate-800/70 border border-purple-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                min="1"
                step="0.5"
              />
              <span className="text-purple-300 font-semibold">
                €/{getHourUnit()}
              </span>
            </div>
          </div>

          {/* Попередній перегляд */}
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4">
            <h5 className="text-purple-300 text-sm font-medium mb-3">
              {getPreviewLabel()}
            </h5>
            <div className="flex items-center space-x-3">
              <img
                src={`/userIcons/${tempAvatar}`}
                alt="Avatar preview"
                className="w-12 h-12 rounded-2xl border-2 border-purple-400"
                onError={(e) => {
                  e.target.src = `data:image/svg+xml;base64,${btoa(`
                    <svg width="48" height="48" xmlns="http://www.w3.org/2000/svg">
                      <rect width="48" height="48" fill="#6366f1"/>
                      <circle cx="24" cy="18" r="6" fill="white"/>
                      <path d="M12 36c0-6.6 5.4-12 12-12s12 5.4 12 12" fill="white"/>
                    </svg>
                  `)}`;
                }}
              />
              <div>
                <div className="text-white font-semibold">{tempName}</div>
                <div className="text-purple-300 text-sm">
                  {tempRate}€/{getHourUnit()}
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки */}
          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-3 rounded-xl transition-colors duration-200 font-medium"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              {t.save}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Редюсер
const workItemsReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((item) => item.id !== action.payload);
    case "toggle_paid":
      return state.map((item) =>
        item.id === action.payload ? { ...item, isPaid: !item.isPaid } : item
      );
    case "edit":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      );
    default:
      return state;
  }
};

// Початкові дані
const initialWorkItems = [
  {
    id: "1",
    date: "05.08",
    hours: 8,
    rate: 15,
    description: "Розробка нових компонентів",
    isPaid: false,
    paymentType: "hourly",
  },
  {
    id: "2",
    date: "06.08",
    hours: 6,
    rate: 15,
    description: "Тестування та виправлення багів",
    isPaid: false,
    paymentType: "hourly",
  },
  {
    id: "3",
    date: "07.08",
    hours: 0,
    rate: 250,
    description: "Бонус за додаткові матеріали",
    isPaid: true,
    paymentType: "fixed",
    fixedAmount: 250,
  },
];

// Хук користувача
const useUser = () => {
  const { userName, hourlyRate, userAvatar } = useSettings();
  return {
    user: {
      name: userName,
      hourlyRate: hourlyRate,
      avatar: userAvatar,
    },
  };
};

// Форма додавання
const AddItemForm = ({ onAdd, user }) => {
  const { language } = useSettings();
  const t = translations[language];

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [hours, setHours] = useState("8");
  const [fixedAmount, setFixedAmount] = useState("100");
  const [description, setDescription] = useState("");
  const [paymentType, setPaymentType] = useState("hourly");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !date ||
      (paymentType === "hourly" && !hours) ||
      (paymentType === "fixed" && !fixedAmount)
    )
      return;

    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
    });

    const newItem = {
      id: crypto.randomUUID(),
      date: formattedDate,
      hours: paymentType === "hourly" ? Number(hours) : 0,
      description,
      rate: paymentType === "hourly" ? user.hourlyRate : Number(fixedAmount),
      isPaid: false,
      paymentType,
      fixedAmount: paymentType === "fixed" ? Number(fixedAmount) : null,
    };

    onAdd(newItem);
    setHours("8");
    setFixedAmount("100");
    setDescription("");
  };

  const calculateTotal = () => {
    if (paymentType === "hourly") {
      return hours * user.hourlyRate;
    } else {
      return Number(fixedAmount) || 0;
    }
  };

  const getHourUnit = () => {
    if (language === "uk") return "год";
    if (language === "en") return "hrs";
    return "uur";
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl p-5 mb-4 shadow-xl border border-purple-500/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/8 to-pink-600/8 animate-pulse"></div>

      <div className="relative z-10">
        <div className="flex items-center mb-5">
          <div className="w-7 h-7 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mr-3">
            <span className="text-white font-bold">+</span>
          </div>
          <h3 className="text-white font-semibold">{t.newEntry}</h3>
        </div>

        <div className="flex bg-slate-800/40 rounded-2xl p-0.5 mb-5 backdrop-blur-sm">
          <button
            onClick={() => setPaymentType("hourly")}
            className={`flex-1 py-3 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              paymentType === "hourly"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                : "text-purple-300 hover:text-white"
            }`}
          >
            ⏱️ {t.hourlyWork}
          </button>
          <button
            onClick={() => setPaymentType("fixed")}
            className={`flex-1 py-3 px-3 rounded-xl text-sm font-medium transition-all duration-300 ${
              paymentType === "fixed"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
                : "text-purple-300 hover:text-white"
            }`}
          >
            💎 {t.fixedPayment}
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-purple-300 text-xs font-medium">
                {t.date}
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-800/60 border border-purple-500/30 rounded-xl px-3 py-2.5 text-white text-sm placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 transition-all duration-200"
              />
            </div>

            {paymentType === "hourly" ? (
              <div className="space-y-2">
                <label className="text-purple-300 text-xs font-medium">
                  {t.hours}
                </label>
                <select
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-full bg-slate-800/60 border border-purple-500/30 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 transition-all duration-200 appearance-none cursor-pointer"
                >
                  {[...Array(15)].map((_, i) => (
                    <option key={i} value={i + 1} className="bg-slate-800">
                      {i + 1} {getHourUnit()}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-purple-300 text-xs font-medium">
                  {t.amount}
                </label>
                <input
                  type="number"
                  value={fixedAmount}
                  onChange={(e) => setFixedAmount(e.target.value)}
                  placeholder={t.enterAmount}
                  className="w-full bg-slate-800/60 border border-emerald-500/30 rounded-xl px-3 py-2.5 text-white text-sm placeholder-emerald-300 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/20 transition-all duration-200"
                  min="0"
                  step="0.01"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-purple-300 text-xs font-medium">
              {t.description}
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                paymentType === "hourly"
                  ? t.hourlyPlaceholder
                  : t.fixedPlaceholder
              }
              className="w-full bg-slate-800/60 border border-purple-500/30 rounded-xl px-3 py-2.5 text-white text-sm placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/20 transition-all duration-200"
            />
          </div>

          <div
            className={`p-3 rounded-xl border ${
              paymentType === "hourly"
                ? "bg-purple-500/10 border-purple-500/30"
                : "bg-emerald-500/10 border-emerald-500/30"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-white/70 text-xs">
                {t.amountToReceive}:
              </span>
              <span
                className={`font-bold text-lg ${
                  paymentType === "hourly"
                    ? "text-purple-400"
                    : "text-emerald-400"
                }`}
              >
                {calculateTotal()}€
              </span>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full py-3 rounded-xl font-semibold text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] ${
              paymentType === "hourly"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
            }`}
          >
            <span className="mr-2">✨</span>
            {paymentType === "hourly" ? t.addWorkTime : t.addPayment}
          </button>
        </div>
      </div>
    </div>
  );
};

// Компонент елемента
const WorkItem = ({ item, onRemove, onTogglePaid, onEdit }) => {
  const { language } = useSettings();
  const t = translations[language];

  const [isEditing, setIsEditing] = useState(false);
  const [editHours, setEditHours] = useState(item.hours);
  const [editDescription, setEditDescription] = useState(item.description);
  const [editFixedAmount, setEditFixedAmount] = useState(
    item.fixedAmount || 100
  );

  const getDayOfWeek = (dateString) => {
    const days = {
      uk: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      nl: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
    };
    const currentYear = new Date().getFullYear();
    const date = new Date(
      `${dateString}.${currentYear}`.split(".").reverse().join("-")
    );
    return days[language][date.getDay()];
  };

  const getHourUnit = () => {
    if (language === "uk") return "год";
    if (language === "en") return "hrs";
    return "uur";
  };

  const handleSaveEdit = () => {
    if (item.paymentType === "hourly") {
      onEdit(item.id, {
        hours: editHours,
        description: editDescription,
      });
    } else {
      onEdit(item.id, {
        fixedAmount: editFixedAmount,
        rate: editFixedAmount,
        description: editDescription,
      });
    }
    setIsEditing(false);
  };

  const total =
    item.paymentType === "fixed"
      ? item.fixedAmount || item.rate
      : item.hours * item.rate;

  if (isEditing) {
    return (
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 mb-4 border border-yellow-500/50 shadow-xl">
        <div className="space-y-4">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-sm">✏️</span>
            </div>
            <span className="text-white font-medium">{t.editing}</span>
          </div>

          {item.paymentType === "hourly" ? (
            <div className="flex gap-3 items-center">
              <select
                value={editHours}
                onChange={(e) => setEditHours(Number(e.target.value))}
                className="bg-slate-700 border border-purple-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              >
                {[...Array(15)].map((_, i) => (
                  <option key={i} value={i + 1} className="bg-slate-700">
                    {i + 1} {getHourUnit()}
                  </option>
                ))}
              </select>
              <span className="text-purple-400 font-semibold">
                = {editHours * item.rate}€
              </span>
            </div>
          ) : (
            <div className="flex gap-3 items-center">
              <input
                type="number"
                value={editFixedAmount}
                onChange={(e) => setEditFixedAmount(Number(e.target.value))}
                className="bg-slate-700 border border-emerald-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                placeholder={t.amount}
                min="0"
                step="0.01"
              />
              <span className="text-emerald-400 font-semibold">€</span>
            </div>
          )}

          <input
            type="text"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-400"
            placeholder={t.description}
          />

          <div className="flex gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-2 px-4 rounded-xl transition-colors duration-200"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSaveEdit}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2 px-4 rounded-xl transition-all duration-200"
            >
              {t.save}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-gradient-to-r ${
        item.isPaid
          ? "from-green-900/50 to-emerald-900/50 border-green-500/30"
          : item.paymentType === "hourly"
          ? "from-slate-800 to-purple-900/50 border-purple-500/20"
          : "from-slate-800 to-emerald-900/50 border-emerald-500/20"
      } rounded-2xl p-4 mb-3 border shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] overflow-hidden`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${
          item.isPaid
            ? "bg-gradient-to-b from-green-400 to-emerald-400"
            : item.paymentType === "hourly"
            ? "bg-gradient-to-b from-purple-400 to-pink-400"
            : "bg-gradient-to-b from-emerald-400 to-teal-400"
        }`}
      ></div>

      <div className="flex items-center justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onTogglePaid(item.id)}
            className={`mt-1 w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg ${
              item.isPaid
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white transform rotate-12"
                : "bg-slate-700 text-slate-400 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:scale-110"
            }`}
          >
            {item.isPaid ? "💰" : "⏳"}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-white font-bold">{item.date}</span>
              <span className="text-purple-300 text-xs font-medium bg-purple-500/20 px-2 py-1 rounded-lg">
                {getDayOfWeek(item.date)}
              </span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.paymentType === "hourly"
                    ? "bg-purple-500/20 text-purple-300"
                    : "bg-emerald-500/20 text-emerald-300"
                }`}
              >
                {item.paymentType === "hourly"
                  ? `⏱️ ${t.hourly}`
                  : `💎 ${t.fixed}`}
              </span>
            </div>

            <div className="mb-2">
              <span
                className={`text-xl font-bold ${
                  item.isPaid ? "text-green-400" : "text-white"
                }`}
              >
                {total}€
              </span>
              {item.paymentType === "hourly" && (
                <span className="text-purple-300 text-xs ml-2">
                  ({item.hours} {getHourUnit()} × {item.rate}€)
                </span>
              )}
            </div>

            {item.description && (
              <p className="text-slate-300 text-xs italic bg-slate-800/30 px-2 py-1 rounded-lg truncate">
                "{item.description}"
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 bg-blue-500/20 hover:bg-blue-500 text-blue-400 hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
            title={t.editing}
          >
            ✏️
          </button>

          <button
            onClick={() => onRemove(item.id)}
            className="p-2 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all duration-200 hover:scale-110"
            title="Видалити"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

// Навігаційна панель
const NavigationPanel = ({ items, view, setView, groupMode, setGroupMode }) => {
  const { language } = useSettings();
  const t = translations[language];

  const filteredItems = items.filter(
    (item) => item.isPaid === (view === "paid")
  );
  const totalHours = filteredItems.reduce(
    (sum, item) => sum + (item.paymentType === "hourly" ? item.hours : 0),
    0
  );
  const totalAmount = filteredItems.reduce((sum, item) => {
    return (
      sum +
      (item.paymentType === "fixed"
        ? item.fixedAmount || item.rate
        : item.hours * item.rate)
    );
  }, 0);

  const hourlyCount = filteredItems.filter(
    (item) => item.paymentType === "hourly"
  ).length;
  const fixedCount = filteredItems.filter(
    (item) => item.paymentType === "fixed"
  ).length;

  return (
    <div className="bg-gradient-to-r from-slate-900 to-purple-900 rounded-3xl p-5 shadow-xl border border-purple-500/20 relative overflow-hidden mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>

      <div className="relative z-10">
        <div className="text-center mb-5">
          <div className="text-3xl font-bold text-white mb-2">
            {totalAmount}€
          </div>
          <div className="text-purple-300 text-xs">
            {totalHours > 0 && `${totalHours} ${t.hours.toLowerCase()} • `}
            {hourlyCount > 0 && `${hourlyCount} ${t.hourly.toLowerCase()}`}
            {hourlyCount > 0 && fixedCount > 0 && " • "}
            {fixedCount > 0 && `${fixedCount} ${t.fixed.toLowerCase()}`}
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <div className="bg-slate-800/40 rounded-2xl p-0.5">
            <button
              onClick={() => setGroupMode("month")}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                groupMode === "month"
                  ? "bg-purple-500 text-white"
                  : "text-purple-300 hover:text-white"
              }`}
            >
              📅 {t.months}
            </button>
            <button
              onClick={() => setGroupMode("week")}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                groupMode === "week"
                  ? "bg-purple-500 text-white"
                  : "text-purple-300 hover:text-white"
              }`}
            >
              📊 {t.weeks}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setView("unpaid")}
            className={`p-3 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
              view === "unpaid"
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                : "bg-slate-800/40 text-slate-300 hover:bg-slate-700/40"
            }`}
          >
            <div className="text-xl mb-1">⏳</div>
            <div className="font-semibold text-sm">{t.unpaid}</div>
            <div className="text-xs opacity-80">
              {items.filter((item) => !item.isPaid).length} {t.records}
            </div>
          </button>

          <button
            onClick={() => setView("paid")}
            className={`p-3 rounded-2xl text-center transition-all duration-300 transform hover:scale-105 ${
              view === "paid"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                : "bg-slate-800/40 text-slate-300 hover:bg-slate-700/40"
            }`}
          >
            <div className="text-xl mb-1">💰</div>
            <div className="font-semibold text-sm">{t.paid}</div>
            <div className="text-xs opacity-80">
              {items.filter((item) => item.isPaid).length} {t.records}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// Головний Dashboard
const Dashboard = () => {
  const { language } = useSettings();
  const { user } = useUser();
  const t = translations[language];

  const [workItems, dispatch] = useReducer(workItemsReducer, initialWorkItems);
  const [view, setView] = useState("unpaid");
  const [groupMode, setGroupMode] = useState("month");
  const [showSettings, setShowSettings] = useState(false);

  const handleAddItem = (newItem) => {
    dispatch({ type: "add", payload: newItem });
  };

  const handleRemoveItem = (id) => {
    if (window.confirm(t.deleteConfirm)) {
      dispatch({ type: "remove", payload: id });
    }
  };

  const handleTogglePaid = (id) => {
    dispatch({ type: "toggle_paid", payload: id });
  };

  const handleEditItem = (id, updates) => {
    dispatch({ type: "edit", payload: { id, updates } });
  };

  const filteredItems = workItems.filter(
    (item) => item.isPaid === (view === "paid")
  );

  const getHourUnit = () => {
    if (language === "uk") return "год";
    if (language === "en") return "hr";
    return "uur";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto p-6">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mr-3 shadow-lg">
              <span className="text-xl">💼</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
                {t.appName}
              </h1>
              <p className="text-purple-300 text-sm mt-1">
                {t.greeting}, {user.name}! {t.baseRate}: {user.hourlyRate}€/
                {getHourUnit()}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSettings(true)}
            className="p-3 bg-slate-800/40 hover:bg-slate-700/60 text-purple-300 hover:text-white rounded-2xl transition-all duration-200 hover:scale-110 shadow-lg backdrop-blur-sm"
            title={t.settings}
          >
            <span className="text-xl">⚙️</span>
          </button>
        </div>

        {view === "unpaid" && <AddItemForm onAdd={handleAddItem} user={user} />}

        <NavigationPanel
          items={workItems}
          view={view}
          setView={setView}
          groupMode={groupMode}
          setGroupMode={setGroupMode}
        />

        <div className="mt-6">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">
                {view === "paid" ? "💰" : "📝"}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {view === "paid" ? t.noPaidRecords : t.noUnpaidRecords}
              </h3>
              <p className="text-purple-300">
                {view === "paid" ? t.noPaidDesc : t.noUnpaidDesc}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <WorkItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemoveItem}
                  onTogglePaid={handleTogglePaid}
                  onEdit={handleEditItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};

export default function ImprovedDashboard() {
  return (
    <SettingsProvider>
      <Dashboard />
    </SettingsProvider>
  );
}
