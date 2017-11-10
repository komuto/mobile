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

=== code bundling ===
react-native bundle --platform android --dev false --entry-file index.android.js   --bundle-output android/app/src/main/assets/index.android.bundle   --assets-dest android/app/src/main/res/

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