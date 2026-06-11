//6
function solveFirstProblem(){
	let isContinue=true;
	do{
		let answer = prompt("Введіть вирішення задачки (у форматі '1. (хід фігурою)')");
		if(answer === null) {
			break;
		}
		let cleanAnswer = answer.replace(/\s+/g, '').toLowerCase();
		if(cleanAnswer === "1.qh6"){
			isContinue=false;
			alert("Правильно! Молодець!");
		}
		else{
			isContinue = confirm("Неправильно... Спробувати знову?");
		}
	}while(isContinue);
} //діалог з користувачем


function displayMe(lastName, firstName, jobPosition="Студент"){
	alert("Розробник: "+lastName+" "+firstName+". Посада: "+jobPosition);
}//інформація про розробника



function compareStrings(str1, str2){
	if(str1.length>str2.length){
		alert("Довший рядок - перший: "+str1);
	}
	else if(str1.length<str2.length){
		alert("Довший рядок - другий: "+str2);
	}
	else{
		alert("Рядки"+"'"+str1+"'"+" і "+"'"+str2+"'"+" однакові");
	}
}
function enterStrings(){
	let text1=prompt("Перший рядочок");
	let text2=prompt("Другий рядочок");
	if(text1!=null&&text2!=null){
	compareStrings(text1, text2);
	}
} //порівняння рядків


function changeBackground() {
	document.body.style.background = "red";
	setTimeout(() => document.body.style.background = "", 30000);
}//зміна кольору фону

function anotherPage() {
	location.href="chess_champions.html";
}//перехід на іншу сторінку





// Функція для створення кнопок керування та увімкнення режиму редагування таблиці
function makeTableEditable() {
    let table = document.getElementById("main-champions-table");
    if (!table) return;
    let rows = table.querySelectorAll("tr");
    rows.forEach((row, index) => {
        if (row.querySelector("th") || index === 0) return;

        if (!row.querySelector(".delete-btn")) {
            let actionCell = document.createElement("td");
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Видалити";
            deleteBtn.className = "delete-btn";
            deleteBtn.style.backgroundColor = "#e74c3c";
            deleteBtn.style.color = "white";
            deleteBtn.style.width = "70px";
            deleteBtn.style.height = "1.8rem";
            
            deleteBtn.onclick = function() {
                if (confirm("Ви впевнені, що хочете видалити цей рядок?")) {
                    row.remove();
                }
            };
            actionCell.appendChild(deleteBtn);
            row.appendChild(actionCell);
        }

        let cells = row.querySelectorAll("td");
        cells.forEach((cell, cellIndex) => {
            if (cellIndex !== 1 && cellIndex !== cells.length - 1) {
                cell.setAttribute("contenteditable", "true");
                cell.title = "Клікніть, щоб редагувати текст";
                cell.style.cursor = "pointer";
                cell.style.borderBottom = "1px dashed #FFD700";
            }
        });
    });
    
    alert("Таблиця готова до редагування! Клікніть на будь-який текст для зміни, або на кнопку 'Видалити'.");
}



function insertInteractiveRow() {
    let table = document.getElementById("main-champions-table");
    if (!table) return;

    let newRow = document.createElement("tr");

    // Комірка 1: Номер
    let tdId = document.createElement("td");
    tdId.textContent = "?"; 
    tdId.setAttribute("contenteditable", "true");
    newRow.appendChild(tdId);

    // Комірка 2: Фото
    let tdPhoto = document.createElement("td");
    tdPhoto.innerHTML = "<span style='color: #888;'><i>Без фото</i></span>"; 
    newRow.appendChild(tdPhoto);

    // Комірка 3: Ім'я
    let tdName = document.createElement("td");
    let nameTextNode = document.createTextNode("Редагувати ім'я"); 
    tdName.appendChild(nameTextNode);
    tdName.setAttribute("contenteditable", "true");
    
	
    console.log("Текстовий вузол через nodeValue:", nameTextNode.nodeValue);
    console.log("Текстовий вузол через data:", nameTextNode.data);
    
    newRow.appendChild(tdName);

    // Комірка 4: Роки
    let tdYears = document.createElement("td");
    tdYears.textContent = "2026—...";
    tdYears.setAttribute("contenteditable", "true");
    newRow.appendChild(tdYears);

    // Комірка 5: Країна
    let tdCountry = document.createElement("td");
    tdCountry.textContent = "Україна";
    tdCountry.setAttribute("contenteditable", "true");
    newRow.appendChild(tdCountry);

    // Комірка 6: Кнопка видалення для нового рядка
    let tdAction = document.createElement("td");
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Видалити";
    deleteBtn.style.backgroundColor = "#e74c3c";
    deleteBtn.style.color = "white";
    deleteBtn.style.width = "70px";
    deleteBtn.style.height = "1.8rem";
    deleteBtn.onclick = function() { newRow.remove(); };
    tdAction.appendChild(deleteBtn);
    newRow.appendChild(tdAction);

    table.append(newRow); 
	
    let alertMsg = document.createElement("div");
    alertMsg.id = "temp-alert";
    alertMsg.style.color = "#FFD700";
    alertMsg.textContent = "[DOM сповіщення]: Рядок успішно додано!";
    
    table.prepend(alertMsg); 
    let logP = document.createElement("p");
    logP.innerHTML = "<i>Останній лог структури DOM оновлено.</i>";
    table.after(logP);


    console.log("OuterHTML нового інтерактивного рядка:", newRow.outerHTML);

    setTimeout(() => {
        let doneSpan = document.createElement("span");
        doneSpan.textContent = " [Редактор активний] ";
        
        alertMsg.replaceWith(doneSpan);
        logP.remove();
        doneSpan.remove();
    }, 3000);
}