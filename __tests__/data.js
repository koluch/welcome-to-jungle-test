import { ApiDataCodec } from "../src/api/codecs";

import ServerResponseJson from "./server_response.json";

const data = ApiDataCodec.decode(ServerResponseJson).right;

export default data;
