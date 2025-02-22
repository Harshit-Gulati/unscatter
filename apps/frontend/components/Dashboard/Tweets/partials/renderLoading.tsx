const Loader = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle
        fill="#000000"
        stroke="#000000"
        strokeWidth="15"
        r="15"
        cx="40"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.4"
        ></animate>
      </circle>
      <circle
        fill="#000000"
        stroke="#000000"
        strokeWidth="15"
        r="15"
        cx="100"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="-.2"
        ></animate>
      </circle>
      <circle
        fill="#000000"
        stroke="#000000"
        strokeWidth="15"
        r="15"
        cx="160"
        cy="65"
      >
        <animate
          attributeName="cy"
          calcMode="spline"
          dur="2"
          values="65;135;65;"
          keySplines=".5 0 .5 1;.5 0 .5 1"
          repeatCount="indefinite"
          begin="0"
        ></animate>
      </circle>
    </svg>
  );
};

export default function RenderLoading({ label }: { label: string }) {
  return (
    <div className="flex flex-col text-xl font-bold text-center h-full w-full justify-center items-center">
      <div className="w-52">
        <Loader />
      </div>
      <div>{label}</div>
    </div>
  );
}
