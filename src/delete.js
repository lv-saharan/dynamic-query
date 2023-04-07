import Where from "./where.js";
export default class Delete extends Where {
  #table = [];

  constructor(table) {
    super();
    this.#table = table;
  }

  /**
   * update target table
   */
  get table() {
    return this.#table;
  }

  from(table) {
    this.#table = table;
  }

  toJSON() {
    return {
      constraints: this.constraints,
      table: this.table,
    };
  }
}
