const STEP_LABELS = ["Date", "Time", "Contact Info", "Review"];

type ProgressBarProps = {
  currentStep: 1 | 2 | 3 | 4;
};

export function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="mb-5">
      <div className="flex items-center">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1;
          const isDone = step < currentStep;
          const isActive = step === currentStep;
          return (
            <div key={label} className="flex flex-1 items-center last:flex-none">
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                  isDone || isActive
                    ? "bg-[#C9A227] text-[#0A0A0A]"
                    : "bg-[#E8DFC4] text-[#8A8074]"
                }`}
              >
                {isDone ? "✓" : step}
              </div>
              {step !== 4 && (
                <div
                  className={`mx-1 h-0.5 flex-1 rounded transition-colors ${
                    isDone ? "bg-[#C9A227]" : "bg-[#E8DFC4]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-xs font-semibold text-[#55504A]">
        Step {currentStep} of 4 — {STEP_LABELS[currentStep - 1]}
      </p>
    </div>
  );
}
