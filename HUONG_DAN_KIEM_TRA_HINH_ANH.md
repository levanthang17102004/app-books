# Hướng Dẫn Kiểm Tra Hình Ảnh Không Hiển Thị

## 🔍 Các Bước Kiểm Tra

### 1. Kiểm Tra Backend Đang Chạy
- Backend phải đang chạy trên port **3000**
- Kiểm tra console backend có log: `Server starting at http://localhost:3000`
- Kiểm tra MongoDB đã kết nối: `MongoDB connected`

### 2. Kiểm Tra IP và Port trong .env
Mở file `.env` và kiểm tra:
```
EXPO_PUBLIC_ANDROID_API_URL=http://10.0.2.2:3000
EXPO_PUBLIC_IOS_API_URL=http://192.168.0.100:3000
```

**Lưu ý:**
- IP `192.168.0.100` phải khớp với IP máy tính của bạn (chạy `ipconfig` để kiểm tra)
- Port phải là `3000` (khớp với backend)

### 3. Kiểm Tra Console Logs trong App
Khi mở app, kiểm tra console logs:
- `>>check backend:` - phải hiển thị URL backend đúng
- `>>CollectionHome API Response:` - kiểm tra API có trả về dữ liệu không
- `>>Base image URL:` - kiểm tra đường dẫn ảnh
- `>>Image load error:` - nếu có lỗi load ảnh

### 4. Kiểm Tra API Response
Mở Network tab trong DevTools hoặc kiểm tra console:
- API `/bookstore/top-rating` có trả về dữ liệu không?
- Response có field `image` không?
- Giá trị `image` có đúng không?

### 5. Kiểm Tra Đường Dẫn Ảnh
Đường dẫn ảnh hiện tại: `/images/restaurant/{image_name}`

**Kiểm tra:**
- Backend có folder `images/restaurant/` không?
- File ảnh có tồn tại trong folder đó không?
- Tên file ảnh có khớp với giá trị `image` trong database không?

### 6. Test Thủ Công URL Ảnh
Mở trình duyệt và thử truy cập:
```
http://192.168.0.100:3000/images/restaurant/{tên_file_ảnh}
```

Nếu không mở được:
- Kiểm tra backend có serve static files không
- Kiểm tra đường dẫn folder ảnh trong backend
- Kiểm tra CORS settings

### 7. Kiểm Tra Dữ Liệu Database
Kiểm tra database có dữ liệu bookstore không:
- Collection `bookstore` có documents không?
- Mỗi document có field `image` không?
- Giá trị `image` có đúng tên file không?

## 🛠️ Các Lỗi Thường Gặp

### Lỗi 1: "Network request failed"
**Nguyên nhân:** Không kết nối được với backend
**Giải pháp:**
- Kiểm tra backend đang chạy
- Kiểm tra IP và port trong .env
- Kiểm tra firewall
- Đảm bảo máy tính và thiết bị cùng mạng WiFi

### Lỗi 2: "Image load error"
**Nguyên nhân:** Đường dẫn ảnh không đúng hoặc file không tồn tại
**Giải pháp:**
- Kiểm tra đường dẫn ảnh trong code
- Kiểm tra file ảnh có tồn tại trên server không
- Kiểm tra tên file có khớp với database không

### Lỗi 3: API trả về empty array
**Nguyên nhân:** Backend chưa có dữ liệu
**Giải pháp:**
- Kiểm tra database có dữ liệu không
- Kiểm tra API endpoint có đúng không
- Kiểm tra backend có xử lý request đúng không

### Lỗi 4: CORS Error
**Nguyên nhân:** Backend chưa cấu hình CORS
**Giải pháp:**
- Thêm CORS middleware trong backend
- Cho phép origin của app

## 📝 Checklist

- [ ] Backend đang chạy trên port 3000
- [ ] IP trong .env đúng với IP máy tính
- [ ] Port trong .env là 3000
- [ ] Máy tính và thiết bị cùng mạng WiFi
- [ ] Database có dữ liệu bookstore
- [ ] API trả về dữ liệu (kiểm tra console log)
- [ ] Đường dẫn ảnh đúng: `/images/restaurant/{image}`
- [ ] File ảnh tồn tại trên server
- [ ] Backend có serve static files
- [ ] CORS đã được cấu hình

## 🔧 Debug Commands

### Kiểm tra IP máy tính:
```bash
ipconfig
```

### Test API endpoint (trong browser hoặc Postman):
```
GET http://192.168.0.100:3000/bookstore/top-rating
```

### Test image URL (trong browser):
```
http://192.168.0.100:3000/images/restaurant/{tên_file_ảnh}
```

## 💡 Gợi Ý

1. **Kiểm tra console logs** trong app để xem lỗi cụ thể
2. **Test API trực tiếp** bằng Postman hoặc browser
3. **Kiểm tra Network tab** trong DevTools để xem request/response
4. **Kiểm tra backend logs** để xem có lỗi gì không

