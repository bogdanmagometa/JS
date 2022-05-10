let numBoxes = 1;
let boxContainer = document.getElementsByClassName('box-container')[0];

const LEFT_MOUSE_BUTTON = 1;
const RIGHT_MOUSE_BUTTON = 3;

function createBox() {
    ++numBoxes;

    let box = document.createElement('div');
    box.classList.add('box');
    let text = document.createTextNode(numBoxes.toString());
    box.appendChild(text);

    return box;
}

function adjustBox(box) {
    let rightClicked = false;
    function mouseDownHandler(event) {
        event.preventDefault();
        if (event.which === LEFT_MOUSE_BUTTON) {
            if (event.shiftKey) {
                box.classList.toggle('box-large');
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
        } else if (event.which === RIGHT_MOUSE_BUTTON && !event.shiftKey) {
            if(rightClicked) {
                clearTimeout(timeout);
                rightClicked = false;
                let randomColor = Math.floor(Math.random() * 2**(8*3)).toString(16);
                box.style.backgroundColor = '#' + randomColor.toString();
            } else {
                rightClicked = true;
                timeout = setTimeout( function() {
                    rightClicked = false;
                }, 300);
            }  
        }
    }

    box.addEventListener('mousedown', mouseDownHandler);
    box.addEventListener('contextmenu', event => {
        event.preventDefault();
    });
    // box.addEventListener('dblclick'), event => {
    //     if (event.which === LEFT_MOUSE_BUTTON && event.altKey) {
    //         box.remove();
    //     }
    // }
}

boxContainer.addEventListener('dblclick', event => {
    if (event.which === LEFT_MOUSE_BUTTON && event.target == boxContainer) {
        let box = createBox();
        adjustBox(box);
        boxContainer.appendChild(box);
    }
});

let initBox = document.getElementsByClassName('box')[0];
adjustBox(initBox);


