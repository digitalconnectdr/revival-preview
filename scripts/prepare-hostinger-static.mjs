import { access, copyFile, cp } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const root = process.cwd();
const output = path.join(root, "out");
const deploy = path.join(root, "deploy", "hostinger-static");
const stage = process.env.DEPLOYMENT_STAGE ?? "staging";

await access(output, constants.R_OK | constants.W_OK);
await copyFile(path.join(deploy, stage === "production" ? ".htaccess.production" : ".htaccess.preview"), path.join(output, ".htaccess"));
await cp(path.join(deploy, "api"), path.join(output, "api"), { recursive: true, force: true });
console.log(`Prepared Hostinger static output for ${stage}.`);
