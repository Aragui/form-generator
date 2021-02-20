const form = document.querySelector('#form');

const date = document.querySelector('#date');
const number = document.querySelector('#number');
const text = document.querySelector('#text');
const button = document.querySelector('#button');
const file = document.querySelector('#file');
const check = document.querySelector('#check');
const select = document.querySelector('#select');

const show = document.querySelector('#show');

function createHTMLElement(elementType){
    const wrapper = document.createElement('label');
    const element = document.createElement(elementType);
    const del = document.createElement('i');

    del.classList = 'far fa-trash-alt ml-1 trash-button'

    return [wrapper, element, del];
}

function createInput(type, value){
    const [wrapper, input, del] = createHTMLElement('input');
    del.addEventListener('click', e => form.removeChild(wrapper));

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
    wrapper.appendChild(del);
    form.appendChild(wrapper);
}

function createSelect(){
    const [wrapper, select, del] = createHTMLElement('select');

    del.addEventListener('click', e => form.removeChild(wrapper));

    [1,2,3].forEach(i => {
        const option = document.createElement('option');
        option.innerText = `Opción ${i}`;
        select.appendChild(option);
    })

    wrapper.appendChild(select);
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