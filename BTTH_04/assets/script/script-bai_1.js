//---Initialization---
let students = [];

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const addBtn = document.getElementById('addBtn');
const tableBody = document.getElementById('tableBody');
const summary = document.getElementById('summary');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filter'); 

//---Functions---
function getRank(s) {
    if (s >= 8.5) return "Giỏi";
    if (s >= 7.0) return "Khá";
    if (s >= 5.0) return "Trung bình";
    return "Yếu";
}

function render() {
    tableBody.innerHTML = '';
    let totalScore = 0;

    students.forEach((item, index) => {
        totalScore += item.score;
        const rank = getRank(item.score);
        
        const tr = document.createElement('tr');
        if (item.score < 5) tr.classList.add('is-weak');

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.score}</td>
            <td>${rank}</td>
            <td><button class="del-btn" data-id="${index}">Xóa</button></td>
        `;
        tableBody.appendChild(tr);
    });

    const avg = students.length > 0 ? (totalScore / students.length).toFixed(2) : 0;
    summary.innerText = `Tổng số: ${students.length} | Điểm trung bình: ${avg}`;
}

function handleAdd() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!name || isNaN(score) || score < 0 || score > 10) {
        alert("Nhập sai dữ liệu! Tên không được để trống và điểm phải từ 0 đến 10.");
        return;
    }

    students.push({ name, score });
    
    nameInput.value = '';
    scoreInput.value = '';
    nameInput.focus();
    
    render();
}

function handleSearch() {
    const filter = searchInput.value.toLowerCase();
    let hasVisibleRows = false;

    for (let i = 0; i < students.length; i++) {
        const match = students[i].name.toLowerCase().indexOf(filter) > -1;
        tableBody.children[i].style.display = match ? '' : 'none';
        if (match) hasVisibleRows = true;
    }

    noResultStatus(hasVisibleRows);
}

function noResultStatus(hasVisibleRows) {
    const oldResult = document.getElementById('searchResult');
    if (oldResult) oldResult.remove();

    if (!hasVisibleRows && students.length > 0) {
        const tr = document.createElement('tr');
        tr.id = 'searchResult';
        tr.innerHTML = `<td colspan="5" style="text-align: center; color: red;">Không có kết quả</td>`;
        tableBody.appendChild(tr);
    }
}
//---Event listeners---
addBtn.onclick = handleAdd;

scoreInput.onkeyup = (e) => {
    if (e.key === 'Enter') handleAdd();
};

tableBody.onclick = (e) => {
    if (e.target.classList.contains('del-btn')) {
        const index = e.target.dataset.id;
        students.splice(index, 1);
        render();
    }
};

searchInput.onkeyup = handleSearch;
