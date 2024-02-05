import {HeaderMain} from "./components/header-main";
import SectionDrag from "./components/section-drag";

function App() {
  return (
    <main className="m-auto grid min-h-screen grid-rows-[auto,1fr,auto] px-4 dark:bg-[#121826]">
      <HeaderMain />
      <div className="max-w-screen h-0.5 bg-gray-200 dark:bg-gray-300/50" />
      <SectionDrag />
      <footer className="text-center leading-[4rem] opacity-70 dark:text-white">
        © {new Date().getFullYear()} Image-Uploader
      </footer>
    </main>
  );
}

export default App;
