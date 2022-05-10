let numBoxes = 1;
let nextBoxNumber = 2;
let boxContainer = document.getElementsByClassName('box-container')[0];

const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 3;

function createBox() {
    let box = document.createElement('div');
    box.classList.add('box');
    let text = document.createTextNode(nextBoxNumber.toString());
    box.appendChild(text);

    ++nextBoxNumber;

    return box;
}

function addEventListeners(box) {
    box.addEventListener('mousedown', event => {
        if (event.which !== LEFT_MOUSE_BUTTON) {
            return;
        }
        let offsetX = event.clientX - parseInt(window.getComputedStyle(box).left, 10);
        let offsetY = event.clientY - parseInt(window.getComputedStyle(box).top, 10);
    
        function mouseUpHandler(event) {
            if (event.which !== LEFT_MOUSE_BUTTON) {
                return;
            }
            boxContainer.removeEventListener('mousemove', mouseMoveHandler);
            boxContainer.removeEventListener('mouseup', mouseUpHandler);
        }
        
        function mouseMoveHandler(event) {
            if (event.which !== LEFT_MOUSE_BUTTON) {
                return;
            }
            box.style.top = (event.clientY - offsetY) + 'px';
            box.style.left = (event.clientX - offsetX) + 'px';
        }

        boxContainer.addEventListener('mouseup', mouseUpHandler);
        boxContainer.addEventListener('mousemove', mouseMoveHandler);
    });

    box.addEventListener('contextmenu', event => {
        event.preventDefault();
        if (event.which === RIGHT_MOUSE_BUTTON) {
            let randomColor = Math.floor(Math.random() * 2**(8*3)).toString(16);
            box.style.backgroundColor = '#' + randomColor.toString();
        }
    });

    box.addEventListener('click', event => {
        if (event.which === LEFT_MOUSE_BUTTON && event.shiftKey) {
            box.classList.toggle('box-large');
            return;
        }
    });

    box.addEventListener('dblclick', event => {
        if (event.which === LEFT_MOUSE_BUTTON && event.altKey && numBoxes > 1) {
            --numBoxes;
            box.remove();
        } else if (event.which === LEFT_MOUSE_BUTTON && !event.altKey && !event.shiftKey) {
            ++numBoxes;
            let newBox = createBox();
            addEventListeners(newBox);
            boxContainer.appendChild(newBox);
            let boxComputedStyles = window.getComputedStyle(box);
            newBox.style.left = parseInt(boxComputedStyles.left, 10) + parseInt(boxComputedStyles.width, 10) + 'px';
            newBox.style.top = parseInt(boxComputedStyles.top, 10) + parseInt(boxComputedStyles.height, 10) + 'px';
        }
    });
}

function init() {
    let initBox = document.getElementsByClassName('box')[0];
    addEventListeners(initBox);
}

init();

