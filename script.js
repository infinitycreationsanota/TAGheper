```javascript
const API_URL = 'https://script.google.com/macros/library/d/17sNK2Xa0FaIJ6q0Jxim-vgCLFkwT270_iOpJaQ26RbZJAvSIDTJFGnID/2'; // Substitua pela URL do seu serviço Google Apps Script

async function fetchKeywords() {
    const response = await fetch(API_URL);
    const keywords = await response.json();
    return keywords;
}

async function addKeyword(keywordText) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ keyword: keywordText })
    });

    const newKeyword = await response.json();
    return newKeyword;
}

document.addEventListener('DOMContentLoaded', () => {
    const keywordSearch = document.getElementById('keyword-search');
    const relatedSearch = document.getElementById('related-search');
    const searchKeywordBtn = document.getElementById('search-keyword');
    const searchRelatedBtn = document.getElementById('search-related');
    const addKeywordBtn = document.getElementById('add-keyword');
    const addRelatedBtn = document.getElementById('add-related');
    const keywordList = document.getElementById('keyword-list');
    const relatedList = document.getElementById('related-list');

    const keywords = [];
    const results = []; // { text: "Relacionado", linkedKeywords: [] }

    function renderList(listEl, data, type) {
        listEl.innerHTML = '';
        data.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = item.keyword || item.text;
            li.classList.toggle('selected', item.selected || false);
            li.onclick = () => toggleSelection(item, type);
            listEl.appendChild(li);
        });
    }

    function toggleSelection(item, type) {
        if (type === 'keyword') {
            // Toggle keyword selection and refresh related list
            item.selected = !item.selected;
            renderList(relatedList, results, 'related');
        } else {
            // Toggle related selection
            const selectedKeyword = keywords.find(k => k.selected);
            const index = item.linkedKeywords.indexOf(selectedKeyword.keyword);
            if (index === -1) {
                item.linkedKeywords.push(selectedKeyword.keyword);
            } else {
                item.linkedKeywords.splice(index, 1);
            }
            renderList(relatedList, results, 'related');
        }
    }

    searchKeywordBtn.onclick = () => {
        const query = keywordSearch.value.toLowerCase();
        const filteredKeywords = keywords.filter(k => k.keyword.toLowerCase().includes(query));
        renderList(keywordList, filteredKeywords, 'keyword');
    };

    searchRelatedBtn.onclick = () => {
        const query = relatedSearch.value.toLowerCase();
        const filteredRelated = results.filter(r => r.text.toLowerCase().includes(query));
        renderList(relatedList, filteredRelated, 'related');
    };

    addKeywordBtn.onclick = async () => {
        const newKeywordText = keywordSearch.value.trim();
        if (newKeywordText) {
            const newKeyword = await addKeyword(newKeywordText);
            keywords.push(Object.assign(newKeyword, { selected: false }));
            renderList(keywordList, keywords, 'keyword');
            keywordSearch.value = '';
        }
    };

    addRelatedBtn.onclick = () => {
        const newRelatedText = relatedSearch.value.trim();
        if (newRelatedText) {
            results.push({ text: newRelatedText, linkedKeywords: [] });
            renderList(relatedList, results, 'related');
            relatedSearch.value = '';
        }
    };

    // Chame fetchKeywords() para popular a lista inicial


fetchKeywords().then(fetchedKeywords => {
        fetchedKeywords.forEach(item => keywords.push(Object.assign(item, { selected: false })));
        renderList(keywordList, keywords, 'keyword');
    });
});

```
