
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./schema.json",
  documents: ["./graphql/mutation/*.ts","./graphql/queries/*.ts"],
  generates: {
    "./graphql/codegen.ts": {
      plugins: ["typescript","typescript-operations","typescript-react-apollo"]
    },
  }
};

export default config;
