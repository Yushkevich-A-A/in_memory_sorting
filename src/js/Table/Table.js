export default class Table {
  constructor(data = null) {
    this.data = data;
    this.paramData = ['id','title','year', 'imdb'];
    this.indexParametr = 0;

    this.drawTable();
    this.sortMethod()
  }

  drawTable() {
    this.table = document.createElement('table');
    this.table.classList.add('table');
    this.table.innerHTML = `<thead class="thead">
                              <th>id</th>
                              <th>title</th>
                              <th>year</th>
                              <th>imdb</th>
                            </thead>  
                            <tbody class="tbody"></tbody>`;

    document.body.appendChild(this.table)
    this.tbody = document.querySelector('.tbody');

    if (this.data == null) {
      return;
    }
    this.drawTBody();

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
    console.log(parametr);
    setTimeout(() => {
      this.data.sort((a, b) => this.funcSort(a[parametr], b[parametr]));
      this.drawTBody();
      setTimeout(() => {
        this.data.reverse();
        this.drawTBody();
        this.indexParametr++;
        this.sortMethod();
      }, 2000);
    }, 2000);
  
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
