```javascript
document.addEventListener('DOMContentLoaded', () => {
    const keywordSearch = document.getElementById('keyword-search');
    const relatedSearch = document.getElementById('related-search');
    const addKeywordBtn = document.getElementById('add-keyword');
    const addRelatedBtn = document.getElementById('add-related');
    const keywordList = document.getElementById('keyword-list');
    const relatedList = document.getElementById('related-list');
    const keywords = [];
    const results = []; // { text: "Result", linkedKeywords: [] }
    function renderList(listEl, data, isKeyword) {
        listEl.innerHTML = '';
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = <div>${item.text}</div><span>${isKeyword ? '' : item.linkedKeywords.length + ' assoc.'}</span>;
            li.onclick = () => {
                if (!isKeyword) {
                    const keywordSelected = document.querySelector('#keyword-list .selected');
                    if (keywordSelected) {
                        const keyword = keywords[keywordSelected.dataset.index];
18h08
const idx = item.linkedKeywords.indexOf(keyword.text);
                        if (idx === -1) {
                            item.linkedKeywords.push(keyword.text);
                            li.classList.add('selected');
                        } else {
                            item.linkedKeywords.splice(idx, 1);
                            li.classList.remove('selected');
                        }
                        renderList(relatedList, results, false);
                    }
                } else {
                    const allKeywords = document.querySelectorAll('#keyword-list li');
                    allKeywords.forEach(kw => kw.classList.remove('selected'));
                    li.classList.add('selected');
                    renderList(relatedList, results, false);
                }
            };
            li.dataset.index = index;
            listEl.appendChild(li);
        });
    }
    function addItem(inputId, dataArray, isKeyword) {
        const newItemText = inputId.value.trim();
        if (newItemText) {
            if (isKeyword) {
                keywords.push({ text: newItemText });
                renderList(keywordList, keywords, true);
            } else {
                results.push({ text: newItemText, linkedKeywords: [] });
                renderList(relatedList, results, false);
            }
            inputId.value = '';
        }
    }
    addKeywordBtn.onclick = () => addItem(keywordSearch, keywords, true);
    addRelatedBtn.onclick = () => addItem(relatedSearch, results, false);
    keywordSearch.addEventListener('input', () => {
        const query = keywordSearch.value.toLowerCase();
        const filteredKeywords = keywords.filter(k => k.text.toLowerCase().includes(query));
        renderList(keywordList, filteredKeywords, true);
    });
    relatedSearch.addEventListener('input', () => {
        const query = relatedSearch.value.toLowerCase();
        const filteredRelated = results.filter(r => r.text.toLowerCase().includes(query));
        renderList(relatedList, filteredRelated, false);
    });
    renderList(keywordList, keywords, true);
    renderList(relatedList, results, false);
});
```
