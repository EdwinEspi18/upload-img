import {useState} from "react";

export function HeaderMain() {
  const [icon, setIcon] = useState("Moon");

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    setIcon((state) => (state === "Moon" ? "Sun" : "Moon"));
  }

  return (
    <header className="flex h-20 w-full items-center justify-between px-20">
      <div className="flex items-center justify-center gap-x-3">
        <img alt="Logo small" className="h-11" src="/logo-small.svg" />
        <h2 className="text-xl font-bold dark:text-white">ImageUpload</h2>
      </div>

      <button
        className="h-12 w-12 rounded-md border border-gray-200 bg-white shadow dark:border-gray-200/50 dark:bg-[#4D5562]"
        onClick={toggleTheme}
      >
        <img alt="Moon" className="mx-auto w-8 dark:text-[#E5E7EB]" src={`/${icon}_fill.svg`} />
      </button>
    </header>
  );
}
