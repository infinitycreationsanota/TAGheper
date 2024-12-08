const API_URL = 'https://script.google.com/a/macros/anota.ai/s/AKfycbzdH31s4oohxHQdMG-eN2jShy2MZzPGpTAwu1iE1MzAgKBK1GtFYBZ1oMJsdtDfgA3-/exec';

async function fetchData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}

async function postData(type, text) {
    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ type, text })
    });
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

    let keywords = [];
    let relateds = [];

    function renderList(listEl, data, type) {
        listEl.innerHTML = '';
        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            li.onclick = () => toggleSelection(item, type, li);
            listEl.appendChild(li);
        });
    }

    function toggleSelection(item, type, li) {
        li.classList.toggle('selected');
        if (type === 'keyword') {
            // Handle keyword selection logic
        }
    }

    addKeywordBtn.onclick = async () => {
        const newKeywordText = keywordSearch.value.trim();
        if (newKeywordText) {
            await postData('keyword', newKeywordText);
            keywords.push(newKeywordText);
            renderList(keywordList, keywords, 'keyword');
            keywordSearch.value = '';
        }
    };

    addRelatedBtn.onclick = async () => {
        const newRelatedText = relatedSearch.value.trim();
        if (newRelatedText) {
            await postData('related', newRelatedText);
            relateds.push(newRelatedText);
            renderList(relatedList, relateds, 'related');
            relatedSearch.value = '';
        }
    };

    fetchData().then(data => {
        keywords = data.palavrasChave;
        relateds = data.relacionados;
        renderList(keywordList, keywords, 'keyword');
        renderList(relatedList, relateds, 'related');
    });
});
