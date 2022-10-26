import Link from 'next/link';

import GitHubButton from './GitHubButton';

import type { ReactNode } from 'react';

export default function Layout(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex justify-between">
        <Link href="/" className="text-2xl font-bold">
          React-Three-Fibar samples
        </Link>
        <nav className="flex items-center space-x-6">
          <GitHubButton className="header-btn" />
        </nav>
      </header>
      <main className="grow">{props.children}</main>
      <footer className="py-2 text-center">
        &copy; {new Date().getFullYear()} derodero24
      </footer>
    </div>
  );
}
