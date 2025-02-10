// function AvatarModal({ isOpen, onClose, onSelectAvatar }) {
//   if (!isOpen) return null; // Не рендеримо компонент, якщо модальне вікно закрите

//   return (
//     <div className="fixed inset-0 backdrop-blur-sm bg-black/50 flex items-center justify-center">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">Виберіть аватар</h2>
//         <div className="grid grid-cols-4 gap-4">
//           {Array.from({ length: 20 }, (_, index) => (
//             <img
//               key={index}
//               src={`/userIcons/icon${index + 1}.png`}
//               alt={`Avatar ${index + 1}`}
//               className="rounded-full h-12 w-12 border-2 border-gray-300 cursor-pointer hover:border-blue-500"
//               onClick={() => onSelectAvatar(`icon${index + 1}.png`)} // Викликаємо функцію при виборі аватара
//             />
//           ))}
//         </div>
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//           >
//             Скасувати
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AvatarModal;
import { useState } from "react";

function AvatarModal({ isOpen, onClose, onSelectAvatar }) {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSave = () => {
    if (selectedAvatar) {
      onSelectAvatar(selectedAvatar);
      onClose();
    }
  };

  const handleImageError = (event) => {
    event.target.src = "/userIcons/default-avatar.png"; // Заглушка
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-4 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Виберіть аватар</h2>
        <div className="grid grid-cols-4 gap-4 max-h-64 overflow-y-auto">
          {Array.from({ length: 20 }, (_, index) => {
            const avatar = `icon${index + 1}.png`;
            return (
              <img
                key={index}
                src={`/userIcons/${avatar}`}
                alt={`Avatar ${index + 1}`}
                className={`rounded-full h-12 w-12 border-2 cursor-pointer ${
                  selectedAvatar === avatar
                    ? "border-blue-500"
                    : "border-gray-300"
                } hover:border-blue-500`}
                onClick={() => setSelectedAvatar(avatar)}
                onError={handleImageError}
              />
            );
          })}
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Скасувати
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}

export default AvatarModal;
