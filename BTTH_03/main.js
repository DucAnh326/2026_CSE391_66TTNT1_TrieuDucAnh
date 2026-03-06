console.log("Hello from JavaScript!");

let name = "Anh";
let yearOfBirth = 2006;
let currentYear = 2026;
let age = currentYear - yearOfBirth;

console.log("Xin chào, mình là " + name + ", năm nay mình " + age + " tuổi.");

// TODO: Đổi giá trị score và quan sát kết quả
let score = 9;

// TODO: Viết hàm tính điểm trung bình 3 môn
function tinhDiemTrungBinh(m1, m2, m3) {
  let avg = (m1 + m2 + m3) / 3;
  return avg;
}

function xepLoai(avg) {
  if (avg >= 8) {
  return "Giỏi";
} else if (avg >= 6.5) {
  return "Khá";
} else if (avg >= 5) {
  return "Trung bình";
} else {
  return "Yếu";
}
}

let avg = tinhDiemTrungBinh(8, 7, 9);
let loai = xepLoai(avg);
console.log("Điểm TB:", avg, " - Xếp loại:", loai);

function kiemTraTuoi(age) {
  if (age >= 18) {
    console.log("Đủ 18 tuổi");
  } else {
    console.log("Chưa đủ 18 tuổi");
  }
}
kiemTraTuoi(age);