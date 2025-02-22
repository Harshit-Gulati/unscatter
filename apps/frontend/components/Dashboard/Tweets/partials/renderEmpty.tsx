import { STATIC_STRINGS } from "@/utils/Constants";

export default function RenderEmpty() {
  return (
    <div className="flex font-bold text-center text-2xl h-full w-full justify-center items-center">
      {STATIC_STRINGS.EMPTY_SUGGESTION}
    </div>
  );
}
