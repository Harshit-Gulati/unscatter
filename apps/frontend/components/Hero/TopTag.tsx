import { STATIC_STRINGS } from "@/utils/Constants";

export default function () {
  return (
    <span className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium bg-gray-100 rounded-full animate-fade-in">
      <span className="mr-2 text-gray-600">{STATIC_STRINGS.INTRO}</span>
      <span className="text-gray-400">{STATIC_STRINGS.BETA}</span>
    </span>
  );
}
