$(document).ready(function() {
    loadListFromCookie();

    $('#newBtn').click(function() {
        const text = prompt('Enter a new TO DO:');
        if (text && text.trim() !== '') {
            createTodoItem(text.trim());
            saveListToCookie();
        }
    });

    function createTodoItem(text) {
        const $div = $('<div></div>').text(text);

        $div.click(function() {
            if (confirm('Do you really want to remove this TO DO?')) {
                $(this).remove();
                saveListToCookie();
            }
        });
        $('#ft_list').prepend($div);
    }

    function saveListToCookie() {
        const items = [];

        $($('#ft_list div').get().reverse()).each(function() {
            items.push($(this).text());
        });

        const jsonString = encodeURIComponent(JSON.stringify(items));
        document.cookie = "todo_list=" + jsonString + ";path=/;max-age=31536000";
    }

    function loadListFromCookie() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = $.trim(cookie);
            if (cookie.indexOf('todo_list=') === 0) {
                const jsonString = decodeURIComponent(cookie.substring('todo_list='.length));
                try {
                    const items = JSON.parse(jsonString);
                    $.each(items, function(index, text) {
                        createTodoItem(text);
                    });
                } catch (e) {
                    console.error("Error parsing cookie:", e);
                }
                break;
            }
        }
    }
});