javascript
document.addEventListener('DOMContentLoaded', () => {
    const keyList = document.getElementById('keys');
    const resultList = document.getElementById('results');
    const addKeyBtn = document.getElementById('add-key');
    const addResultBtn = document.getElementById('add-result');

    const keys = [];
    const results = [];

    function renderList(listElement, data) {
        listElement.innerHTML = '';
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.onclick = () => {
                data.splice(index, 1);
                renderList(listElement, data);
            };
            li.appendChild(deleteBtn);
            listElement.appendChild(li);
        });
    }

    function addItem(listElement, data) {
        const newItem = prompt('Digite o novo item:');
        if (newItem) {
            data.push(newItem);
            renderList(listElement, data);
        }
    }

    addKeyBtn.addEventListener('click', () => addItem(keyList, keys));
    addResultBtn.addEventListener('click', () => addItem(resultList, results));

    renderList(keyList, keys);
    renderList(resultList, results);
});