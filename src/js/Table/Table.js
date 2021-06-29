/* eslint-disable class-methods-use-this */

export default class Table {
  constructor(data = null) {
    this.data = data;
    this.paramData = ['id', 'title', 'year', 'imdb'];
    this.indexParametr = 0;

    this.drawTable();
    this.sortMethod();
  }

  drawTable() {
    this.table = document.createElement('table');
    this.table.classList.add('table');
    this.table.innerHTML = `<thead class="thead"></thead>  
                            <tbody class="tbody"></tbody>`;

    document.body.appendChild(this.table);
    this.drawTHead();

    if (this.data == null) {
      return;
    }

    this.tbody = document.querySelector('.tbody');
    this.drawTBody();
  }

  drawTHead() {
    this.thead = document.querySelector('.thead');

    const trHead = document.createElement('tr');
    for (const i of this.paramData) {
      const th = document.createElement('th');
      th.classList.add('th', i);
      th.textContent = i;
      trHead.appendChild(th);
    }

    this.thead.appendChild(trHead);
  }

  drawTBody() {
    this.tbody.innerHTML = '';

    for (const item of this.data) {
      const trData = document.createElement('tr');
      trData.innerHTML = `<td>#${item.id}</td>
                        <td>${item.title}</td>
                        <td>(${item.year})</td>
                        <td>imdb:${item.imdb.toFixed(2)}</td>`;

      this.tbody.appendChild(trData);
    }
  }

  sortMethod() {
    if (this.indexParametr === this.paramData.length) {
      this.indexParametr = 0;
    }
    const parametr = this.paramData[this.indexParametr];
    setTimeout(() => {
      this.data.sort((a, b) => this.funcSort(a[parametr], b[parametr]));
      this.drawTBody();
      this.drawArrow(parametr, true);
      setTimeout(() => {
        this.data.reverse();
        this.drawTBody();
        this.drawArrow(parametr);
        this.indexParametr++;
        this.sortMethod();
      }, 2000);
    }, 2000);
  }

  drawArrow(column, arrowUp = false) {
    const arrColumnTitle = document.querySelectorAll('.th');
    for (const i of arrColumnTitle) {
      i.classList.remove('increase', 'decrease');
    }

    const columnElement = document.querySelector(`.${column}`);

    if (arrowUp) {
      columnElement.classList.add('decrease');
    } else {
      columnElement.classList.add('increase');
    }
  }

  funcSort(a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
}
