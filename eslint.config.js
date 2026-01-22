// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const importPlugin = require("eslint-plugin-import");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    rules: {
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/typedef": [
        "error",
        {
          arrayDestructuring: false,
          arrowParameter: true,
          memberVariableDeclaration: true,
          objectDestructuring: false,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
        },
      ],
    },
  },

  // ELECTRON
  {
    files: ["src/electron/**/*.ts"],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: "./src/electron/tsconfig.json",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./src/electron/tsconfig.json",
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".ts", ".js"],
        },
      },
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "node:*",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "electron",
              group: "external",
              position: "before",
            },
            {
              pattern: "electron/**",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin", "electron"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  // ANGULAR
  {
    files: ["src/angular/**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    plugins: {
      import: importPlugin,
    },
    processor: angular.processInlineTemplates,
    settings: {
      "import/resolver": {
        typescript: {
          project: "./src/angular/tsconfig.json",
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "",
          style: "kebab-case",
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "node:*",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@angular/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "rxjs/**",
              group: "external",
              position: "before",
            },

            // Core
            {
              pattern: "@/core/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@core/**",
              group: "internal",
              position: "before",
            },

            // Shared
            {
              pattern: "@/shared/**",
              group: "internal",
              position: "before",
            },
            {
              pattern: "@shared/**",
              group: "internal",
              position: "before",
            },

            // Relative imports in same Modulo
            // Services
            {
              pattern: "../../services/**",
              group: "parent",
              position: "before",
            },
            {
              pattern: "../services/**",
              group: "parent",
              position: "before",
            },

            // Models
            {
              pattern: "../../models/**",
              group: "parent",
              position: "before",
            },
            {
              pattern: "../models/**",
              group: "parent",
              position: "before",
            },

            // Guards
            {
              pattern: "../../guards/**",
              group: "parent",
              position: "before",
            },
            {
              pattern: "../guards/**",
              group: "parent",
              position: "before",
            },

            // Pipes
            {
              pattern: "../../pipes/**",
              group: "parent",
              position: "before",
            },
            {
              pattern: "../pipes/**",
              group: "parent",
              position: "before",
            },

            // Directives
            {
              pattern: "../../directives/**",
              group: "parent",
              position: "before",
            },
            {
              pattern: "../directives/**",
              group: "parent",
              position: "before",
            },

            // Containers
            {
              pattern: "../../containers/**",
              group: "parent",
              position: "after",
            },
            {
              pattern: "../containers/**",
              group: "parent",
              position: "after",
            },

            // Components
            {
              pattern: "../../components/**",
              group: "parent",
              position: "after",
            },
            {
              pattern: "../components/**",
              group: "parent",
              position: "after",
            },

            // Pages
            {
              pattern: "../../pages/**",
              group: "parent",
              position: "after",
            },
            {
              pattern: "../pages/**",
              group: "parent",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["@angular", "rxjs"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ["src/angular/**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {},
  },
]);
