import { toast } from "react-toastify";
import axios from "axios";

export const onUpload = async (file, onUploadProgressHandle = () => { }) => {
    if (!file) return toast.warning('ابتدا یک فایل انتخاب کنید');
    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await axios.post('/api/storage/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: onUploadProgressHandle
        })
        toast.success(`آپلود موفق`);
        return res.data
    } catch (err) {
        console.error(err);
        toast.error('خطا در آپلود');
    }
};
export const onDownload = async (key) => {
    if (!key) return toast.warning('نام فایل را وارد کنید');
    try {
        const res = await axios.get(`/api/storage/download/${encodeURIComponent(key)}`, {
            responseType: 'blob'
        });
        // ایجاد لینک موقت و کلیک کردن
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = key;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success('دانلود شروع شد');
    } catch (err) {
        console.error(err);
        toast.error('خطا در دانلود یا فایل یافت نشد');
    }
};

export const onDeleteFile = async (key) => {
  if (!key) {
    toast.warning("ابتدا یک فایل برای حذف مشخص کنید");
    return;
  }

  try {
    // 1) اگر API‌تون DELETE /api/storage/delete/:key باشه:
    const res = await axios.delete(`/api/storage/delete/${encodeURIComponent(key)}`);

    // یا اگر API برای delete‌ نیاز به ارسال body داره:
    // const res = await axios.delete("/api/storage/delete", { data: { key } });

    toast.success("فایل با موفقیت حذف شد");
    return res.data;
  } catch (err) {
    console.error("Error deleting file:", err);
    toast.error("حذف فایل ناموفق بود");
    throw err;
  }
};