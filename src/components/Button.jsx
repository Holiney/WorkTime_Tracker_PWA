function Button({ children }) {
  return (
    <div>
      <button className="bg-sky-800 text-white uppercase py-3 px-6 font-inherit text-xl font-bold bg-[var(--color-brand--2)] text-[var(--color-dark--1)] border-0 rounded-[5px] cursor-pointer">
        {children}
      </button>
    </div>
  );
}

export default Button;
