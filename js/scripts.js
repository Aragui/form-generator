const form = document.querySelector('#form');

const date = document.querySelector('#date');
const number = document.querySelector('#number');
const text = document.querySelector('#text');
const button = document.querySelector('#button');
const file = document.querySelector('#file');
const check = document.querySelector('#check');
const select = document.querySelector('#select');

const show = document.querySelector('#show');
const pre = document.querySelector("#pre");
const clipboard = new Clipboard('.btn');
const clean = document.querySelector('#clean-form');

function generateUUID() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function moveElement(element, searchIndex) {
    const labels = [...document.querySelectorAll('#form>span')];
    const node = labels.find(item => item.id === element.id);
    const index = labels.indexOf(node);
    const anotherNode = labels[index + searchIndex];
    const position = searchIndex > 0 ? 'afterend' : 'beforebegin'

    index + searchIndex < 0 || index + searchIndex === labels.length
    ? toastr.warning('No existe otro elemento', 'Advertencia')
    : anotherNode.insertAdjacentElement(position, node);

}

function createHTMLElement(elementType) {
    const wrapper = document.createElement('span');
    const element = document.createElement(elementType);
    const up = document.createElement('i');
    const down = document.createElement('i');
    const del = document.createElement('i');

    wrapper.id = generateUUID(); 

    up.classList = 'fas fa-arrow-up mx-2 button';
    down.classList = 'fas fa-arrow-down mx-2 button';
    del.classList = 'far fa-trash-alt mx-2 button';

    del.addEventListener('click', e => form.removeChild(wrapper));

    up.addEventListener('click', e => moveElement(wrapper, -1));

    down.addEventListener('click', e => moveElement(wrapper, 1));

    return [wrapper, element, up, down, del];
}

function createInput(type, value) {
    const [wrapper, input, up, down, del] = createHTMLElement('input');

    input.type = type;

    wrapper.appendChild(input);

    switch (type) {
        case 'button':
            input.value = value;
            break;
        case 'checkbox':
            wrapper.insertAdjacentText('beforeend', value);
            break;
    }

    wrapper.appendChild(up);
    wrapper.appendChild(down);
    wrapper.appendChild(del);
    form.appendChild(wrapper);
}

function createSelect() {
    const [wrapper, select, up, down, del] = createHTMLElement('select');

    [1, 2, 3].forEach(i => {
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
    const regexButtons = /<i class="fas fa-arrow-up mx-2 button"><\/i><i class="fas fa-arrow-down mx-2 button"><\/i><i class="far fa-trash-alt mx-2 button"><\/i>/g;
    const regexClass = / class="d-flex flex-column"/g;
    const stringForm = virtualForm.replace(regexButtons, '').replace(regexClass, '');
    pre.innerText = html_beautify(stringForm,
        {
            "indent_size": "2",
            "indent_char": " ",
            "max_preserve_newlines": "5",
            "preserve_newlines": true,
            "keep_array_indentation": false,
            "break_chained_methods": false,
            "indent_scripts": "keep",
            "brace_style": "collapse",
            "space_before_conditional": true,
            "unescape_strings": false,
            "jslint_happy": false,
            "end_with_newline": false,
            "wrap_line_length": "20",
            "indent_inner_html": false,
            "comma_first": false,
            "e4x": false,
            "indent_empty_lines": false
        });
});

clean.addEventListener('click', e => form.innerHTML = '');


copy.addEventListener('click', e => {
    toastr.success('Copiado!!');
});