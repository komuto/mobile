=== HOW TO INSTALL ==
1. clone this project
2. npm install
3. unzip module.zip
4. copy and replace folder dari folder module (from module.zip) ke folder node_module
5. link file node module ke file project (react-native link) dari terminal
6. bundling ulang file project react native
7. buat apk dari Android Studio atau "./gradlew assembleRelease" via terminal di folder android

note: skip step 6 apabila menggunakan metode gradlew assembleRelease

=== code bundling ===
react-native bundle --platform android --dev false --entry-file index.android.js   --bundle-output android/app/src/main/assets/index.android.bundle   --assets-dest android/app/src/main/res/

=== CHANGE WHITE LABEL APPS ===
1. ubah file di config js (App/config.js)
2. refactor nama package (buka folder android dari Android Studio)
3. ubah nama apps di google-service.json (via android studio)
4. ubah nama package di Android Manifest
5. ubah android:scheme dan android:host beserta label pada Android Manifest
6. ubah nama market place di res/values/strings.xml
7. ubah apps id facebook di res/values/strings.xml
8. bundling ulang file project react native
9. buat apk dari Android Studio

versi lebih sederhana

=== CHANGE WHITE LABEL APPS ===
1. ubah file di config js (App/config.js)
2. refactor nama package (buka folder android dari Android Studio)
3. ubah nama apps di google-service.json (via android studio)
4. ubah nama package di Android Manifest
5. ubah android:scheme dan android:host beserta label pada Android Manifest
6. ubah nama market place di res/values/strings.xml
7. ubah apps id facebook di res/values/strings.xml
8. "./gradlew assembleRelease" via terminal di folder android