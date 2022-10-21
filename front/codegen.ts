
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.json",
  documents: ["./graphql/mutation/*.ts","./graphql/queries/*.ts"],
  generates: {
    "./graphql/codegen/": {
      preset: "client",
      plugins: []
    },
  }
};

export default config;
