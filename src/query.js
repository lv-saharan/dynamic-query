import Where from "./where.js";
import Constraint from "./contraint.js";
import ConstraintType from "./constraint-type.js";

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
  #havings = [];

  #beginHaving = false;

  get havings() {
    return this.#havings;
  }
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
  orderBy(...fields) {
    for (let field of fields) {
      this.#ordersBy.push({
        field,
        aspect: "ASC",
      });
    }

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
  orderByDescending(...fields) {
    for (let field of fields) {
      this.#ordersBy.push({
        field,
        aspect: "DESC",
      });
    }

    return this;
  }
  having(field) {
    this.#beginHaving = true;
    return new Constraint(ConstraintType.Where, field, this);
  }
  get constraints() {
    if (this.#beginHaving) {
      return this.#havings;
    }
    return super.constraints;
  }
  toJSON() {
    return {
      froms: this.froms,
      fields: this.fields,
      constraints: super.constraints,
      ordersBy: this.ordersBy,
      groupsBy: this.groupsBy,
      havings: this.havings,
      distinctsBy: this.distinctsBy,
      rows: this.rows,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      offset: this.offset,
    };
  }
}
