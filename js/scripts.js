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
    pre.innerText=html_beautify(stringForm,
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
            "wrap_line_length": "40",
            "indent_inner_html": false,
            "comma_first": false,
            "e4x": false,
            "indent_empty_lines": false
          });
})


copy.addEventListener('click',e=>{
    toastr.success('Copiado!!');
})