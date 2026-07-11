<div align="center">

<img src="https://img.shields.io/badge/React_Native-0.86-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-≥22.11-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-orange?style=for-the-badge" />
<a href="https://hoduongquochuy278.github.io/FITLIFE-documents/" target="_blank">
  <img src="https://img.shields.io/badge/📖_Project_Docs-Visit_Now-blue?style=for-the-badge" alt="Project Documentation" />
</a>

# 🏋️ FITLiFE – Mobile App

**Ứng dụng quản lý phòng gym dành cho hội viên & huấn luyện viên**

*Xem lịch tập · Điểm danh · Đổi lịch · Theo dõi thu nhập*

</div>

---

## 📖 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng chính](#-tính-năng-chính)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Yêu cầu môi trường](#-yêu-cầu-môi-trường)
- [Cài đặt & Chạy thử](#-cài-đặt--chạy-thử)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Các thư viện sử dụng](#-các-thư-viện-sử-dụng)
- [Đội ngũ phát triển](#-đội-ngũ-phát-triển)

---

## 🌟 Giới thiệu

**FITLiFE Mobile** là ứng dụng di động được xây dựng bằng **React Native 0.86**, phục vụ hai nhóm người dùng chính trong hệ sinh thái FITLiFE:

| Đối tượng | Mô tả |
|-----------|-------|
| 🧑‍💼 **Hội viên** | Xem & đăng ký lịch tập, theo dõi điểm danh, yêu cầu đổi lịch, đọc ghi chú từ HLV |
| 🏃 **Huấn luyện viên** | Quản lý lịch dạy, điểm danh hội viên, ghi chú sức khỏe, xem bảng lương |

Ứng dụng giao tiếp với **Backend Laravel** qua RESTful API và hỗ trợ đăng nhập thông qua **Google Sign-In**.

---

## ✨ Tính năng chính

### 👤 Dành cho Hội viên
- 🔑 Đăng nhập bằng **tài khoản** hoặc **Google**
- 📋 Xem & đăng ký lịch tập
- 🗓️ Xem lịch sử **điểm danh**
- 🔁 Gửi yêu cầu **đổi lịch**
- 📝 Đọc **ghi chú sức khỏe** từ huấn luyện viên
- 👤 Quản lý **hồ sơ cá nhân**

### 🏋️ Dành cho Huấn luyện viên
- 📆 Tạo, sửa, xóa **lịch tập**
- ✅ **Điểm danh** hội viên theo buổi
- 📊 Duyệt / Từ chối yêu cầu **đổi lịch**
- 📓 Viết **ghi chú sức khỏe** cho từng hội viên
- 💰 Xem **bảng lương** cá nhân

---

## 🏗️ Kiến trúc hệ thống

```

│               FITLiFE Ecosystem                 
│                                                 
│  📱 FitLife (React Native)  
│  🌐 WEB-FITLIFE (Vue 3)     
│                                       
│              ⬇ REST API (Sanctum)       
│                                            
│  🖥️  Be-FITLIFE (Laravel 12)
│              ⬇                                
│  🗄️  SQLite / MySQL Database                   

```

| Thành phần | Công nghệ | Vai trò |
|---|---|---|
| `FitLife` | React Native 0.86 + TypeScript | Ứng dụng di động |
| `WEB-FITLIFE` | Vue 3 + Vite | Cổng admin web |
| `Be-FITLIFE` | Laravel 12 + Sanctum | Backend API |

---

## 🔧 Yêu cầu môi trường

Trước khi bắt đầu, hãy đảm bảo đã cài đặt đầy đủ:

| Công cụ | Phiên bản tối thiểu | Ghi chú |
|---|---|---|
| **Node.js** | ≥ 22.11.0 | [nodejs.org](https://nodejs.org) |
| **npm** | ≥ 10 | Đi kèm Node.js |
| **Java JDK** | 17 | Bắt buộc cho Android |
| **Android Studio** | Flamingo+ | SDK + Emulator |
| **Xcode** | 15+ | Chỉ dành cho macOS/iOS |
| **CocoaPods** | ≥ 1.15 | Chỉ dành cho iOS |

> ⚙️ Tham khảo hướng dẫn thiết lập đầy đủ tại: [React Native – Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment)

---

## 🚀 Cài đặt & Chạy thử

### 1. Clone dự án

```bash
git clone <repository-url>
cd FitLife
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình API

Mở file `src/general/` (hoặc file config tương ứng) và cập nhật địa chỉ API:

```ts
export const BASE_URL = 'http://<your-local-ip>:8000/api';
```

> 💡 Khi chạy emulator Android, dùng `10.0.2.2` thay vì `localhost`.

---

### 4. Khởi động Metro Bundler

```bash
npm start
```

---

### 5. Chạy ứng dụng

#### 🤖 Android

```bash
npm run android
```

#### 🍎 iOS (chỉ macOS)

Lần đầu tiên hoặc sau khi cập nhật native deps:

```bash
bundle install
bundle exec pod install
```

Chạy ứng dụng:

```bash
npm run ios
```

---

### 🔄 Hot Reload

Sau khi app đang chạy, bạn có thể reload nhanh:

| Nền tảng | Thao tác |
|---|---|
| Android | Nhấn `R` hai lần, hoặc `Ctrl+M` → **Reload** |
| iOS | Nhấn `R` trong Simulator |

---

## 📁 Cấu trúc thư mục

```
FitLife/
├── android/                  # Native Android project
├── ios/                      # Native iOS project
├── src/
│   ├── assets/               # Hình ảnh, fonts, icons
│   ├── general/              # Config API, constants
│   └── pages/                # Màn hình ứng dụng
│       ├── login.tsx         # Đăng nhập
│       ├── HomePage.tsx      # Trang chủ
│       ├── CalendarPage.tsx  # Lịch tập
│       ├── AttendancePage.tsx# Điểm danh
│       ├── MembersPage.tsx   # Danh sách hội viên (HLV)
│       ├── MemberDetails.tsx # Chi tiết hội viên
│       ├── ProgressPage.tsx  # Tiến trình tập luyện
│       ├── TrainerIncome.tsx # Thu nhập HLV
│       ├── CreateSchedule.tsx# Tạo lịch tập
│       ├── ChangeSchedule.tsx# Đổi lịch
│       └── Profile.tsx       # Hồ sơ cá nhân
├── App.tsx                   # Root component & Navigation
├── index.js                  # Entry point
├── package.json
└── tsconfig.json
```

---

## 📦 Các thư viện sử dụng

### Navigation
| Thư viện | Mô tả |
|---|---|
| `@react-navigation/native` | Core navigation |
| `@react-navigation/native-stack` | Stack navigator |
| `@react-navigation/bottom-tabs` | Tab bar dưới |

### UI & Hiệu ứng
| Thư viện | Mô tả |
|---|---|
| `react-native-linear-gradient` | Gradient background |
| `react-native-reanimated` | Animation mượt |
| `react-native-gesture-handler` | Xử lý gesture |
| `react-native-vector-icons` | Bộ icon đa dạng |
| `lucide-react-native` | Icon hiện đại |
| `react-native-svg` | SVG support |

### Dữ liệu & Biểu đồ
| Thư viện | Mô tả |
|---|---|
| `axios` | HTTP client gọi API |
| `@react-native-async-storage/async-storage` | Lưu token local |
| `react-native-chart-kit` | Biểu đồ thống kê |
| `react-native-circular-progress` | Progress vòng tròn |

### Form & Picker
| Thư viện | Mô tả |
|---|---|
| `@react-native-picker/picker` | Dropdown picker |
| `react-native-dropdown-picker` | Dropdown nâng cao |
| `react-native-element-dropdown` | Dropdown tùy chỉnh |
| `@react-native-community/datetimepicker` | Chọn ngày/giờ |
| `react-native-date-picker` | Date picker |

### Xác thực
| Thư viện | Mô tả |
|---|---|
| `@react-native-google-signin/google-signin` | Đăng nhập Google |

---

## 🧪 Kiểm thử

```bash
# Chạy unit tests
npm test

# Kiểm tra lint
npm run lint
```

---

## 👥 Đội ngũ phát triển

Dự án được phát triển bởi nhóm sinh viên trong khuôn khổ môn học tại trường đại học.

| Thành viên | Vai trò |
|---|---|
| Hồ Dương Quốc Huy | Team Lead / Mobile Dev |
| *(Thành viên 2)* | Backend Dev |
| *(Thành viên 3)* | Frontend / Admin Web |
| *(Thành viên 4)* | Mobile Dev |
| *(Thành viên 5)* | Database / DevOps |
| *(Thành viên 6)* | QA / Documentation |

---

## 📄 Giấy phép

Dự án được phân phối dưới giấy phép **MIT**. Xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

---

<div align="center">

Made with ❤️ by the **FITLiFE Team** · 2026

</div>
