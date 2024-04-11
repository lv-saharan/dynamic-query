import ConstraintType from "./constraint-type.js";
import Operator from "./operator.js";
import Table, { table } from "./table.js";
import Query from "./query.js";
import Insert from "./insert.js";
import Update from "./update.js";
import Delete from "./delete.js";
import Constraint from "./contraint.js";
/**
 * create Query
 * @param  {...any} froms
 * @returns {Query}
 */
export function query(...froms) {
  return new Query().from(...froms);
}

export function from(...froms) {
  return query(...froms);
}

export function select(table, ...fields) {
  return query(table).select(...fields);
}

export {
  Query,
  Insert,
  Update,
  Delete,
  Operator,
  ConstraintType,
  table,
  Table,
};

export function insert(table, kvs) {
  return new Insert(table, kvs);
}

export function update(table, kvs) {
  return new Update(table, kvs);
}

export function del(table) {
  return new Delete(table);
}
