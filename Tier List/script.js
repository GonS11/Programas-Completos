// Con estas dos constantes, te ahorras escribir document.querySelector
const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

const imageInput = $('#image-input'); // Input de archivos
const itemsSection = $('#selector-items'); // Sección donde se agregan las imágenes cargadas
const resetButton = $('#reset-button'); // Botón de reinicio
const saveButton = $('#save-button'); // Botón de guardar

// Función para crear un elemento de imagen a partir de la fuente dada
function createItem(src) {
    const imgElement = document.createElement('img');
    imgElement.draggable = true; // Permitir que la imagen se pueda arrastrar
    imgElement.src = src;
    imgElement.className = 'item-image';

    imgElement.addEventListener('dragstart', handleDragStart);
    imgElement.addEventListener('dragend', handleDragEnd);
    itemsSection.appendChild(imgElement);
    return imgElement;
}

// Función para procesar los archivos seleccionados y crear elementos de imagen
function useFilesToCreateItems(files) {
    if (files && files.length > 0) {
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) { // Verificar que el archivo sea una imagen
                const reader = new FileReader(); // Permite leer el contenido de los archivos
                reader.onload = (eventReader) => {
                    createItem(eventReader.target.result); // Crear y agregar la imagen al DOM
                }
                reader.readAsDataURL(file); // Leer el archivo como una URL de datos (base64)
            } else {
                alert('Solo se permiten archivos de imagen.'); // Mostrar un mensaje si el archivo no es una imagen
            }
        });
    }
}

// Event listener para el input de archivos
imageInput.addEventListener('change', (event) => {
    const files = event.target.files; // Obtener los archivos seleccionados
    useFilesToCreateItems(files); // Procesar los archivos
});

let draggedElement = null;
let sourceContainer = null;

const rows = $$('.tier .row'); // Obtener todas las filas de la tier list

rows.forEach(row => {
    row.addEventListener('drop', handleDrop); // Evento al soltar un elemento
    row.addEventListener('dragover', handleDragOver); // Evento al arrastrar sobre un elemento
    row.addEventListener('dragleave', handleDragLeave); // Evento al salir de un elemento
});

itemsSection.addEventListener('drop', handleDrop); // Evento al soltar un elemento en la sección de items
itemsSection.addEventListener('dragover', handleDragOver); // Evento al arrastrar sobre la sección de items
itemsSection.addEventListener('dragleave', handleDragLeave); // Evento al salir de la sección de items

itemsSection.addEventListener('dragover', handleDragOverFromDesktop); // Evento al arrastrar archivos desde el escritorio
itemsSection.addEventListener('drop', handleDropFromDesktop); // Evento al soltar archivos desde el escritorio

// Función para manejar el arrastre de archivos desde el escritorio
function handleDragOverFromDesktop(event) {
    event.preventDefault();

    const { currentTarget, dataTransfer } = event;

    if (dataTransfer.types.includes('Files')) { // Verificar que se arrastren archivos
        currentTarget.classList.add('drag-files');
    }
}

// Función para manejar el drop de archivos desde el escritorio
function handleDropFromDesktop(event) {
    event.preventDefault();

    const { currentTarget, dataTransfer } = event;

    if (dataTransfer.types.includes('Files')) { // Verificar que se arrastren archivos
        currentTarget.classList.remove('drag-files');
        const files = dataTransfer.files; // Obtener los archivos arrastrados
        useFilesToCreateItems(files); // Procesar los archivos
    }
}

// Función para manejar el evento drop en una fila o en la sección de items
function handleDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.remove('dragging-over'); // Eliminar clase de estilo

    if (draggedElement && event.currentTarget !== sourceContainer) {
        event.currentTarget.appendChild(draggedElement); // Mover el elemento arrastrado al nuevo contenedor
        draggedElement = null;
    }
}

// Función para manejar el evento dragover en una fila o en la sección de items
function handleDragOver(event) {
    event.preventDefault();
    event.currentTarget.classList.add('dragging-over'); // Agregar clase de estilo
}

// Función para manejar el evento dragleave en una fila o en la sección de items
function handleDragLeave(event) {
    event.currentTarget.classList.remove('dragging-over'); // Eliminar clase de estilo
}

// Función para manejar el inicio de arrastre de una imagen
function handleDragStart(event) {
    draggedElement = event.target; // Establecer el elemento arrastrado
    sourceContainer = event.target.parentElement; // Establecer el contenedor de origen
}

// Función para manejar el final de arrastre de una imagen
function handleDragEnd(event) {
    draggedElement = null; // Limpiar la referencia al elemento arrastrado
    sourceContainer = null; // Limpiar la referencia al contenedor de origen
}

// Event listener para el botón de reinicio
resetButton.addEventListener('click', () => {
    itemsSection.innerHTML = ''; // Vaciar la sección de items
});

// Event listener para el botón de guardar (no implementado)
saveButton.addEventListener('click', () => {
    // Implementar la funcionalidad de guardar si es necesario
});
