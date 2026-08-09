import { access, mkdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);
const root = process.cwd();
const output = path.join(root, "out");
const dist = path.join(root, "dist");
const archive = path.join(dist, "hostinger-static.zip");
await access(output, constants.R_OK);
await mkdir(dist, { recursive: true });
if (process.platform === "win32") await run("powershell", ["-NoProfile", "-Command", `Compress-Archive -Path '${output}\\*' -DestinationPath '${archive}' -Force`]);
else await run("zip", ["-qr", archive, "."], { cwd: output });
await writeFile(path.join(dist, "hostinger-static-manifest.json"), JSON.stringify({ artifact: "hostinger-static.zip", createdAt: new Date().toISOString(), deployTarget: "hostinger-static", deploymentStage: process.env.DEPLOYMENT_STAGE ?? "staging" }, null, 2));
console.log(`Created ${archive}`);
