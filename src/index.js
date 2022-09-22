import Constraint from "./contraint.js"
import ConstraintType from "./constraint-type.js"
import Operator from "./operator.js"
class Query {
    #fields = []
    #constraints = []
    #distinctBy = []
    #orderBy = []
    #groupby = []
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
    get distinctBy() {
        return this.#distinctBy
    }
    get orderBy() {
        return this.#orderBy
    }
    get groupBy() {
        return this.#groupby
    }

    get froms() {
        return this.#froms
    }
    /**
     * Where field ...
     * @param {String} field 
     * @returns Constraint
     */
    where(field) {
        return new Constraint(ConstraintType.Where, field, this);
    }
    /**
     * And field ...
     * @param {String} field 
     * @returns Constraint
     */
    and(field) {
        return new Constraint(ConstraintType.And, field, this);
    }
    /**
     * Or field ...
     * @param {String} field 
     * @returns Constraint
     */
    or(field) {
        return new Constraint(ConstraintType.Or, field, this);
    }
    /**
    * And ( field ...
    * @param {String} field 
    * @returns Constraint
    */
    andStartExpression(field) {
        return new Constraint(ConstraintType.AndStartExpression, field, this);
    }
    /**
     * Or ( field ...
     * @param {String} field 
     * @returns Constraint
     */
    orStartExpression(field) {
        return new Constraint(ConstraintType.OrStartExpression, field, this);
    }
    /**
     * And field ...)
     * @param {String} field 
     * @returns Constraint
     */
    andEndExpression(field) {
        return new Constraint(ConstraintType.AndEndExpression, field, this);
    }
    /**
     * Or field ... )
     * @param {String} field 
     * @returns Constraint
     */
    orEndExpression(field) {
        return new Constraint(ConstraintType.OrEndExpression, field, this);
    }
    /**
     * )
     * @param {String} field 
     * @returns Constraint
     */
    closeExpression() {
        this.Constraints.push(new Constraint(ConstraintType.CloseExpression));
        return this;
    }

    /**
     * orderBy field asc
     * @param {String} field 
     * @returns Constraint
     */
    orderBy(field) {
        this.orderBy.push(new {
            field,
            aspect: "ASC"
        })
        return this
    }
    /**
     * orderBy field desc
     * @param {String} field 
     * @returns Constraint
     */
    orderByDescending(field) {
        this.orderBy.push(new {
            field,
            aspect: "DESC"
        });
        return this
    }
    toJSON() {
        return {
            fields: this.fields,
            constraints: this.constraints,
            orderBy: this.orderBy,
            groupBy: this.groupBy,
            distinctBy: this.distinctBy,
            froms: this.froms,
            rows: this.rows,
            offset: this.offset
        }
    }
}

export { Query, Operator, ConstraintType }