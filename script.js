```javascript
document.addEventListener('DOMContentLoaded', function() {
    const keyList = document.getElementById('key-list');
    const resultList = document.getElementById('result-list');
    const addKeyBtn = document.getElementById('add-key');
    const addResultBtn = document.getElementById('add-result');
    const keySearch = document.getElementById('key-search');
    const resultSearch = document.getElementById('result-search');
    const keys = [];  // This array will hold key objects
    const results = [];  // This array will hold result objects
    function renderList(listElement, data) {
        listElement.innerHTML = '';
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = item.text;
            const deleteBtn = document.createElement('button');
17h16
deleteBtn.textContent = 'X';
            deleteBtn.onclick = () => {
                data.splice(index, 1);
                renderList(listElement, data);
            };
            li.appendChild(deleteBtn);
            listElement.appendChild(li);
        });
    }
    function addItem(dataArray, itemText) {
        const newItem = { text: itemText, related: [] };
        dataArray.push(newItem);
        return newItem;
    }
    addKeyBtn.addEventListener('click', () => {
        const newKey = prompt('Digite a nova palavra-chave:');
        if (newKey) {
            addItem(keys, newKey);
            renderList(keyList, keys);
        }
    });
    addResultBtn.addEventListener('click', () => {
        const newResult = prompt('Digite o novo resultado:');
        if (newResult) {
            addItem(results, newResult);
            renderList(resultList, results);
        }
    });
    keySearch.addEventListener('input', () => {
        const query = keySearch.value.toLowerCase();
        const filteredKeys = keys.filter(k => k.text.toLowerCase().includes(query));
        renderList(keyList, filteredKeys);
    });
    resultSearch.addEventListener('input', () => {
        const query = resultSearch.value.toLowerCase();
        const filteredResults = results.filter(r => r.text.toLowerCase().includes(query));
        renderList(resultList, filteredResults);
    });
    // Render initial lists
    renderList(keyList, keys);
    renderList(resultList, results);
});
```
