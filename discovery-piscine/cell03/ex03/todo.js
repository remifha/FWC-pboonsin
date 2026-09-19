const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('newBtn');

window.onload = function() {
    loadListFromCookie();
};

newBtn.addEventListener('click', function() {
    const text = prompt('Enter a new TO DO:');
    if (text && text.trim() !== '') {
        createTodoItem(text.trim());
        saveListToCookie();
    }
});

function createTodoItem(text) {
    const div = document.createElement('div');
    div.textContent = text;

    div.addEventListener('click', function() {
        if (confirm('Do you really want to remove this TO DO?')) {
            div.remove();
            saveListToCookie();
        }
    });

    ftList.insertBefore(div, ftList.firstChild);
}

function saveListToCookie() {
    const items = [];

    const divs = ftList.querySelectorAll('div');
    for (let i = divs.length - 1; i >= 0; i--) {
        items.push(divs[i].textContent);
    }
    
    const jsonString = encodeURIComponent(JSON.stringify(items));
    document.cookie = "todo_list=" + jsonString + ";path=/;max-age=31536000";
}

function loadListFromCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith('todo_list=')) {
            const jsonString = decodeURIComponent(cookie.substring('todo_list='.length));
            try {
                const items = JSON.parse(jsonString);
                items.forEach(text => {
                    createTodoItem(text);
                });
            } catch (e) {
                console.error("Error parsing cookie data:", e);
            }
            break;
        }
    }
}