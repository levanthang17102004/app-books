cach Build code
Buoc 1: npm i
Buoc 2:Build dev client cho Android( nho cai Java 17: https://adoptium.net/temurin/releases/?version=17 )-- "check lai version cua java: 'java --version' *trong vscode nhe*"
npx expo prebuild
npx expo run:android
Buoc 3: check xem eas da cai chua? chua cai chay eas trong terminal:"npm install -g eas-cli"
Kiem tra lai eas:" eas --version"
Buoc 4: dang nhap bang vao eas: " eas login"( nen su dung tai khoan expo)
Buoc 5: vao tai khoan expo tren mang Chrome: Dang nhap vao phan "Project" -> set up "Environment variables"(https://expo.dev)
| Name                        | Value                                                  | Visibility |
| --------------------------- | ------------------------------------------------------ | ---------- |
| EXPO_PUBLIC_API_URL         | [http://192.168.0.100:PORT](http://192.168.0.100:PORT) | Plain text | ( dien mot cai http:// thoi nhe)
| EXPO_PUBLIC_ANDROID_API_URL | [http://192.168.0.100:PORT](http://192.168.0.100:PORT) | Plain text | ( nho tich het vao Enviroment: "production"; "preview"; "development")

Buoc 6: chay lenh: " eas build -p android --profile preview"



