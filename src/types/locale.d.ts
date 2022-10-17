type LocaleCode = 'en' | 'ja';

type Translation = {
  readonly [key in string]:
    | Translation
    | {
        en: string;
        ja: string;
      };
};
