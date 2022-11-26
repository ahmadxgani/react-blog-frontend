import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/graphql",
  documents: "./src/GraphQL/**/*.ts",
  generates: {
    "generated-types.ts": {
      // preset: "client",
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
    // "./graphql.schema.json": {
    //   plugins: ["introspection"],
    // },
  },
};

export default config;
