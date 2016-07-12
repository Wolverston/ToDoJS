window.onload = function() {
    document.getElementById('items').innerHTML = localStorage.getItem('SavedList');  // При загрузке страницы получаем сохраненный список из хранилища
    //Сначала понавешивал на кнопки addEventListener'ы, а потом столкнулся с необходимостью отслеживать щелчки
    //по создаваемым на лету элементам. Решил побаловаться со switch, вроде неплохо получилось.

    document.onclick = function(event) { // Отслеживаем клики на предмет попадания на новосозданные элементы
        var el = event.target;
            switch (el.id){
                case "delStr":  // Обрабатываем кнопку удаления строки
                    par = el.parentNode.parentNode;
                    par.parentNode.removeChild(par);
                    break;

                case "done":    // Оформляем текст по нажатию кнопки с галочкой
                    el.parentNode.style.backgroundColor = 'green';
                    el.parentNode.style.textDecoration = 'line-through';
                    break;

                case "add":     //  Обработка кнопки "добавить"
                    if (!(document.getElementById('item').value == '')) {    // Не даем создать новый элемент,если строка пуста
                        var container = document.createElement('div');  //Создаем новый блок для документа, наполняем его и вставляем в документ
                        container.className = "ToDo";
                        container.style.display = 'block';
                        container.innerHTML = '<p>' + document.getElementById('item').value + '<input type="button" id="delStr"><input type="button" id="done"></p>';
                        document.getElementById('items').appendChild(container);
                        document.getElementById('item').value = ''; //Очищаем строку ввода для следующей записи
                    }
                    break;

                case "eye":     // Обработка кнопки "глаз"
                    var elems = document.getElementsByClassName('ToDo');
                    var counter = 0;
                    for(var el in elems) {
                        if (elems[el].style.display == 'none') {  // Проверяем, есть ли скрытые элементы,
                            // Если есть - открываем глаз, показываем элементы
                            document.getElementById('eye').style.background = '#eee 50% url(OpenEye.png) no-repeat';
                            document.getElementById('eye').style.backgroundSize = '40%';
                            elems[el].style.display = 'block';
                            counter++;
                        } else if (counter == 0) {     //Если нет - закрываем глаз, прячем элементы
                            for(var el in elems) {
                                if (elems[el].children[0].style.backgroundColor == 'green') {
                                    elems[el].style.display = 'none';
                                    document.getElementById('eye').style.background = '#eee 50% url(ClosedEye.png) no-repeat';
                                    document.getElementById('eye').style.backgroundSize = '40%';
                                }
                            }
                        }
                    }
                    break;

                case "broom":   // Обработка кнопки "щетка"
                    document.getElementById('items').innerHTML = '';
                    localStorage.removeItem('SavedList');  // Очищаем хранилище
                    break;
            }
    }

    function save() {                  // Сохраняем список в localStorage
        localStorage.setItem('SavedList', document.getElementById('items').innerHTML);
    }

    document.getElementById('save').addEventListener('click', save);
}