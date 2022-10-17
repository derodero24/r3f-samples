import { useRouter } from 'next/router';

import translations from '../translations';

interface NestedObject {
  [x: string]: string | NestedObject;
}

/** ネストされた値を"/"区切り文字列で取り出す */
function pick(obj: NestedObject, key: string) {
  return key
    .split('/')
    .reduce<string | NestedObject>(
      (o, c) => (typeof o === 'object' ? o[c] ?? '' : o),
      obj,
    );
}

export const useLocale = () => {
  const router = useRouter();

  const currentLocale = (router.locale ??
    router.defaultLocale ??
    'en') as LocaleCode;

  const t = (key: string) =>
    pick(translations, `${key}/${currentLocale}`) as string;

  return { ...router, locale: currentLocale, t };
};
