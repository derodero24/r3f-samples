import Link from 'next/link';

import GitHubButton from '../elements/GitHubButton';

export default function Header() {
  return (
    <header className="container flex justify-between">
      <Link href="/">
        <a className="text-2xl font-bold text-gray-800">
          React-Three-Fibar samples
        </a>
      </Link>
      <nav className="flex items-center space-x-6">
        <GitHubButton className="header-btn" />
      </nav>
    </header>
  );
}
