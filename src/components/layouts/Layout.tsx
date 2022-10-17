import Footer from '../sections/Footer';
import Header from '../sections/Header';

import type { ReactNode } from 'react';

export default function Layout(props: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">{props.children}</main>
      <Footer />
    </div>
  );
}
