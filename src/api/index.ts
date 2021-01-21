import axios from "axios";
import { isRight } from "fp-ts/lib/Either";

import { ApiDataCodec } from "./codecs";
import { ApiData } from "./types";

export async function fetchData(): Promise<ApiData> {
  const url = process.env.API_URL as string;
  const response = await axios.get(url);
  const data = ApiDataCodec.decode(response.data);
  if (isRight(data)) {
    return data.right;
  }
  console.error(`Unable to parse server response`, data.left);
  throw new Error(`Unable to parse server response`);
}
