import { useMemo } from "react";

import { useCurrentLanguage } from "../helpers/hooks";

import { DEFAULT_LANGUAGE } from "./constants";
import { ApiLocalizedString } from "./types";

export type StringLocalization = (
  localizedString: ApiLocalizedString
) => string;

export function useStringLocalization(): StringLocalization {
  const lang = useCurrentLanguage();
  return useMemo(
    () => (localizedString: ApiLocalizedString): string => {
      let value: string | undefined = localizedString[lang];
      if (value === undefined) {
        value = localizedString[DEFAULT_LANGUAGE];
      }
      if (value === undefined) {
        console.error(`Unable to get localized string value`, localizedString);
        return "...";
      }
      return value;
    },
    [lang]
  );
}
