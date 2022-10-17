import Link from 'next/link';

import GitHubButton from '../elements/GitHubButton';
import LangButton from '../elements/LangButton';
import ThemeButton from '../elements/ThemeButton';

export default function Header() {
  return (
    <header className="container flex justify-between">
      <Link href="/">
        <a className="text-xl">Next.js</a>
      </Link>
      <nav className="flex items-center space-x-6">
        <ThemeButton className="header-btn" />
        <LangButton className="header-btn" />
        <GitHubButton className="header-btn" />
      </nav>
    </header>
  );
}
