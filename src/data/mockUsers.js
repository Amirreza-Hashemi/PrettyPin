// این فایل شبیه‌ساز یک دیتابیس ساده‌ی کاربران است.
// بعد از اتصال API واقعی Django (قدم ۸ Roadmap)، این فایل کاملاً حذف می‌شود
// و توابع findMockUser / addMockUser / isPhoneTaken با درخواست‌های Axios جایگزین می‌شوند.

const STORAGE_KEY = "prettypin_mock_users";

// خواندن لیست کامل کاربرهای ثبت‌شده از localStorage
export function getMockUsers() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

// افزودن یک کاربر جدید به لیست (هنگام ثبت‌نام)
export function addMockUser(user) {
    const users = getMockUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

// جستجوی کاربر بر اساس شماره موبایل و رمز عبور (شبیه‌سازی چک سمت سرور هنگام لاگین)
export function findMockUser(phone, password) {
    const users = getMockUsers();
    return users.find((u) => u.phone === phone && u.password === password) || null;
}

// بررسی این‌که آیا این شماره موبایل قبلاً ثبت‌نام کرده یا نه
export function isPhoneTaken(phone) {
    const users = getMockUsers();
    return users.some((u) => u.phone === phone);
}