import {LitElement, css, html} from 'lit';

export class TodoList extends LitElement {
  static properties = {
    list: {},
    _list: {state: true},
    title: {},
    placeholder: {},
  };

  constructor() {
    super();
    this._list = [];
  }

  firstUpdated() {
    this._list = this.list.split(",")
  }

  removeItem(idx) {
    this._list.splice(idx, 1);
    this.requestUpdate();
  }

  addItem(event) {
    const value = this.renderRoot.querySelector('.input-text').value;
    if (value) {
      this._list.push(value);
      this.requestUpdate();
    }
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div class="main">
        <p class="title">${this.title}</p>
        <div class="input-container">
          <input
            class="input-text"
            type="text"
            placeholder=${this.placeholder}
          />
          <button class="button-add" @click=${this.addItem}>Agregar ítem</button>
        </div>
        <div class="items">
          ${this._list.map((item, index) => html`
            <div class="item">
              <span>${item}</span>
              <button class="button-remove" @click="${() => this.removeItem(index)}">Eliminar</button>
            </div>
          `)}
        </div>
      </div>
    `;
  }

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
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
  `;
}
customElements.define('todo-list', TodoList);
