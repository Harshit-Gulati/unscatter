import { STATIC_STRINGS } from "@/utils/Constants";

export default function RenderEmpty() {
  return (
    <div className="text-center font-bold text-2xl h-full justify-center items-center">
      {STATIC_STRINGS.EMPTY_SUGGESTION}
    </div>
  );
}
