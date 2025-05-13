// require("esbuild")
//   .build({
//     entryPoints: ["src/js/views"],
//     bundle: true,
//     minify: true,
//     sourcemap: true,
//     outfile: "dist/controller.js",
//   })
//   .catch(() => process.exit(1));

const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

async function build() {
  const entryDir = "./src/js"; // Replace with your directory path
  const outDir = "./dist";

  const entryPoints = fs
    .readdirSync(entryDir)
    .filter((file) => file.endsWith(".js"))
    .reduce((acc, file) => {
      const name = path.parse(file).name;
      acc[name] = path.resolve(entryDir, file);
      return acc;
    }, {});

  try {
    await esbuild.build({
      entryPoints: ["src/js/controller.js"],
      outdir: outDir,
      bundle: true,
      minify: true,
      platform: "browser",
      format: "esm",
      splitting: true,
    });
    console.log("Build successful!");
  } catch (error) {
    console.error("Build failed:", error);
  }
}
build();
