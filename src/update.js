import Where from "./where.js";
export default class Update extends Where {
  #kvs = {};
  #table = [];

  constructor(table, kvs = {}) {
    super()
    this.#table = table;
    Object.assign(this.#kvs, kvs);
  }

  get kvs() {
    return this.#kvs;
  }

  /**
   * update target table
   */
  get table() {
    return this.#table;
  }

  get fields() {
    return Object.keys(this.#kvs);
  }
  get values() {
    return Object.values(this.#kvs);
  }


  toJSON() {
    return {
      kvs: this.kvs,
      constraints: this.constraints,
      table: this.table,
      fields: this.fields,
      values: this.values,
    };
  }
}
