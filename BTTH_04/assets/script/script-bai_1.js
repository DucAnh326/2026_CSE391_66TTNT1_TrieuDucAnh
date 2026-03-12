//---Initialization---
let students = [];
let sortDirection = 0; // 0: none, 1: asc, 2: desc

const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const addBtn = document.getElementById('addBtn');
const tableBody = document.getElementById('tableBody');
const summary = document.getElementById('summary');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filter'); 
const scoreHeader = document.querySelector('th:nth-child(3)');

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

    // Sắp xếp trên bản sao để không hỏng mảng gốc
    let displayList = [...students];
    if (sortDirection === 1) {
        displayList.sort((a, b) => a.score - b.score);
        scoreHeader.innerHTML = 'Điểm ▲';
    } else if (sortDirection === 2) {
        displayList.sort((a, b) => b.score - a.score);
        scoreHeader.innerHTML = 'Điểm ▼';
    } else {
        scoreHeader.innerHTML = 'Điểm';
    }

    displayList.forEach((item, index) => {
        totalScore += item.score;
        const rank = getRank(item.score);
        
        const tr = document.createElement('tr');
        if (item.score < 5) tr.classList.add('is-weak');

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.score}</td>
            <td>${rank}</td>
            <td><button class="del-btn" data-id="${students.indexOf(item)}">Xóa</button></td>
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
    const rows = tableBody.querySelectorAll('tr:not(#searchResult)');
    let hasVisibleRows = false;

    rows.forEach(row => {
        const nameText = row.children[1].innerText.toLowerCase();
        const match = nameText.indexOf(filter) > -1;
        row.style.display = match ? '' : 'none';
        if (match) hasVisibleRows = true;
    });

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

scoreHeader.style.cursor = 'pointer';
scoreHeader.onclick = () => {
    sortDirection = sortDirection === 1 ? 2 : 1;
    render();
};


//---Initial render---
//---Generate random data---
const firstNames = ["Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Vũ", "Võ", "Đặng", "Bùi", "Đỗ"];
const lastNames = ["Anh", "Bình", "Chi", "Dũng", "Em", "Giang", "Hương", "Khánh", "Linh", "Minh"];

for (let i = 0; i < 10; i++) {
    const randomName = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    const randomScore = parseFloat((Math.random() * 10).toFixed(1));
    students.push({ name: randomName, score: randomScore });
}
render();
//------------------------------------------------------