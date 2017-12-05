#  KOMUTO APPS
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

* Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup on OSX

This Readme guide was tested with Mac OSX Sierra and High Sierra.

What you need to install first:

* git
* android studio 2 with android sdk minimum version 23 with android emulator
* android debugging bridge (adb) version 1
* java jdk ver 1.8
* node.js ver 8
* yarn ver 1 or npm ver 5
* react-native-cli

**Step 1:** git clone this repo, checkout branch `komuto`

**Step 2:** on terminal cd to the cloned repo

**Step 3:** Install the Application with `npm install`

**Step 4:** Unzip module.zip

**Step 5:** Copy and replace the node modules from the zip to folder node_modules

## :arrow_up: How to Setup on Linux

This Readme guide was tested with Ubuntu 14.04.

What you need to install first:

* git
* android studio 2 with android sdk minimum version 23 with android emulator
* android debugging bridge (adb) version 1
* node.js ver 8
* java jdk ver 1.8
* npm ver 5
* react-native-cli

**Step 1:** git clone this repo, checkout branch `komuto`

**Step 2:** on terminal cd to the cloned repo

**Step 3:** Install the Application with `npm install`

**Step 4:** Unzip module.zip

**Step 5:** Copy and replace the node modules from the zip to folder node_modules

## :arrow_up: How to Setup on Windows

This Readme guide was tested with Windows 10.

What you need to install first:

* git
* android studio 2 with android sdk minimum version 23 with android emulator
* android debugging bridge (adb) version 1
* node.js ver 8
* java jdk ver 1.8
* npm ver 5
* react-native-cli

**Step 1:** git clone this repo, checkout branch `komuto`

**Step 2:** on terminal cd to the cloned repo

**Step 3:** Install the Application with `npm install`

**Step 4:** Unzip module.zip

**Step 5:** Copy and replace the node modules from the zip to folder node_modules

## :arrow_forward: How to Run App on OSX and Linux
1. On `terminal` cd to the repo
2. Run `Android emulator` or `physical device`, and ensure the device connected to `adb`
3. Run `react-native link`
4. Run `react-native run-android`
5. run `react-native start`

## :arrow_forward: How to Run App on Windows
1. On `terminal` cd to the repo
2. Run `Android emulator` or `physical device`, and ensure the device connected to `adb`
3. Run `react-native link`
4. Run `react-native run-android`
5. run `react-native start`

## :arrow_forward: How to Compile App for Production on OSX and Linux

1. edit `<project folder>/android/app/build.gradle`
2. increment `version code` and `version name` based on App Store
3. on terminal cd to the `<project folder>/android`
4. run `./gradlew assembleRelease`
5. wait to compile
6. apk is generated on `<project folder>/android/app/build/output/apk`

## :arrow_forward: How to Compile App for Production on Windows

1. edit `<project folder>/android/app/build.gradle`
2. increment `version code` and `version name` based on App Store
3. on terminal cd to the `<project folder>/android`
4. run `gradlew.bat assembleRelease`
5. wait to compile
6. apk is generated on `<project folder>/android/app/build/output/apk`

## :arrow_forward: How to Compile New App (New Marketplace) on OSX and Linux

1. change the setting in config.js (`<project folder>/App/config.js`)
2. refactor package name (open folder `<project folder>/android` from Android Studio)
3. change package name in `<project folder>/android/app/google-service.json` (via android studio)
4. change package name in Android Manifest
5. to change the icon, replace the `ic_launcher.png` in all folder mipmap in `<project folder>/android/app/src/main/res`
6. change `android:scheme`, `android:host`, and `label` in Android Manifest
7. change `app name` in `res/values/strings.xml`
8. change `facebook app id` in `res/values/strings.xml`
9. make sure to input `hash key` from `my-release-key.keystore` to facebook developer
10. on terminal cd to the `<project folder>/android` and run `./gradlew assembleRelease`
11. wait to compile
12. apk is generated on `<project folder>/android/app/build/output/apk`

## :arrow_forward: How to Compile New App (New Marketplace) on Windows

1. change the setting in config.js (`<project folder>/App/config.js`)
2. refactor package name (open folder `<project folder>/android` from Android Studio)
3. change package name in `<project folder>/android/app/google-service.json` (via android studio)
4. change package name in Android Manifest
5. to change the icon, replace the `ic_launcher.png` in all folder mipmap in `<project folder>/android/app/src/main/res`
6. change `android:scheme`, `android:host`, and `label` in Android Manifest
7. change `app name` in `res/values/strings.xml`
8. change `facebook app id` in `res/values/strings.xml`
9. make sure to input `hash key` from `my-release-key.keystore` to facebook developer
10. on terminal cd to the `<project folder>/android` and run `gradlew.bat assembleRelease`
11. wait to compile
12. apk is generated on `<project folder>/android/app/build/output/apk`

## :arrow_forward: How to create hash key app for facebook developer

* on terminal cd to `<project folder>/android/app`
* run `keytool -exportcert -alias komuto -keystore my-release-key.keystore | openssl sha1 -binary | openssl base64` on terminal
* password is komuto123 if it needed
* hash key will be shown in the terminal
* input this hash key to facebook developer

## :warning: Common Encountered Error

**SDK location not found. Define location with sdk.dir in the local.properties file or with an ANDROID_HOME environment variable.**

This encountered when react-native doesn't know where is the location of `android sdk` binaries

* OSX & Linux
  1. Set up environment variables in your `~/.bash_profile`
  2. export `ANDROID_HOME='path/to/androidSDK/'`
  3. export `PATH=$ANDROID_HOME/tools:$PATH`
  4. export `PATH=$ANDROID_HOME/platform-tools:$PATH`
  5. restart `terminal`

* Windows
  1. define `ANDROID_HOME` with path of `android sdk` on your `environment variables`
  2. add  `%ANDROID_HOME%\platform-tools\` to `PATH`
  3. add  `%ANDROID_HOME%\tools\` to `PATH`
  4. restart `command prompt`

**JAVA_HOME is not set and no 'java' command could be found in your PATH.**

This encountered when react-native doesn't know where is the location of `java jdk` binaries. remember to only use `Java JDK version 1.8`

* OSX & Linux
  1. Set up environment variables in your `~/.bash_profile`
  2. export `JAVA_HOME='path/to/javaSDK/'`
  3. export `PATH=$JAVA_HOME/bin:$PATH`
  4. restart `terminal`

* Windows
  1. define `JAVA_HOME` with path of `java jdk` on your `environment variables`
  2. add  `%JAVA_HOME%\bin\` to `PATH`
  3. restart `command prompt`

**Unsupported major.minor version 52.0**

This encountered when `java jdk` binaries that installed or used on the machine is not exactly version `1.8`. Remember to only use `Java JDK version 1.8`


**Failed to login using facebook in app, error hash key.**

This encountered when `hash key` is not submited in faceook developer. This problem will be resolved by regenerating new `hash key` and submit it to facebook developer.

**install_failed_version_downgrade**

This encountered when the version installed on `physical device` or `emulator` is higher than on development. Uninstall the app that already on `physical device` or `emulator` first


## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard.  Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [ghooks](https://github.com/gtramontina/ghooks). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard.  [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :open_file_folder: Related Articles
Ignite Documentation - [Ignite Wiki https://github.com/infinitered/ignite/wiki](https://github.com/infinitered/ignite/wiki)
