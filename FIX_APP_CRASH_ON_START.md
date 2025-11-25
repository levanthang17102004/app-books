# 🔧 Sửa Lỗi: App Load Xong Nhưng Quay Ra Ngoài (Crash)

## 🚨 Vấn Đề

App load xong nhưng không vào app, quay ra ngoài ngay. Đây là dấu hiệu app bị crash khi khởi động.

---

## ✅ Đã Sửa

### **1. Sửa Error Handling trong src/app/index.tsx**

**Vấn đề:** Khi API fail, app throw error và crash.

**Đã sửa:**
- ✅ Không throw error nữa
- ✅ Redirect về welcome page khi có lỗi
- ✅ Xóa code không cần thiết

---

## 🔍 Nguyên Nhân Có Thể

### **1. API không accessible**
- API URL không đúng hoặc không truy cập được
- Backend không chạy
- Network error

### **2. Environment variables không có**
- `EXPO_PUBLIC_ANDROID_API_URL` hoặc `EXPO_PUBLIC_IOS_API_URL` không được set
- `backend` trong axios.customize.ts = `undefined`
- Axios tạo instance với `baseURL: undefined` → crash

### **3. Module không tương thích**
- `react-native-root-siblings` có thể chưa được cài
- Hoặc các native modules khác

---

## ✅ Giải Pháp Bổ Sung

### **Bước 1: Kiểm tra Environment Variables**

Đảm bảo có file `.env` trong thư mục root:
```
EXPO_PUBLIC_ANDROID_API_URL=http://192.168.1.100:3000
EXPO_PUBLIC_IOS_API_URL=http://192.168.1.100:3000
```

**Lưu ý:**
- Phải có prefix `EXPO_PUBLIC_`
- Thay `192.168.1.100` bằng IP máy tính của bạn
- Không dùng `localhost`

### **Bước 2: Kiểm tra Backend API**

Đảm bảo API đang chạy và accessible:
- Backend phải chạy trên IP máy tính (không chỉ localhost)
- Backend phải cho phép CORS từ Expo Go
- Có thể test bằng browser: `http://YOUR_IP:3000`

### **Bước 3: Sửa axios.customize.ts để không crash**

Thêm fallback cho backend URL:

```typescript
const backend = Platform.OS === "android" 
  ? process.env.EXPO_PUBLIC_ANDROID_API_URL 
  : process.env.EXPO_PUBLIC_IOS_API_URL;

// Fallback để không crash
const baseURL = backend || 'http://localhost:3000';

const instance = axios.create({
  baseURL: baseURL,
  timeout: 60 * 1000
});
```

### **Bước 4: Kiểm tra package thiếu**

Nếu thấy lỗi về `react-native-root-siblings`, cài:
```bash
npm install react-native-root-siblings
```

---

## 🔍 Debug Step-by-Step

### **Bước 1: Xem logs trên terminal**

Khi chạy `npm start`, xem terminal có báo lỗi gì:
- Error: Cannot find module
- Error: Network error
- Error: undefined is not an object

### **Bước 2: Xem logs trên Expo Go**

1. Lắc điện thoại khi app mở
2. Chọn "Show Developer Menu"
3. Chọn "Debug Remote JS"
4. Xem logs trong terminal

### **Bước 3: Test từng phần**

1. **Test không có API:**
   - Tắt backend
   - Chạy app
   - App phải vào welcome page (không crash)

2. **Test với API sai:**
   - Set API URL sai trong .env
   - App phải vào welcome page (không crash)

3. **Test với API đúng:**
   - Set API URL đúng
   - Backend đang chạy
   - App phải vào tabs (nếu đã login)

---

## ✅ Checklist

### **Code:**
- [ ] Đã sửa error handling trong `src/app/index.tsx`
- [ ] Không throw error nữa
- [ ] Redirect về welcome khi có lỗi

### **Environment:**
- [ ] Có file `.env` với `EXPO_PUBLIC_ANDROID_API_URL` và `EXPO_PUBLIC_IOS_API_URL`
- [ ] URL không dùng `localhost` (dùng IP máy tính)
- [ ] URL có prefix `EXPO_PUBLIC_`

### **Backend:**
- [ ] Backend đang chạy
- [ ] Backend accessible từ IP máy tính (không chỉ localhost)
- [ ] Backend cho phép CORS

### **Dependencies:**
- [ ] Đã cài `react-native-root-siblings` (nếu cần)
- [ ] Đã chạy `npm install`
- [ ] Không có package conflict

---

## 🎯 Cách Test

### **Test 1: Không có backend**
1. Tắt backend (nếu đang chạy)
2. Chạy app
3. ✅ App phải vào welcome page (không crash)

### **Test 2: Có backend nhưng chưa login**
1. Xóa accesstoken: `AsyncStorage.removeItem('accesstoken')`
2. Chạy app
3. ✅ App phải vào welcome page

### **Test 3: Có backend và đã login**
1. Login trước
2. Chạy app
3. ✅ App phải vào tabs

---

## 💡 Mẹo Hay

1. **Xem logs cẩn thận:** Terminal sẽ hiển thị lỗi cụ thể
2. **Test từng phần:** Test từng trường hợp để tìm vấn đề
3. **Kiên nhẫn:** Debug cần thời gian

---

## 🆘 Nếu Vẫn Không Được

### **Bước 1: Xem error message cụ thể**
- Copy toàn bộ error từ terminal
- Error message sẽ cho biết chính xác vấn đề

### **Bước 2: Kiểm tra từng điểm**
1. Environment variables có đúng không?
2. Backend có chạy không?
3. API URL có accessible không?
4. Có package nào thiếu không?

### **Bước 3: Test với project mới**
Tạo project mới để test:
```bash
npx create-expo-app test-app
cd test-app
npm start
```

Nếu project mới chạy được → Vấn đề ở code hiện tại
Nếu project mới cũng không chạy → Vấn đề ở môi trường

---

**Sau khi sửa, hãy test lại và cho tôi biết:**
1. App có vào được không?
2. Error message (nếu vẫn có)
3. Logs trên terminal hiển thị gì?

