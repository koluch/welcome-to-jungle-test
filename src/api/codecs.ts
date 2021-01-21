import * as t from "io-ts";

export const ApiJobCodec = t.interface({
  id: t.number,
  name: t.string,
});

export const ApiJobListCodec = t.array(ApiJobCodec);

export const ApiDataCodec = t.interface({
  jobs: ApiJobListCodec,
  name: t.string,
  // todo: websites
});

export type ApiJob = t.TypeOf<typeof ApiJobCodec>;

export type ApiJobList = t.TypeOf<typeof ApiJobListCodec>;

export type ApiData = t.TypeOf<typeof ApiDataCodec>;

// export const ImportExportCodec = new t.Type<TabList, string, string>(
//   'ImportExport',
//   TabListCodec.is,
//   (value: string, context) => {
//     let json;
//     try {
//       json = JSON.parse(value);
//     } catch (e) {
//       return t.failure(value, context, 'Input string should be a valid JSON');
//     }
//     return TabListCodec.validate(json, context);
//   },
//   (value: TabList): string => {
//     return JSON.stringify(value, null, 2);
//   },
// );
