module.exports = {
  root: true,
  extends: '../frontend/.eslintrc.yaml',
  rules: { 'global-require': 'off' },
  settings : {
    "import/resolver": {
      node: {
        paths: ["./src"]
      }
    }
  },
};
