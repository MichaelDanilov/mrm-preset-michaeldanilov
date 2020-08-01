const { json, lines, packageJson, install } = require("mrm-core");

function task() {
  const packages = [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint",
    "eslint-config-airbnb-base",
    "eslint-config-prettier",
    "eslint-plugin-import",
    "eslint-plugin-prettier",
    "npm-run-all",
  ];

  // .eslintrc
  const eslintrc = json(".eslintrc.json");

  eslintrc.set("extends", [
    "airbnb-base",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
  ]);
  eslintrc.set("parser", "@typescript-eslint/parser");
  eslintrc.set("plugins", ["prettier", "@typescript-eslint"]);
  eslintrc.set("globals", {});
  eslintrc.set("rules", {
    "prettier/prettier": "error",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "@typescript-eslint/no-var-requires": "off",
  });
  eslintrc.set("settings", {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  });

  eslintrc.save();

  lines(".eslintignore").set(["node_modules", "dist"]).save();

  const pkg = packageJson();

  pkg
    // Add lint script
    .setScript("lint:js", "eslint --ext .js,.jsx .")
    .setScript("lint:ts", "eslint --ext .ts,.tsx .")
    .appendScript("lint", "run-p lint:*")
    .save();

  // Dependencies
  install(packages);
}

task.description = "Adds ESLint";
module.exports = task;
