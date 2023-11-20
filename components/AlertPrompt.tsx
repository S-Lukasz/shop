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
        <div className="mx-auto mt-32 flex h-min w-4/5 flex-col items-center gap-6 rounded-md bg-white text-center text-lg font-semibold shadow-md xl:w-1/3">
          <p className="mt-10 xl:mx-10">{title}</p>
          <div className="mb-10 flex">
            <button
              onClick={onConfirm}
              className="btn-primary bold text-md mx-12 flex px-4 py-1 font-semibold"
            >
              {arg0}
            </button>
            <button
              onClick={onClose}
              className="btn-primary bold text-md mx-12 flex px-4 py-1 font-semibold"
            >
              {arg1}
            </button>
          </div>
        </div>
      </div>
    );

  return <></>;
}
