const prefix = 'data-'

class BookCard extends HTMLElement {
  constructor() {
    super();
    this.render()
  }

  render() {
    this.attachShadow({ mode: 'open' })

    const templateElem = document.getElementById('book-card-template')
    const clonedElem = templateElem.content.cloneNode(true)

    clonedElem.querySelector('.container > .image').src = this.getAttribute(`${prefix}image`)
    clonedElem.querySelector('.container > .title').textContent = this.getAttribute(`${prefix}title`)
    clonedElem.querySelector('.container > .desc').textContent = this.getAttribute(`${prefix}desc`)
    clonedElem.querySelector('.container > .price').textContent = `￥${this.getAttribute(`${prefix}price`)}`
    clonedElem.querySelector('.container > .action').addEventListener('click', this.buy)

    this.shadowRoot.appendChild(clonedElem)
  }

  // 要用箭头函数将 this 直接绑定到 BookCard 上
  buy = () => {
    console.log('this:', this)
    alert('YooHoo!!')
  }

  // buy() {
  //   console.log('this:', this)
  //   alert('!!!')
  // }
}

customElements.define('book-card', BookCard)