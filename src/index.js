import Constraint from "./contraint.js"
import ConstraintType from "./constraint-type.js"
import Operator from "./operator.js"
import Table, { table } from './table.js'

class Query {
    #fields = []
    #constraints = []
    #distinctsBy = []
    #ordersBy = []
    #groupsby = []
    #froms = []
    #rows = 1
    #offet = 0
    get rows() {
        return this.#rows
    }
    set rows(val) {
        if (typeof val === "number" && val > 0) {
            this.#rows = Number.parseInt(val)
        }
    }
    get offset() {
        return this.#offet
    }
    set offset(val) {
        if (typeof val === "number" && val > 0) {
            this.#offet = Number.parseInt(val)
        }
    }
    get fields() {
        return this.#fields
    }
    get constraints() {
        return this.#constraints
    }
    get distinctsBy() {
        return this.#distinctsBy
    }
    get ordersBy() {
        return this.#ordersBy
    }
    get groupsBy() {
        return this.#groupsby
    }

    get froms() {
        return this.#froms
    }
    /**
     * select ...fields
     * @param  {...String} fields 
     * @returns {Query}
     */
    select(...fields) {
        this.#fields.push(...fields);
        return this
    }
    /**
     * Where field ...
     * @param {String} field 
     * @returns {Constraint}
     */
    where(field) {
        return new Constraint(ConstraintType.Where, field, this);
    }
    /**
     * And field ...
     * @param {String} field 
     * @returns {Constraint}
     */
    and(field) {
        return new Constraint(ConstraintType.And, field, this);
    }
    /**
     * Or field ...
     * @param {String} field 
     * @returns {Constraint}
     */
    or(field) {
        return new Constraint(ConstraintType.Or, field, this);
    }
    /**
    * And ( field ...
    * @param {String} field 
    * @returns {Constraint}
    */
    andStartExpression(field) {
        return new Constraint(ConstraintType.AndStartExpression, field, this);
    }
    /**
     * Or ( field ...
     * @param {String} field 
     * @returns {Constraint}
     */
    orStartExpression(field) {
        return new Constraint(ConstraintType.OrStartExpression, field, this);
    }
    /**
     * And field ...)
     * @param {String} field 
     * @returns {Constraint}
     */
    andEndExpression(field) {
        return new Constraint(ConstraintType.AndEndExpression, field, this);
    }
    /**
     * Or field ... )
     * @param {String} field 
     * @returns {Constraint}
     */
    orEndExpression(field) {
        return new Constraint(ConstraintType.OrEndExpression, field, this);
    }
    /**
     * )
     * @param {String} field 
     * @returns {Constraint}
     */
    closeExpression() {
        this.Constraints.push(new Constraint(ConstraintType.CloseExpression));
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
            aspect
        })
        return this
    }
    /**
     * group By
     * @param  {...String} fields 
     * @returns {Query}
     */
    groupBy(...fields) {
        this.#groupsby.push(...fields)
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
            aspect: "DESC"
        });
        return this
    }
    /**
     * from table
     * @param  {...any} tables 
     * @returns {Query}
     */
    from(...tables) {
        this.#froms.push(...tables)
        return this;
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
            fields: this.fields,
            constraints: this.constraints,
            ordersBy: this.ordersBy,
            groupsBy: this.groupsBy,
            distinctsBy: this.distinctsBy,
            froms: this.froms,
            rows: this.rows,
            offset: this.offset
        }
    }
}
/**
 * create Query
 * @param  {...any} froms 
 * @returns {Query}
 */
export function query(...froms) {
    return new Query().from(...froms)
}
export { Query, Operator, ConstraintType, table, Table }