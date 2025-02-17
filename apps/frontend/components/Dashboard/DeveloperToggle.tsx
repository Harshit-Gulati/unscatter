import { STATIC_STRINGS } from "@/utils/Constants";
import { Dispatch, SetStateAction } from "react";

export default function ({
  isDevMode,
  setDevMode,
}: {
  isDevMode: boolean;
  setDevMode: Dispatch<SetStateAction<boolean>>;
}) {
  const handleToggle = () => {
    setDevMode((prev) => !prev);
  };
  return (
    <label className="inline-flex items-center cursor-pointer m-2">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={handleToggle}
        checked={isDevMode}
      />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
      <span className="ms-3 text-black font-semibold">
        {STATIC_STRINGS.DEV_MODE}
      </span>
    </label>
  );
}
