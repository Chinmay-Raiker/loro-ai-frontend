export function Stepper({
  steps,
  current,
}: {
  steps: string[];
  current: number;
}) {
  return (
    <ol className="flex items-center gap-3" aria-label="Progress">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={`h-6 w-6 rounded-full grid place-items-center text-xs ${
                done
                  ? "bg-blue-600 text-white"
                  : active
                  ? "border-2 border-blue-600 text-blue-600"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </span>
            <span
              className={`text-sm ${
                active ? "text-blue-700" : "text-slate-700"
              }`}
            >
              {s}
            </span>
            {i < steps.length - 1 && (
              <span className="w-8 h-px bg-gray-300" aria-hidden />
            )}
          </li>
        );
      })}
    </ol>
  );
}
