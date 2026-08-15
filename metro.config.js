const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("mjs");

// NativeWind v5 preview.4 injects `import "nativewind/jsx-runtime"` but does
// not export that subpath. Alias it to React's jsx-runtime so the bundle
// always resolves.
const origResolveRequest =
  config.resolver.resolveRequest ||
  ((ctx, name, platform) => ctx.resolveRequest(ctx, name, platform));
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "nativewind/jsx-runtime") {
    return origResolveRequest(context, "react/jsx-runtime", platform);
  }
  return origResolveRequest(context, moduleName, platform);
};

module.exports = withNativewind(config);
