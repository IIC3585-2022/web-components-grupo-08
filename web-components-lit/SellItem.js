import {LitElement, css, html} from 'lit';

const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
}).format;

export class SellItem extends LitElement {
  static properties = {
    title: {},
    price: {},
    brand: {},
    image: {},
    color: {},
  };

  // Render the UI as a function of component state
  render() {
    return html`
      <style> .main { background-color: ${this.color} </style>
      <div class="main">
        <img class="image" src=${this.image}/>
        <span class="brand">${this.brand}</span>
        <span class="title">${this.title}</span>
        <span class="price">${currencyFormatter(this.price)}</span>
      </div>
    `;
  }

  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    .main {
      color: black;
      font-family: 'Open Sans', sans-serif;
      width: 360px;
      height: 480px;
      border-radius: 4px;
      padding: 16px;
      margin: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
      transition: 0.2s;
      position: relative;
      cursor: pointer;
    }

    .main:hover {
      box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
      transform: translateY(-8px);
    }

    .image {
      width: 360px;
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(60%, -35%);
      transition: 0.2s;
    }

    .brand {
      font-size: 12px;
    }
    .title {
      font-size: 28px;
      font-weight: bold;
      padding: .5rem 0;
    }

    .price {
      font-size: 28px;
    }

    :host {
      color: blue;
    }
  `;
}
customElements.define('sell-item', SellItem);
