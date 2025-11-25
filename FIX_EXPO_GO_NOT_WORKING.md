# 🔧 Sửa Lỗi: Chạy Được Web Nhưng Không Chạy Được Expo Go

## 🚨 Vấn Đề Chính

Bạn có thể gặp vấn đề vì:
1. **`newArchEnabled: true`** - Expo Go chưa hỗ trợ đầy đủ New Architecture
2. **React Native Reanimated** - Cần cấu hình đặc biệt
3. **Expo Dev Client** - Có thể không tương thích với Expo Go
4. **Environment variables** - Cần cấu hình đúng cho Expo Go

---

## ✅ Giải Pháp 1: Tắt New Architecture (Khuyên dùng)

### **Bước 1: Sửa app.json**

Mở file `app.json`, tìm dòng:
```json
"newArchEnabled": true,
```

**Sửa thành:**
```json
"newArchEnabled": false,
```

**Hoặc xóa dòng này đi** (mặc định là false)

### **Bước 2: Restart Expo**
```bash
# Dừng server (Ctrl + C)
# Chạy lại
npx expo start --clear
```

---

## ✅ Giải Pháp 2: Cấu Hình React Native Reanimated

### **Bước 1: Kiểm tra babel.config.js**

Đảm bảo file `babel.config.js` có:
```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Phải ở cuối cùng
    ],
  };
};
```

**Lưu ý:** `react-native-reanimated/plugin` **PHẢI** là plugin cuối cùng trong array.

### **Bước 2: Clear cache**
```bash
npx expo start --clear
```

---

## ✅ Giải Pháp 3: Kiểm Tra Environment Variables

### **Vấn đề:**
Expo Go không load file `.env` tự động như web.

### **Giải pháp A: Dùng app.json**

1. Tạo file `.env` với nội dung:
```
EXPO_PUBLIC_ANDROID_API_URL=http://192.168.1.100:3000
EXPO_PUBLIC_IOS_API_URL=http://192.168.1.100:3000
```

**Lưu ý:** Phải có prefix `EXPO_PUBLIC_` để Expo load biến này.

2. Restart Expo server:
```bash
npx expo start --clear
```

### **Giải pháp B: Kiểm tra code sử dụng env**

Đảm bảo code sử dụng đúng:
```typescript
// ✅ Đúng
const apiUrl = process.env.EXPO_PUBLIC_ANDROID_API_URL;

// ❌ Sai - Không hoạt động trong Expo Go
const apiUrl = process.env.ANDROID_API_URL;
```

---

## ✅ Giải Pháp 4: Kiểm Tra Dependencies

### **Bước 1: Kiểm tra các package không tương thích**

Một số package có thể không tương thích với Expo Go:
- `expo-dev-client` - Có thể gây conflict

### **Bước 2: Tạm thời xóa expo-dev-client (nếu không dùng)**

Nếu bạn không dùng custom dev client, có thể xóa:
```bash
npm uninstall expo-dev-client
```

**Lưu ý:** Chỉ xóa nếu không cần custom dev client.

---

## ✅ Giải Pháp 5: Kiểm Tra Code Có Lỗi

### **Bước 1: Xem logs trên terminal**

Khi chạy `npm start`, xem terminal có báo lỗi gì không:
- Error: Module not found
- Error: Cannot find module
- Error: Something went wrong

### **Bước 2: Kiểm tra import**

Đảm bảo không import package chỉ dành cho web:
```typescript
// ❌ Không nên có trong React Native
import something from 'web-only-package';
```

---

## ✅ Giải Pháp 6: Rebuild Dependencies

### **Bước 1: Xóa node_modules**
```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules

# Hoặc xóa thủ công trong File Explorer
```

### **Bước 2: Xóa cache**
```bash
npm cache clean --force
```

### **Bước 3: Reinstall**
```bash
npm install
```

### **Bước 4: Clear Expo cache và chạy lại**
```bash
npx expo start --clear
```

---

## ✅ Giải Pháp 7: Kiểm Tra API URL

### **Vấn đề:**
API URL trên web có thể là `localhost`, nhưng trên điện thoại không thể truy cập `localhost` của máy tính.

### **Giải pháp:**

#### **Bước 1: Tìm IP máy tính**

**Windows:**
```bash
ipconfig
```
Tìm "IPv4 Address" (ví dụ: 192.168.1.100)

**Mac/Linux:**
```bash
ifconfig
```

#### **Bước 2: Sửa .env file**

Thay vì:
```
EXPO_PUBLIC_ANDROID_API_URL=http://localhost:3000
```

Sửa thành:
```
EXPO_PUBLIC_ANDROID_API_URL=http://192.168.1.100:3000
```

**Lưu ý:** Thay `192.168.1.100` bằng IP thực của máy tính.

#### **Bước 3: Đảm bảo API accessible**

- API phải chạy trên máy tính
- API phải cho phép truy cập từ IP của máy tính (không chỉ localhost)
- Firewall không chặn port API

---

## 🔍 Debug Step-by-Step

### **Bước 1: Chạy với verbose logging**
```bash
npx expo start --clear --verbose
```

### **Bước 2: Xem logs trên terminal**
- Copy toàn bộ error message
- Tìm dòng bắt đầu bằng "Error:" hoặc "Warning:"

### **Bước 3: Test trên Expo Go**
1. Mở Expo Go
2. Quét QR code
3. Xem logs trên terminal khi app load
4. Copy error message

### **Bước 4: Kiểm tra Error Boundary**
Nếu app crash, xem có hiển thị error message không.

---

## ✅ Checklist Kiểm Tra

### **Cấu hình:**
- [ ] `newArchEnabled: false` (hoặc xóa)
- [ ] `babel.config.js` có `react-native-reanimated/plugin`
- [ ] Environment variables có prefix `EXPO_PUBLIC_`
- [ ] API URL không dùng `localhost` (dùng IP máy tính)

### **Dependencies:**
- [ ] Đã chạy `npm install` thành công
- [ ] Không có warning về package compatibility
- [ ] Đã clear cache: `npx expo start --clear`

### **Network:**
- [ ] API đang chạy trên máy tính
- [ ] API accessible từ IP máy tính (không chỉ localhost)
- [ ] Firewall không chặn port API
- [ ] Điện thoại và máy tính cùng mạng (hoặc dùng tunnel)

---

## 🎯 Quy Trình Sửa Lỗi Nhanh

### **Bước 1: Tắt New Architecture**
Sửa `app.json`: `"newArchEnabled": false`

### **Bước 2: Clear và chạy lại**
```bash
npx expo start --clear --tunnel
```

### **Bước 3: Kiểm tra API URL**
Đảm bảo dùng IP máy tính, không phải `localhost`

### **Bước 4: Test**
Quét QR code và xem logs

---

## 🆘 Nếu Vẫn Không Được

### **Thử các bước sau:**

1. **Kiểm tra Expo Go version:**
   - Đảm bảo Expo Go là phiên bản mới nhất
   - Update từ Store nếu cần

2. **Kiểm tra Expo SDK version:**
   ```bash
   npx expo --version
   ```
   - Đảm bảo tương thích với package.json

3. **Xem error cụ thể:**
   - Copy toàn bộ error message từ terminal
   - Error message sẽ cho biết chính xác vấn đề

4. **Test với project mới:**
   ```bash
   npx create-expo-app test-app
   cd test-app
   npm start
   ```
   - Nếu project mới chạy được → Vấn đề ở code hiện tại
   - Nếu project mới cũng không chạy → Vấn đề ở môi trường

---

## 💡 Mẹo Hay

1. **Luôn dùng `--tunnel`** khi test lần đầu:
   ```bash
   npx expo start --tunnel
   ```

2. **Xem logs cẩn thận:** Error message trong terminal rất quan trọng

3. **Test từng phần:** Comment code phức tạp để tìm phần gây lỗi

4. **Kiên nhẫn:** Expo Go lần đầu load có thể mất 2-3 phút

---

**Sau khi sửa, hãy cho tôi biết:**
1. Đã sửa gì? (newArchEnabled, babel.config.js, etc.)
2. Error message hiện tại là gì? (nếu vẫn có lỗi)
3. Logs trên terminal hiển thị gì?

