import Where from "./where.js";
import Constraint from "./contraint.js";
import ConstraintType from "./constraint-type.js";

export default class Query extends Where {
  #fields = [];
  #distinct = false;
  #ordersBy = [];
  #groupsby = [];
  #froms = [];
  #rows = 0;
  #offset = 0;
  #pageNumber = NaN;
  #pageSize = NaN;
  #havings = [];
  //默认使用where，having后为false
  #usingWhere = true;
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
    return this.#offset;
  }
  set offset(val) {
    if (typeof val === "number" && val > 0) {
      this.#offset = Number.parseInt(val);
    }
  }
  get fields() {
    return this.#fields;
  }

  get isDistinct() {
    return this.#distinct;
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
   * distinct option
   * @returns Query
   */
  distinct() {
    this.#distinct = true;
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
    this.#offset = 0;
    return this;
  }
  /**
   * use as limit
   * @param {Number} skip 
   * @param {Number} take 
   * @returns 
   */
  limit(skip, take) {
    this.#rows = take;
    this.#offset = skip;
    return this;
  }
  /**
   * skip n rows
   * @param {Number} n 
   * @returns 
   */
  skip(n){
    this.#offset = n;
    return this;
  }
  /**
   * take n rows
   * @param {Number} n 
   * @returns 
   */
  take(n){
    this.#rows = n;
    return this;
  }
  /**
   * paging...
   * @param {Number} pageNumber
   * @param {Number} pageSize
   * @returns any
   */
  page(pageNumber, pageSize) {
    this.#pageNumber = pageNumber;
    this.#pageSize = pageSize;
    this.#offset = (pageNumber - 1) * pageSize;
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
  where(field) {
    this.#usingWhere = true;
    return super.where(field);
  }
  having(field) {
    this.#usingWhere = false;
    return new Constraint(ConstraintType.Where, field, this, this.havings);
  }
  get constraints() {
    if (!this.#usingWhere) {
      return this.havings;
    }
    return super.constraints;
  }
  toJSON() {
    return {
      froms: this.froms,
      distinct: this.isDistinct,
      fields: this.fields,
      constraints: super.constraints,
      ordersBy: this.ordersBy,
      groupsBy: this.groupsBy,
      havings: this.havings,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      offset: this.offset,
      rows: this.rows,
    };
  }
}
