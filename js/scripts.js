const form = document.querySelector('#form');

const date = document.querySelector('#date');
const number = document.querySelector('#number');
const text = document.querySelector('#text');
const button = document.querySelector('#button');
const file = document.querySelector('#file');
const check = document.querySelector('#check');
const select = document.querySelector('#select');

const show = document.querySelector('#show');

function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function moveElement(element, searchIndex){
    const labels = [...document.querySelectorAll('#form>label')];
    const node = labels.find(item => item.id === element.id);
    const index = labels.indexOf(node);
    const anotherNode = labels[index + searchIndex];
    const position = searchIndex > 0 ? 'afterend' : 'beforebegin'
    anotherNode.insertAdjacentElement(position, node);

}

function createHTMLElement(elementType){
    const wrapper = document.createElement('label');
    const element = document.createElement(elementType);
    const up = document.createElement('i');
    const down = document.createElement('i');
    const del = document.createElement('i');

    up.classList = 'fas fa-arrow-up mx-2 button';
    down.classList = 'fas fa-arrow-down mx-2 button';
    del.classList = 'far fa-trash-alt mx-2 button';

    wrapper.setAttribute('id', generateUUID(wrapper));

    del.addEventListener('click', e => form.removeChild(wrapper));

    up.addEventListener('click', e => moveElement(wrapper, -1));

    down.addEventListener('click', e => moveElement(wrapper, 1));

    return [wrapper, element, up, down, del];
}

function createInput(type, value){
    const [wrapper, input, up, down, del] = createHTMLElement('input');

    input.type = type;
    
    switch(type){
        case 'button':
            input.value = value;
            break;
        case 'checkbox':
            wrapper.innerText = value;
            break;
    }

    wrapper.appendChild(input);
    wrapper.appendChild(up);
    wrapper.appendChild(down);
    wrapper.appendChild(del);
    form.appendChild(wrapper);
}

function createSelect(){
    const [wrapper, select, up, down, del] = createHTMLElement('select');

    [1,2,3].forEach(i => {
        const option = document.createElement('option');
        option.innerText = `Opción ${i}`;
        select.appendChild(option);
    })

    wrapper.appendChild(select);
    wrapper.appendChild(up);
    wrapper.appendChild(down);
    wrapper.appendChild(del);
    form.appendChild(wrapper);
}


date.addEventListener('click', e => createInput('date'));

number.addEventListener('click', e => createInput('number'));

text.addEventListener('click', e => createInput('text'));

button.addEventListener('click', e => createInput('button', 'Botón'));

file.addEventListener('click', e => createInput('file'));

check.addEventListener('click', e => createInput('checkbox', 'Checkbox'));

select.addEventListener('click', e => createSelect());

show.addEventListener('click', e => {
    const virtualForm = document.querySelector('#form').outerHTML;
    const stringForm = virtualForm.replace(/<button> Eliminar<\/button>/g, '');
    console.log(stringForm);
})