require("esbuild")
  .build({
    entryPoints: ["src/js/controller.js"],
    bundle: true,
    minify: true,
    sourcemap: true,
    outfile: "dist/controller.js",
  })
  .catch(() => process.exit(1));
