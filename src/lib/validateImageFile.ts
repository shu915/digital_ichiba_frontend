const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

const validateImageFile = (file: File | null) => {
  if (!file) return null;
  if (!ALLOWED_FILE_TYPES.includes(file.type)) return "画像ファイルを選択してください";
  if (file.size > MAX_FILE_SIZE) return "5MB以下の画像を選択してください";
  return null;
};

export default validateImageFile;