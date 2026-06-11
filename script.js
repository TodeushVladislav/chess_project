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







function glowOnHover(event) {
    event.currentTarget.style.borderColor = "#FFD700";
    event.currentTarget.style.boxShadow   = "0 0 14px 3px rgba(255,215,0,0.55)";
}


document.querySelectorAll(".portrait-card").forEach(function(card) {
    card.onmouseout = function(event) {
        event.currentTarget.style.borderColor = "#4b5563";
        event.currentTarget.style.boxShadow   = "";
        document.getElementById("portrait-tooltip").style.display = "none";
    };
});
 
 
function showChampionAlert(event) {
    let card  = event.currentTarget;
    let name    = card.dataset.name;
    let years   = card.dataset.years;
    let country = card.dataset.country;
    alert("♟ " + name + "\nРоки: " + years + "\nКраїна: " + country);
}
 

function logCurrentTarget(event) {
    console.log("addEventListener: клік на", event.currentTarget.dataset.name,
                "| event.currentTarget:", event.currentTarget);
}
 
document.querySelectorAll(".portrait-card").forEach(function(card) {
    card.addEventListener("click", showChampionAlert);
    card.addEventListener("click", logCurrentTarget);
});
 
 
 
 
 
let tooltipHandler = {
    handleEvent(event) {
        let card = event.currentTarget;
        let tooltip = document.getElementById("portrait-tooltip");
 
        if (event.type === "mousemove") {
            tooltip.innerHTML =
                "<b>" + card.dataset.name + "</b><br>" +
                "📅 " + card.dataset.years + " · " + card.dataset.country + "<br>" +
                "<i style='color:#aaa'>" + card.dataset.fact + "</i>";
            tooltip.style.display = "block";
            tooltip.style.left = (event.clientX + 14) + "px";
            tooltip.style.top = (event.clientY - 10) + "px";
        }
    }
};
 
document.querySelectorAll(".portrait-card").forEach(function(card) {
    card.addEventListener("mousemove", tooltipHandler);
});
 
 
 

setTimeout(function() {
    document.querySelectorAll(".portrait-card").forEach(function(card) {
        card.removeEventListener("mousemove", tooltipHandler);
    });
}, 20000);
 
 

let championsTable = document.getElementById("main-champions-table");
let selectedRow    = null;
 
if (championsTable) {
    championsTable.onclick = function(event) {
        let td = event.target.closest("td");
        if (!td) return;
        let row = td.parentElement;
        if (!row || row.querySelector("th")) return;
 
        if (selectedRow) selectedRow.classList.remove("row-selected");
        selectedRow = row;
        selectedRow.classList.add("row-selected");
    };
}
 
 
 
 
class GalleryMenu {
    constructor(elem) {
        this._elem = elem;
        elem.onclick = this.onClick.bind(this);
    }

    filterAll() {
        document.querySelectorAll(".portrait-card").forEach(c => c.classList.remove("hidden-card"));
        this._setActive("filterAll");
    }
    filterSoviet() {
        document.querySelectorAll(".portrait-card").forEach(function(card) {
            let isSoviet = card.dataset.country && card.dataset.country.includes("СРС");
            card.classList.toggle("hidden-card", !isSoviet);
        });
        this._setActive("filterSoviet");
    }
    filterModern() {
        let modernNames = ["Карлсен", "Гукеш", "Дін"];
        document.querySelectorAll(".portrait-card").forEach(function(card) {
            let isModern = modernNames.some(n => card.dataset.name && card.dataset.name.includes(n));
            card.classList.toggle("hidden-card", !isModern);
        });
        this._setActive("filterModern");
    }
    filterUSA() {
        document.querySelectorAll(".portrait-card").forEach(function(card) {
            let isWest = card.dataset.country && (
                card.dataset.country.includes("США") ||
                card.dataset.country.includes("Норвег") ||
                card.dataset.country.includes("Захід")
            );
            card.classList.toggle("hidden-card", !isWest);
        });
        this._setActive("filterUSA");
    }
 
    _setActive(action) {
        document.querySelectorAll(".gallery-btn[data-action]").forEach(btn => btn.classList.remove("active"));
        let activeBtn = document.querySelector(".gallery-btn[data-action='" + action + "']");
        if (activeBtn) activeBtn.classList.add("active");
    }
 
    onClick(event) {
        let action = event.target.dataset.action;
        if (action && typeof this[action] === "function") {
            this[action]();
        }
    }
}
 
let galleryControlsEl = document.getElementById("gallery-controls");
if (galleryControlsEl) {
    let menu = new GalleryMenu(galleryControlsEl);
    menu.filterAll();
}
 
   
document.addEventListener("click", function(event) {
    let toggleId = event.target.dataset.toggleId;
    if (!toggleId) return;
    let target = document.getElementById(toggleId);
    if (target) target.hidden = !target.hidden;
});




//8
let mouseGallery = document.getElementById("mouse-event-gallery");
let mouseLog     = document.getElementById("mouse-log");
 
function getCardName(el) {
    if (!el) return null;
    let card = el.closest ? el.closest(".drag-card") : null;
    return card ? card.dataset.name : null;
}
 
function addLog(type, targetEl, relatedEl) {
    if (!mouseLog) return;
 
    let targetName   = getCardName(targetEl)   || (targetEl   ? targetEl.tagName   : "null");
    let relatedName  = getCardName(relatedEl)  || (relatedEl  ? relatedEl.tagName  : "null");
 
    let span = document.createElement("span");
    span.className = type === "mouseover" ? "log-over" : "log-out";
    let relClass = relatedEl ? "" : " log-null";
 
    mouseLog.innerHTML +=
        "<div class='" + span.className + "'>" +
        (type === "mouseover" ? "▶ mouseover" : "◀ mouseout ") +
        "  target=<b>" + targetName + "</b>" +
        "  relatedTarget=<span class='" + relClass + "'>" + relatedName + "</span>" +
        "</div>";
 
    mouseLog.scrollTop = mouseLog.scrollHeight;
}
 
if (mouseGallery) {
    mouseGallery.addEventListener("mouseover", function(event) {
        let card = event.target.closest(".drag-card");
        if (!card) return;
        card.classList.add("hovered");
        addLog("mouseover", event.target, event.relatedTarget);
    });
 
    mouseGallery.addEventListener("mouseout", function(event) {
        let card = event.target.closest(".drag-card");
        if (!card) return;
        let toCard = event.relatedTarget ? event.relatedTarget.closest(".drag-card") : null;
        if (toCard === card) return;
        card.classList.remove("hovered");
        addLog("mouseout", event.target, event.relatedTarget);
    });
}
 
let logClear = document.getElementById("mouse-log-clear");
if (logClear) {
    logClear.onclick = function() { mouseLog.innerHTML = ""; };
}
 
 
let ghost          = null; 
let draggedCard    = null; 
let dragShiftX     = 0;
let dragShiftY     = 0;
let currentDroppable = null;
 
function createGhost(card) {
    let g = document.createElement("div");
    g.id = "drag-ghost";
    let img = card.querySelector("img");
    let label = card.querySelector(".drag-label");
    if (img) {
        let imgClone = document.createElement("img");
        imgClone.src = img.src;
        imgClone.alt = img.alt;
        g.appendChild(imgClone);
    }
    if (label) {
        let lClone = document.createElement("div");
        lClone.className = "drag-label";
        lClone.textContent = label.textContent;
        g.appendChild(lClone);
    }
    document.body.appendChild(g);
    return g;
}
 
function moveGhost(pageX, pageY) {
    if (!ghost) return;
    ghost.style.left = (pageX - dragShiftX) + "px";
    ghost.style.top  = (pageY - dragShiftY) + "px";
}
 
function enterDroppable(zone) {
    zone.classList.add("drop-active");
}
function leaveDroppable(zone) {
    zone.classList.remove("drop-active");
}
 
let dndWorkspace = document.getElementById("dnd-workspace");
 
if (dndWorkspace) {
    dndWorkspace.addEventListener("mousedown", function(event) {
        let card = event.target.closest(".drag-card");
        if (!card) return;
        if (event.button !== 0) return;
 
        draggedCard = card;
 
 
        let rect = card.getBoundingClientRect();
        dragShiftX = event.clientX - rect.left;
        dragShiftY = event.clientY - rect.top;
 
 
        ghost = createGhost(card);
        ghost.style.width = card.offsetWidth + "px";
 
        moveGhost(event.pageX, event.pageY);
 
        card.classList.add("dragging");
 
        event.preventDefault(); 
    });
}
 
 
document.addEventListener("mousemove", function(event) {
    if (!draggedCard || !ghost) return;
 
    moveGhost(event.pageX, event.pageY);
 
 
    ghost.hidden = true;
    let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
    ghost.hidden = false;
 
    if (!elemBelow) return;
 
    let droppableBelow = elemBelow.closest(".droppable");
 
 
    if (currentDroppable !== droppableBelow) {
        if (currentDroppable) leaveDroppable(currentDroppable);
        currentDroppable = droppableBelow;
        if (currentDroppable) enterDroppable(currentDroppable);
    }
});
 
 
document.addEventListener("mouseup", function(event) {
    if (!draggedCard || !ghost) return;
 
 
    ghost.parentNode.removeChild(ghost);
    ghost = null;
 
 
    draggedCard.classList.remove("dragging");
 
 
    if (currentDroppable) {
        leaveDroppable(currentDroppable);
 
 
        let hint = document.getElementById("dnd-drop-hint");
 
 
        let existingCard = currentDroppable.querySelector(".drag-card");
        if (existingCard) {
            document.getElementById("dnd-source-zone").appendChild(existingCard);
        }
 
        currentDroppable.appendChild(draggedCard);
        if (hint) hint.style.display = "none";
 
 
        let result = document.getElementById("dnd-result");
        let resultText = document.getElementById("dnd-result-text");
        if (result && resultText) {
            resultText.textContent = "Ваш вибір: " + draggedCard.dataset.name + " — відмінний смак!";
            result.hidden = false;
        }
    }
 
    currentDroppable = null;
    draggedCard = null;
});
 
 
 
document.querySelectorAll(".drag-card, .drag-card img").forEach(function(el) {
    el.ondragstart = function() { return false; };
});