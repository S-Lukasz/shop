"use client";

import WindowContainer from "@/components/WindowContainer";
import { Context } from "@/components/ContextWrapper";
import { useContext, useEffect } from "react";

export default function About() {
  const { setFetch } = useContext(Context);

  useEffect(() => {
    setFetch(true);
  }, []);

  return (
    <WindowContainer className="m-auto mt-20 flex w-2/3 flex-col items-center gap-3 p-6 text-center sm:w-1/2">
      <p className="m-auto text-xl font-semibold">
        <span>Website created with the use of </span>
        <a
          target="_blank"
          href="https://fakestoreapi.com/"
          className=" text-blue-400 duration-300 ease-out hover:text-black motion-reduce:transform-none"
        >
          FakeStore
        </a>
        <span> API by Łukasz Surma.</span>
      </p>
      <a
        target="_blank"
        href="https://github.com/S-Lukasz"
        className="btn-primary group flex w-2/3 bg-blue-500 px-2 py-1 font-semibold text-white hover:bg-blue-100 hover:text-blue-400 sm:w-1/5"
      >
        <p className="w-full text-center">My Github</p>
      </a>
    </WindowContainer>
  );
}
