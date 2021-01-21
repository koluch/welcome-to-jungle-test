import * as t from "io-ts";

import {
  ApiDataCodec,
  ApiJobCodec,
  ApiLanguageCodec,
  ApiLocalizedStringCodec,
} from "./codecs";

export type ApiJob = t.TypeOf<typeof ApiJobCodec>;
export type ApiData = t.TypeOf<typeof ApiDataCodec>;
export type ApiLanguage = t.TypeOf<typeof ApiLanguageCodec>;
export type ApiLocalizedString = t.TypeOf<typeof ApiLocalizedStringCodec>;
