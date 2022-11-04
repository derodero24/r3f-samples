import { IoMdArrowUp } from 'react-icons/io';

import type { RefObject } from 'react';

interface Props {
  topRef: RefObject<HTMLDivElement>;
}

export default function BackToTop({ topRef }: Props) {
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    // window.scrollTo(0, 0);
  };

  return (
    <a
      className="absolute bottom-8 right-8 p-2 rounded-full text-lg bg-blue-500 text-white"
      onClick={scrollToTop}
    >
      <IoMdArrowUp />
    </a>
  );
}
