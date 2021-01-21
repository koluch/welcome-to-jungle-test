import DOMPurify from "dompurify";
import * as t from "io-ts";

export const ApiLanguageCodec = t.union([
  t.literal("cs"),
  t.literal("en"),
  t.literal("es"),
  t.literal("fr"),
  t.literal("sk"),
]);

export const ApiLocalizedStringCodec = t.record(
  ApiLanguageCodec,
  t.union([t.string, t.undefined])
);

export interface ApiSafeHtml {
  original: string;
  safe: string;
}

export const ApiUnsafeHtmlStringCodec = new t.Type<
  ApiSafeHtml,
  string,
  unknown
>(
  "ImportExport",
  (value: unknown): value is ApiSafeHtml => {
    if (typeof value !== "object") {
      return false;
    }
    if (value == null) {
      return false;
    }
    if (!("original" in value) || !("safe" in value)) {
      return false;
    }
    return true;
  },
  (value: unknown, context) => {
    if (typeof value !== "string") {
      return t.failure(value, context, "Input should be a string");
    }
    return t.success({
      original: value,
      safe: DOMPurify.sanitize(value),
    });
  },
  (value: ApiSafeHtml): string => {
    return value.original;
  }
);

export const ApiUrlCodec = t.string;

export const ApiOfficeCodec = t.interface({
  id: t.number,
  address: t.string,
  city: t.string,
  country: ApiLocalizedStringCodec,
  district: t.string,
  name: t.string,
  zip_code: t.string,
});

export const ApiJobCodec = t.interface({
  id: t.number,
  name: t.string,
  contract_type: ApiLocalizedStringCodec,
  office: ApiOfficeCodec,
  description: ApiUnsafeHtmlStringCodec,
  recruitment_process: ApiUnsafeHtmlStringCodec,
});

export const ApiWebsiteCodec = t.interface({
  kind: t.string,
  reference: t.string,
  root_url: ApiUrlCodec,
});

export const ApiDataCodec = t.interface({
  jobs: t.array(ApiJobCodec),
  name: t.string,
  websites: t.array(ApiWebsiteCodec),
});
