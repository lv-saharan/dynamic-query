import Where from "./where.js";
export default class Query extends Where {
  #fields = [];
  #distinctsBy = [];
  #ordersBy = [];
  #groupsby = [];
  #froms = [];
  #rows = 1;
  #offet = 0;
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
      from: this.froms.join(","),
      table: this.froms.join(","),
      rows: this.rows,
      offset: this.offset,
    };
  }
}
