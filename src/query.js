import Where from "./where.js";
export default class Query extends Where {
  #fields = [];
  #distinctsBy = [];
  #ordersBy = [];
  #groupsby = [];
  #froms = [];
  #rows = 1;
  #offet = 0;
  #pageNumber = NaN;
  #pageSize = NaN;

  get rows() {
    return this.#rows;
  }
  set rows(val) {
    if (typeof val === "number" && val > 0) {
      this.#rows = Number.parseInt(val);
    }
  }
  get offset() {
    return this.#offet;
  }
  set offset(val) {
    if (typeof val === "number" && val > 0) {
      this.#offet = Number.parseInt(val);
    }
  }
  get fields() {
    return this.#fields;
  }

  get distinctsBy() {
    return this.#distinctsBy;
  }
  get ordersBy() {
    return this.#ordersBy;
  }
  get groupsBy() {
    return this.#groupsby;
  }

  get froms() {
    return this.#froms;
  }
  get pageNumber() {
    return this.#pageNumber;
  }
  get pageSize() {
    return this.#pageSize;
  }
  /**
   * select ...fields
   * @param  {...String} fields
   * @returns {Query}
   */
  select(...fields) {
    this.#fields.push(...fields);
    return this;
  }

  /**
   * 获取顶部n行数据
   *
   * @param n 获取的行数
   * @returns 返回当前对象
   */
  top(n) {
    this.#rows = n;
    this.#offet = 0;
    return this;
  }
  page(pageNumber, pageSize) {
    this.#pageNumber = pageNumber;
    this.#pageSize = pageSize;
    this.#offet = (pageNumber - 1) * pageSize;
    this.#rows = pageSize;
    return this;
  }
  /**
   * from table
   * @param  {...any} tables
   * @returns {Query}
   */
  from(...tables) {
    this.#froms.push(...tables);
    return this;
  }
  /**
   * orderBy field asc
   * @param {String} field
   * @returns {Query}
   */
  orderBy(field, aspect = "ASC") {
    this.#ordersBy.push({
      field,
      aspect,
    });
    return this;
  }
  /**
   * group By
   * @param  {...String} fields
   * @returns {Query}
   */
  groupBy(...fields) {
    this.#groupsby.push(...fields);
    return this;
  }
  /**
   * orderBy field desc
   * @param {String} field
   * @returns {Query}
   */
  orderByDescending(field) {
    this.#ordersBy.push({
      field,
      aspect: "DESC",
    });
    return this;
  }
  toJSON() {
    return {
      fields: this.fields,
      constraints: this.constraints,
      ordersBy: this.ordersBy,
      groupsBy: this.groupsBy,
      distinctsBy: this.distinctsBy,
      froms: this.froms,
      rows: this.rows,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      offset: this.offset,
    };
  }
}
