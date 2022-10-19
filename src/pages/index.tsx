import Head from 'next/head';
import Link from 'next/link';

import Layout from '../components/home/Layout';

import type { NextPage } from 'next';

const ENV = process.env.NEXT_PUBLIC_ENV;

const samples = [
  {
    label: 'M1 Mac scroll',
    href: '/samples/m1-scroll',
  },
  {
    label: 'Reflectorplanes and Bloom',
    href: '/samples/reflectorplanes-and-bloom',
  },
  {
    label: 'useIntersect and ScrollControls',
    href: '/samples/useIntersect-and-scrollcontrols',
  },
  {
    label: 'Point Wave',
    href: '/samples/point-wave',
  },
  {
    label: 'Points with simple shader',
    href: '/samples/points-with-simple-shader',
  },
  {
    label: 'Point Cloud from image',
    href: '/samples/point-cloud-from-image',
  },
  {
    label: 'Points Animation',
    href: '/samples/points-animation',
  },
  {
    label: 'Inside the Room',
    href: '/samples/inside-the-room',
  },
];

const Home: NextPage = () => {
  console.log('stage =', ENV);

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="container">
        <ul className="list-inside list-disc">
          {samples.map(info => (
            <li key={info.href}>
              <Link href={info.href}>
                <a className="text-lg font-bold text-blue-600 underline">
                  {info.label}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default Home;
