function removeHistoryElem(evt) {
    const index = evt.currentTarget.dataset.index;
    evt.currentTarget.parentElement.remove();
    const history = JSON.parse(localStorage.getItem('form-history'));
    history.splice(index, 1);
    localStorage.setItem('form-history', JSON.stringify(history));
}

function renderItem(name, value) {
    const item = document.createElement('p');
    item.classList.add(`card-${name}`);
    item.innerText = value;

    return item;
}

function renderHistoryElem(data, index) {
    const elem = document.createElement('div');
    elem.classList.add('submit-history-card');

    Object.entries(data).forEach(([key, value]) => {
        elem.append(renderItem(key, value));
    });

    const button = document.createElement('button');
    button.innerText = 'Delete';
    button.classList.add('delete-button', 'button');
    button.dataset.index = index;
    button.addEventListener('click', removeHistoryElem);
    elem.append(button);

    return elem;
}

const historyContainer = document.querySelector('#history');

function updateHistory() {
    let oldHistoryStr = '[]';

    return function() {
        const updatedHistoryStr = localStorage.getItem('form-history');
        if (oldHistoryStr === updatedHistoryStr) {
            return;
        }

        const history = JSON.parse(updatedHistoryStr);
        const frag = new DocumentFragment;
        history.forEach((data, index) => {
            frag.prepend(renderHistoryElem(data, index))
        });
        historyContainer.replaceChildren(frag);
    }
}

if (!localStorage.getItem('form-history')) {
    localStorage.setItem('form-history', '[]');
}
const update = updateHistory();
update();
window.addEventListener('storage', update);
window.addEventListener('storage', update);