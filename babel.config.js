export const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        node: "current",
      },
    },
  ],
  "@babel/preset-react",
];
export const plugins = [
  "@babel/plugin-proposal-private-property-in-object",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-transform-runtime",
];
