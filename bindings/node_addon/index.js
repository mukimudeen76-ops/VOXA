let addon;
try {
  addon = require("./build/Release/voxa_node_addon.node");
} catch {
  console.warn(
    "[NodeAddon] Native addon binary not compiled yet. Call node-gyp rebuild to compile.",
  );
  addon = {
    initializeEngine: () => true,
  };
}

module.exports = addon;
