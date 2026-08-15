module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      "babel-preset-expo",
      // NativeWind v5 (react-native-css) babel preset for className styles.
      "nativewind/babel",
    ],
    plugins: [
      // Required by react-native-reanimated v4 + react-native-worklets
      // (pulled in by react-native-screens/expo-router). Without this the
      // app throws a fatal error and crashes on launch.
      "react-native-worklets/plugin",
    ],
  };
};
