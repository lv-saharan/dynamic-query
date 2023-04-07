export default class Insert {
  #table;
  #kvs = {};
  /**
   *
   * @param {String} table
   * @param {Object} kvs
   */
  constructor(table, kvs) {
    this.into(table, kvs);
  }
  /**
   *
   * @param {String} table
   * @param {Object} kvs
   */
  into(table, kvs) {
    this.#table = table;
    Object.assign(this.#kvs, kvs);
  }

  /**
   * insert target table
   */
  get table() {
    return this.#table;
  }

  /**
   * inserted key and value pairs
   */
  get kvs() {
    return this.#kvs;
  }

  get fields() {
    return Object.keys(this.#kvs);
  }
  get values() {
    return Object.values(this.#kvs);
  }
  /**
   * post more easy
   * @returns String
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return {
      table: this.table,
      kvs: this.kvs,
      fields: this.fields,
      values: this.values,
    };
  }
}
