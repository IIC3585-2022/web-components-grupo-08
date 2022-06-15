const todoListTemplate = document.createElement('template');
todoListTemplate.innerHTML = /*html*/ `
  <style>
    .main {
      position: fixed;
      right: 8px;
      bottom: 8px;
      font-family: 'Bebas Neue', cursive;
      background-color: #212121;
      color: white;
      width: 300px;
      height: auto;
      padding: 12px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);

    }

    button {
      font-family: 'Bebas Neue', cursive;
      cursor: pointer;
      background-color: #fff;
      color: #000;
      border: none;
      font-size: 18px;
      transition: .2s;
    }
    button:hover {
      background-color: #000;
      color: #fff;
      outline: 1px solid white;
    }

    .title {
      font-family: 'Bebas Neue', cursive;
      text-align: center;
      font-size: 36px;
      margin: 0;
    }

    .input-container {
      margin-bottom: 12px;
    }
    .input-container .input-text {
      width: 100%;
      line-height: 2;
      margin-bottom: 8px;
      box-sizing: border-box;
    }

    .input-container .button-add {
      width: 100%;
    }

    .items {
      overflow-y: auto;
      height: 200px;
    }

    .item {
      font-size: 24px;
      display: flex;
      justify-content: space-between;
      padding: 4px;
    }
  </style>
  <div class="main">
    <p class="title"></p>
    <div class="input-container">
      <input
        class="input-text"
        type="text"
        placeholder="[PARAM] Escriba aquí"
      />
      <button class="button-add">Agregar ítem</button>
    </div>
    <div class="items">
      <!--
      <div class="item">
        <span>Item title</span>
        <button class="button-remove">Eliminar</button>
      </div>
      -->
    </div>
  </div>
`;

class TodoList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Triggered on component insertion into the DOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(todoListTemplate.content.cloneNode(true));
    // Add item list event listener
    this.shadowRoot
      .querySelector('.button-add')
      .addEventListener('click', (e) => {
        this.handleButtonAdd(e);
      });
    this.update();
  }

  handleButtonAdd(e) {
    e.stopPropagation();
    // Add item to list
    this.addItem(this.shadowRoot.querySelector('.input-text').value);
    // Clear input
    this.shadowRoot.querySelector('.input-text').value = '';
  }

  addItem(content) {
    if (content === '') return;
    // Create new item
    const newTodoItem = document.createElement('div');
    newTodoItem.classList.add('item');
    // Build content
    const span = document.createElement('span');
    span.innerHTML = content;
    const button = document.createElement('button');
    button.addEventListener('click', (e) => {
      this.removeItem(e);
    });
    button.innerHTML = 'Eliminar';
    // Append content
    newTodoItem.appendChild(span);
    newTodoItem.appendChild(button);
    this.shadowRoot.querySelector('.items').appendChild(newTodoItem);
  }

  removeItem(e) {
    e.target.parentNode.remove();
  }

  update() {
    const title = this.getAttribute('title') || 'No title';
    this.shadowRoot.querySelector('.title').innerHTML = title;

    const placeholder = this.getAttribute('placeholder') || '';
    this.shadowRoot.querySelector('.input-text').placeholder = placeholder;

    const list = this.getAttribute('list')?.split(',') || [];
    list.forEach((item) => {
      this.addItem(item);
    });
  }
}

window.customElements.define('todo-list', TodoList);
