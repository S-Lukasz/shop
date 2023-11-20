import { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export default function WindowContainer(props: Props) {
  return (
    <div
      {...props}
      className={`${props.className} rounded-lg bg-white shadow-md`}
    >
      {props.children}
    </div>
  );
}
