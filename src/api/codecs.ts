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

export const ApiUnsafeHtmlString = t.string;

export const ApiOfficeCodec = t.interface({
  name: t.string,
});

export const ApiJobCodec = t.interface({
  id: t.number,
  name: t.string,
  contract_type: ApiLocalizedStringCodec,
  office: ApiOfficeCodec,
  description: ApiUnsafeHtmlString,
});

export const ApiDataCodec = t.interface({
  jobs: t.array(ApiJobCodec),
  name: t.string,
  // todo: websites
});
