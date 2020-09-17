"use strict"; // Используем строгий режим для учёта областей видимости
let data; // Создаём глобальную переменную для данных хранимых с файла
let pages; // Количество страниц
let elements; // Количество отображаемых элементов
// Создаем асинхронную функция для считывания данных из файла
const getData = async () => {
    const response = await fetch("/json/data.json"); // get users list
    const data = await response.json(); // parse JSON
    return data;
};

function toggle_column(table, node) {
    let table_body = document.getElementById('table_body');
    let rows = table_body.getElementsByTagName('tr');
    let table_head = document.getElementById('table_head');
    let head_rows = table_head.getElementsByTagName('tr');

    for (let row of head_rows) {
        let td = row.getElementsByTagName('th');
        if (td[node].style.display != "none") td[node].style.display = "none"
        else td[node].style.display = "table-cell";
    };
    for (let row of rows) {
        let td = row.childNodes[node];
        if (td.style.display != "none") td.style.display = "none"
        else td.style.display = "table-cell";
    };
    // for (var row=0; row<rows.length;row++) {
    //     let cels = rows[row].getElementsByTagName('td');
    //     cels[column_nr].style.display=cels[column_nr].style.display=="none" ? "" : "none";
    // }
}

// После полной загрузки окна ожидаем получения данных из запроса, затем отрисовываем контент их запроса
window.onload = async function () {
    let load_data = await getData();
    data = load_data;
    render(data);
};

// Функция отрисовки данных из глобали
function render(data) {
    try {
        pages = Number(document.getElementById("pages").value);
        elements = Number(document.getElementById("elements").value);
    } catch (error) {
    // console.log(error);        
    }
    document.body.innerHTML = `<center><h1>Тестовое задание Javascript</h1>
    <label for="firstNameCheck">Имя</label>
    <input name="column" type="checkbox" id="firstNameCheck" value="0" onClick="toggle_column('table', this.value);" checked />
    <label for="firstNameCheck">Фамилия</label>
    <input name="column" type="checkbox" id="lastNameCheck" value="1" onClick="toggle_column('table', this.value);" checked />
    <label for="aboutCheck">О пользователе</label>
    <input name="column" type="checkbox" id="aboutCheck" value="2" onClick="toggle_column('table', this.value);" checked />
    <label for="eyeColorCheck">Цвет глаз</label>
    <input name="column" type="checkbox" id="eyeColorCheck"  value="3" onClick="toggle_column('table', this.value);" checked />
    <label for="pages">Номер страницы</label>
    <input name="column" type="number" id="pages" value="`+ pages + `" onchange="render(data);" />
    <label for="elements">Количество элементов</label>
    <input name="column" type="number" id="elements" value="`+ elements + `" onchange="render(data);" />
    <hr>
    <div class="table">
    <table id="table">
    <thead id="table_head">
    </thead>
    <tbody id="table_body">
    </tbody>
    </table>
    </div>
    </center>`;

    let table = document.getElementById("table_body");
    let table_head = document.getElementById("table_head");
    table_head.innerHTML = `
    <th>
        <a href='javascript:sorting("firstName");'>Имя</a>
    </th>
    <th>
        <a href='javascript:sorting("lastName");'>Фамилия</a>
    </th>
    <th>
        <a href='javascript:sorting("about");'>О пользователе</a>
    </th>
    <th>
        <a href='javascript:sorting("eyeColor");'>Цвет глаз</a>
    </th>`;

    let tr = "";
    let number = 0
    let startIndex = (pages-1) * elements;
    let endIndex = startIndex + elements;
    var pageWisePersonData = data.slice(startIndex,endIndex);

    pageWisePersonData.forEach(element => {
        tr += '<tr id="' + String(element.id) + '">';
        // tr += '<td>' + element.id + '</td>'
        tr += '<td>' + element.name.firstName + '</td>';
        tr += '<td>' + element.name.lastName + '</td>';
        // tr += '<td>' + element.about + '</td>';
        tr += '<td id="' + String(number) + '">' + element.about.slice(0, 80) + '<span id="more' + String(number) + '" style="display: none;">' + element.about.slice(80) + "</span>" + '<a id="myBtn' + String(number) + '" href="javascript:show_me(' + String(number) + ');">...</a></span></td>';
        tr += '<td align="center">' + '<svg height="30" width="30"> <circle cx="15" cy="15" r="10" stroke="black" stroke-width="3" fill="' + element.eyeColor + '" /></svg>' + '</td>';
        tr += '</tr>';
        number += 1
    });
    table.innerHTML = tr;
    load_events();
}

function load_events() {
    let table_tr = document.getElementsByTagName("td");
    for (let element of table_tr) {
        element.onmouseover = element.onmouseout = element.onclick = handler;
    }
};


function sorting(filter) {
    if (filter == "firstName") {
        data.sort(function (a, b) {
            var nameA = a.name.firstName.toLowerCase(), nameB = b.name.firstName.toLowerCase();
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        });
    };
    if (filter == "lastName") {
        data.sort(function (a, b) {
            var nameA = a.name.lastName.toLowerCase(), nameB = b.name.lastName.toLowerCase()
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        })
    };
    if (filter == "about") {
        data.sort(function (a, b) {
            var nameA = a.about.toLowerCase(), nameB = b.about.toLowerCase()
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        })
    };
    if (filter == "eyeColor") {
        data.sort(function (a, b) {
            var nameA = a.eyeColor.toLowerCase(), nameB = b.eyeColor.toLowerCase()
            if (nameA < nameB) //сортируем строки по возрастанию
                return -1
            if (nameA > nameB)
                return 1
            return 0 // Никакой сортировки
        })
    };

    render(data);
}

function handler(event) {
    let target = event.target.closest('tr');
    if (event.type == 'mouseover') {
        target.style.background = 'LightGray';
    }
    if (event.type == 'mouseout') {
        target.style.background = '';
    }
    if (event.type == 'click') {
        if (event.target.nodeName != "A") show_editing(target);
    }
}

function show_editing(target) {
    document.body.innerHTML = "";
    document.body.innerHTML = render_edit(target);
    document.getElementById("cancel").onclick = function () {
        render(data);
    }
    document.getElementById("reset").onclick = function () {
        show_editing(target);
    }
}

function render_edit(target) {
    let element = find_data(target.id);
    let html = '<center><div class="table"><table><thead id="table_head"><tr><th>ID</th><th>Имя</th><th>Фамилия</th><th>Номер телефона</th><th>О себе</th><th>Цвет глаз</th></tr></thead><tbody id="table_body">';
    html += '<td><input type="text" id="id" value="' + element.id + '"></input></td>';
    html += '<td><input type="text" id="firstName" value="' + element.name.firstName + '"></input></td>';
    html += '<td><input type="text" id="lastName" value="' + element.name.lastName + '"></input></td>';
    html += '<td><input type="text" id="phone" value="' + element.phone + '"></input></td>';
    html += '<td><input type="text" id="about" value="' + element.about + '"></input></td>';
    html += '<td><input type="text" id="eyeColor" value="' + element.eyeColor + '"></input></td>';
    html += '</tbody></table></div>';
    html += '<hr><div class="table"><input type="reset" id="reset"></input><input type="submit" id="senddata"></input><input type="button" id="cancel" value="Отмена"></input></center>';
    return html
};



function find_data(id) {
    let value = ""
    data.forEach(element => {
        if (element.id == id) {
            value = element;
        }
    });
    return value;
};

function show_me(eventer) {
    let moreText = document.getElementById("more" + String(eventer));
    let btnText = document.getElementById("myBtn" + String(eventer));
    let tr = document.getElementById(eventer)

    if (moreText.style.display != "none") {
        btnText.innerHTML = "...";
        moreText.style.display = "none";
    } else {
        btnText.innerHTML = "<br>(less)";
        moreText.style.display = "inline";
    }
};
