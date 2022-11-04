import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';

export default function Header() {
  return (
    <header className="container flex justify-between">
      <Link href="/" className="text-xl">
        Next.js
      </Link>
      <nav className="flex items-center space-x-6">
        <a
          href="https://github.com/derodero24"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillGithub className="cursor-pointer text-xl duration-100 hover:opacity-75" />
        </a>
      </nav>
    </header>
  );
}
