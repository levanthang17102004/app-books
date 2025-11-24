# Kiến Nghị Backend: Đường Dẫn Ảnh

## 📋 Tổng Quan

Front-end đã được refactor từ **Restaurant** sang **Bookstore**, nhưng đường dẫn ảnh vẫn đang sử dụng path cũ `/images/restaurant/` để tương thích ngược. Cần kiểm tra và đảm bảo backend có thể serve ảnh đúng cách.

---

## 🔍 Vấn Đề Hiện Tại

### 1. Đường Dẫn Ảnh Front-end Đang Sử Dụng:
- **Bookstore images:** `/images/restaurant/{image_name}`
- **Book images (menu-item):** `/images/menu-item/{image_name}`

### 2. Các Endpoint API Đang Gọi:
- `GET /bookstore/top-rating`
- `GET /bookstore/newcommer`
- `GET /bookstore/top-freeship`
- `GET /bookstore/:id`
- `GET /bookstore?current=1&pageSize=10&name={name}`
- `GET /bookstore?{query}`

---

## ✅ Yêu Cầu Backend

### 1. Static Files Serving
Backend cần đảm bảo có thể serve static files từ các folder:
- `/images/restaurant/` - Ảnh bookstore
- `/images/menu-item/` - Ảnh sách (book)

**Ví dụ cấu hình Express:**
```javascript
app.use('/images', express.static('public/images'));
```

### 2. CORS Configuration
Đảm bảo CORS cho phép truy cập ảnh từ front-end:
```javascript
app.use(cors({
  origin: ['http://localhost:8081', 'http://192.168.0.100:8081'],
  credentials: true
}));
```

### 3. Response Structure
Đảm bảo API response có field `image` với tên file đầy đủ:

**Ví dụ Response:**
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "name": "Nhà Sách ABC",
      "image": "bookstore1.jpg",  // ← Tên file ảnh
      "phone": "...",
      "address": "...",
      ...
    }
  ]
}
```

---

## 🧪 Test Cases với Postman

### Test 1: Kiểm Tra API Endpoint - Top Rating
**Request:**
```
POST http://192.168.0.100:3000/bookstore/top-rating
Headers:
  Content-Type: application/json
Body: {}
```

**Expected Response:**
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": [
    {
      "_id": "...",
      "name": "Nhà Sách ABC",
      "image": "bookstore1.jpg",
      "phone": "...",
      "address": "...",
      "email": "...",
      "rating": 4.5,
      "isActive": true
    }
  ]
}
```

**Kiểm tra:**
- [ ] Status code = 200
- [ ] Response có field `data` là array
- [ ] Mỗi item có field `image`
- [ ] Field `image` có giá trị (không null/undefined)

---

### Test 2: Kiểm Tra API Endpoint - Get Bookstore By ID
**Request:**
```
GET http://192.168.0.100:3000/bookstore/{id}
Headers:
  Authorization: Bearer {token} (nếu cần)
```

**Expected Response:**
```json
{
  "statusCode": 200,
  "message": "Fetch a bookstore by id",
  "data": {
    "_id": "...",
    "name": "Nhà Sách ABC",
    "image": "bookstore1.jpg",
    "category": [
      {
        "_id": "...",
        "bookstore": "...",
        "title": "Sách Văn Học",
        "book": [
          {
            "_id": "...",
            "category": "...",
            "title": "Tên Sách",
            "image": "book1.jpg",  // ← Ảnh sách
            "basePrice": 50000,
            ...
          }
        ]
      }
    ]
  }
}
```

**Kiểm tra:**
- [ ] Status code = 200
- [ ] Response có field `data`
- [ ] `data.image` có giá trị (ảnh bookstore)
- [ ] `data.category[].book[].image` có giá trị (ảnh sách)

---

### Test 3: Kiểm Tra Static File - Bookstore Image
**Request:**
```
GET http://192.168.0.100:3000/images/restaurant/bookstore1.jpg
```

**Expected Response:**
- Status code: 200
- Content-Type: image/jpeg hoặc image/png
- Body: Binary image data

**Kiểm tra:**
- [ ] Status code = 200 (không phải 404)
- [ ] Response là file ảnh (có thể xem được trong Postman)
- [ ] Không có lỗi CORS

---

### Test 4: Kiểm Tra Static File - Book Image
**Request:**
```
GET http://192.168.0.100:3000/images/menu-item/book1.jpg
```

**Expected Response:**
- Status code: 200
- Content-Type: image/jpeg hoặc image/png
- Body: Binary image data

**Kiểm tra:**
- [ ] Status code = 200 (không phải 404)
- [ ] Response là file ảnh (có thể xem được trong Postman)
- [ ] Không có lỗi CORS

---

### Test 5: Kiểm Tra API - Search Bookstore
**Request:**
```
GET http://192.168.0.100:3000/bookstore?current=1&pageSize=10&name=abc
```

**Expected Response:**
```json
{
  "statusCode": 200,
  "message": "Success",
  "data": {
    "meta": {
      "current": 1,
      "pageSize": 10,
      "pages": 1,
      "total": 5
    },
    "results": [
      {
        "_id": "...",
        "name": "Nhà Sách ABC",
        "image": "bookstore1.jpg",
        ...
      }
    ]
  }
}
```

**Kiểm tra:**
- [ ] Status code = 200
- [ ] Response có structure `data.results`
- [ ] Mỗi item trong `results` có field `image`

---

## 📁 Cấu Trúc Folder Ảnh Mong Đợi

Backend nên có cấu trúc folder như sau:

```
backend/
├── public/
│   └── images/
│       ├── restaurant/          # Ảnh bookstore
│       │   ├── bookstore1.jpg
│       │   ├── bookstore2.jpg
│       │   └── ...
│       └── menu-item/           # Ảnh sách (book)
│           ├── book1.jpg
│           ├── book2.jpg
│           └── ...
```

---

## 🔧 Cấu Hình Backend Cần Kiểm Tra

### 1. Express Static Middleware
```javascript
const express = require('express');
const app = express();
const path = require('path');

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));
```

### 2. CORS Configuration
```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:8081',
    'http://192.168.0.100:8081',
    'exp://192.168.0.100:8081'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 3. Error Handling cho Ảnh Không Tồn Tại
```javascript
// Nếu file ảnh không tồn tại, trả về ảnh placeholder hoặc 404
app.use('/images', (req, res, next) => {
  // Logic xử lý nếu file không tồn tại
  // Có thể trả về ảnh placeholder mặc định
});
```

---

## 📝 Checklist Backend

### API Endpoints
- [ ] `POST /bookstore/top-rating` - Trả về danh sách bookstore với field `image`
- [ ] `POST /bookstore/newcommer` - Trả về danh sách bookstore với field `image`
- [ ] `POST /bookstore/top-freeship` - Trả về danh sách bookstore với field `image`
- [ ] `GET /bookstore/:id` - Trả về bookstore detail với `image` và `category[].book[].image`
- [ ] `GET /bookstore?{query}` - Trả về paginated results với field `image`

### Static Files
- [ ] Folder `/images/restaurant/` tồn tại và có quyền đọc
- [ ] Folder `/images/menu-item/` tồn tại và có quyền đọc
- [ ] Express static middleware đã được cấu hình
- [ ] CORS cho phép truy cập static files

### Database
- [ ] Collection `bookstore` có field `image` với tên file đầy đủ
- [ ] Collection `book` (hoặc `menuItem`) có field `image` với tên file đầy đủ
- [ ] Tên file ảnh trong database khớp với file thực tế trên server

### Testing
- [ ] Test tất cả API endpoints bằng Postman
- [ ] Test truy cập ảnh trực tiếp qua URL
- [ ] Test với thiết bị thật (không phải localhost)
- [ ] Test CORS từ front-end

---

## 🧪 Postman Collection

### Import Collection vào Postman:

```json
{
  "info": {
    "name": "Bookstore API Test",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get Top Rating Bookstores",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/bookstore/top-rating",
          "host": ["{{baseUrl}}"],
          "path": ["bookstore", "top-rating"]
        }
      }
    },
    {
      "name": "Get Bookstore By ID",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}"
          }
        ],
        "url": {
          "raw": "{{baseUrl}}/bookstore/:id",
          "host": ["{{baseUrl}}"],
          "path": ["bookstore", ":id"],
          "variable": [
            {
              "key": "id",
              "value": "bookstore_id_here"
            }
          ]
        }
      }
    },
    {
      "name": "Test Bookstore Image",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}/images/restaurant/bookstore1.jpg",
          "host": ["{{baseUrl}}"],
          "path": ["images", "restaurant", "bookstore1.jpg"]
        }
      }
    },
    {
      "name": "Test Book Image",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{baseUrl}}/images/menu-item/book1.jpg",
          "host": ["{{baseUrl}}"],
          "path": ["images", "menu-item", "book1.jpg"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://192.168.0.100:3000"
    },
    {
      "key": "token",
      "value": "your_access_token_here"
    }
  ]
}
```

---

## 🚨 Các Lỗi Thường Gặp

### Lỗi 1: 404 Not Found khi truy cập ảnh
**Nguyên nhân:** 
- File ảnh không tồn tại
- Đường dẫn static files không đúng
- Tên file trong database không khớp với file thực tế

**Giải pháp:**
- Kiểm tra file ảnh có tồn tại trong folder không
- Kiểm tra cấu hình Express static middleware
- Kiểm tra tên file trong database

### Lỗi 2: CORS Error
**Nguyên nhân:**
- CORS chưa được cấu hình
- Origin không được phép

**Giải pháp:**
- Thêm CORS middleware
- Cho phép origin của front-end

### Lỗi 3: API trả về nhưng không có field `image`
**Nguyên nhân:**
- Database không có field `image`
- Query không select field `image`

**Giải pháp:**
- Kiểm tra schema/model
- Đảm bảo query select field `image`

---

## 📞 Liên Hệ

Nếu có vấn đề, vui lòng kiểm tra:
1. Console logs của backend
2. Network tab trong browser/Postman
3. File logs của server

**Ngày tạo:** 2024
**Front-end Team**

