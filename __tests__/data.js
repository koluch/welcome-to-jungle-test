import { ApiDataCodec } from "../src/api/codecs";

import ServerResponseJson from "./server_response.json";

const data = ApiDataCodec.decode(ServerResponseJson).right;

export const techJobs = data.jobs.filter(({ department: { name }}) => name === 'Tech' )

export default data;
