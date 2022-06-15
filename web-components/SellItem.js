const sellItemTemplate = document.createElement('template');
sellItemTemplate.innerHTML = /*html*/ `
  <style>
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
    
  </style>
  <div class="main">
    <img class="image" />
    <span class="brand"></span>
    <span class="title"></span>
    <span class="price"></span>
  </div>
`;

const currencyFormatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
}).format;

class SellItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // Triggered on component insertion into the DOM
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(sellItemTemplate.content.cloneNode(true));
    this.update();
  }

  update() {
    const title = this.shadowRoot.querySelector('.title');
    title.textContent = this.getAttribute('title') || 'No title';

    const price = this.shadowRoot.querySelector('.price');
    const formattedPrice = currencyFormatter(this.getAttribute('price'));
    price.textContent = formattedPrice || 'No price';

    const brand = this.shadowRoot.querySelector('.brand');
    brand.textContent = this.getAttribute('brand') || 'No brand';

    const image = this.shadowRoot.querySelector('.image');
    image.src = this.getAttribute('image') || '';

    const main = this.shadowRoot.querySelector('.main');
    main.style.backgroundColor = this.getAttribute('color') || '#fff';
  }
}

window.customElements.define('sell-item', SellItem);
