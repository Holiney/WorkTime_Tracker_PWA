function Button({ children }) {
  return (
    <div>
      <button className="bg-sky-700 text-white uppercase py-3 px-6 font-inherit text-xl font-bold  border-0 rounded-[5px] cursor-pointer">
        {children}
      </button>
    </div>
  );
}

export default Button;
