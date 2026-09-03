import { spawn } from "node:child_process";
import process from "node:process";

process.env.INBOX_KEY ||= "local-inbox-test";

const server = spawn(process.execPath, ["server.js"], {
  stdio: "inherit",
  env: process.env,
});
const vite = spawn(
  process.execPath,
  ["node_modules/vite/bin/vite.js", "--host", "--port", "3001"],
  {
    stdio: "inherit",
    env: process.env,
  },
);

const stop = () => {
  server.kill();
  vite.kill();
};

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
server.on("exit", (code) => {
  if (code && code !== 130) vite.kill();
});
