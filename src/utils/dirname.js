import path from "path";
import { PassThrough } from "stream";
import { fileURLToPath } from "url";

const pathFile = fileURLToPath(import.meta.url);

const pathUtils = path.dirname(path);

const __dirname = path.resolve(pathUtils,"../../");

export default __dirname;