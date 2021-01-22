import DOMPurify from "dompurify";
import { either } from "fp-ts/Either";
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

export const ApiWebsiteCodec = t.interface({
  kind: t.string,
  reference: t.string,
  root_url: ApiUrlCodec,
});

export const ApiWebsiteReference = t.interface({
  url: ApiUrlCodec,
  website_reference: t.string,
});

export const ApiDateCodec = new t.Type<Date, string, unknown>(
  "ApiDate",
  (value): value is Date => value instanceof Date,
  (value: unknown, context) => {
    return either.chain(t.string.validate(value, context), (s) => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(value, context) : t.success(d);
    });
  },
  (str) => str.toISOString()
);

export const ApiOfficeCodec = t.interface({
  id: t.number,
  address: t.string,
  city: t.string,
  country: ApiLocalizedStringCodec,
  district: t.string,
  name: t.string,
  zip_code: t.string,
});

export const ApiDepartmentCodec = t.interface({
  id: t.number,
  name: t.string,
});

export const ApiJobCodec = t.interface({
  id: t.number,
  name: t.string,
  contract_type: ApiLocalizedStringCodec,
  office: ApiOfficeCodec,
  department: ApiDepartmentCodec,
  description: ApiUnsafeHtmlStringCodec,
  recruitment_process: ApiUnsafeHtmlStringCodec,
  published_at: ApiDateCodec,
  websites_urls: t.array(ApiWebsiteReference),
});

export const ApiDataCodec = t.interface({
  jobs: t.array(ApiJobCodec),
  name: t.string,
  websites: t.array(ApiWebsiteCodec),
});
