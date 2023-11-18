import { ReactNode } from "react";

interface Prop {
  title: ReactNode;
  arg0: string;
  arg1: string;
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function AlertPrompt({
  title,
  arg0,
  arg1,
  show,
  onConfirm,
  onClose,
}: Prop) {
  if (show)
    return (
      <div className="fixed z-30 flex h-full w-full bg-black/30 backdrop-blur-sm">
        <div className="mx-auto mt-32 flex h-min w-1/3 flex-col items-center gap-6 rounded-md bg-white text-center text-lg font-semibold shadow-md">
          <p className="mx-10 mt-10">{title}</p>
          <div className="mb-10 flex">
            <button
              onClick={onConfirm}
              className="bold text-md mx-12 flex rounded-lg bg-blue-500 px-4 py-1 text-center font-semibold text-white 
        shadow-md transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
            >
              {arg0}
            </button>
            <button
              onClick={onClose}
              className="bold text-md mx-12 flex rounded-lg bg-blue-500 px-4 py-1 text-center font-semibold text-white 
        shadow-md transition-all duration-300 ease-out hover:scale-[1.1] hover:bg-white hover:text-blue-500 motion-reduce:transform-none"
            >
              {arg1}
            </button>
          </div>
        </div>
      </div>
    );

  return <></>;
}
