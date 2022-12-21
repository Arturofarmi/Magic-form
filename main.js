function saveDataOnKeyPress(evt) {
    const data = JSON.parse(localStorage.getItem('form-data') ?? '{}');
    data[evt.currentTarget.getAttribute('name')] = evt.currentTarget.value;
    localStorage.setItem('form-data', JSON.stringify(data));
}

function updateForm() {
    const data = {};
    document.querySelectorAll('input').forEach(element => {
        data[element.getAttribute('name')] = element.value;
    });
    const savedDataStr = localStorage.getItem('form-data') ?? '{}';
    if (JSON.stringify(data) === savedDataStr) {
        return
    }
    const savedData = JSON.parse(savedDataStr);
    const formElem = document.querySelector('form');
    Object.entries(savedData).forEach(([key, value]) => {
        const target = formElem.querySelector(`input[name=${key}]:not(:focus)`);
        if (target) {
            target.value = value;
        }
    });
}

if (!localStorage.getItem('form-data')) {
    localStorage.setItem('form-data', '{}');
}
updateForm()
window.addEventListener('storage', updateForm)


document.querySelectorAll('input').forEach(element => {
    element.addEventListener('keyup', saveDataOnKeyPress);
});

document.querySelector('form').addEventListener('submit', evt => {
    evt.preventDefault();

    const data = {};
    document.querySelectorAll('input').forEach(element => {
        data[element.getAttribute('name')] = element.value;
    });

    const history = JSON.parse(localStorage.getItem('form-history')) ?? [];
    history.push(data);

    localStorage.setItem('form-history', JSON.stringify(history));

    evt.currentTarget.reset();
    localStorage.setItem('form-data', '{}');
});