export default class Table {
    #leftTable
    #rightTable
    #leftValue
    #rightValue
    #join = "join"
    constructor(table) {
        this.#leftTable = table;
    }

    get leftTable() {
        return this.#leftTable;
    }
    get rightTable() {
        return this.#leftTable;
    }
    get leftValue() {
        return this.#leftValue;
    }

    get rightValue() {
        return this.#rightValue;
    }

    get join() {
        return this.#join
    }
    /**
     * join Table
     * @param {String} rightTable 
     * @param {String} join 
     * @returns {Table}
     */
    join(rightTable, join = "join") {
        this.#join = join
        this.#rightTable = rightTable;
        return this
    }
    /**
     * left join Table
     * @param {String} rightTable 
     * @returns {Table}
     */
    leftJoin(rightTable) {
        return this.join(rightTable, "left join")
    }
    /**
     * right join Table
     * @param {String} rightTable 
     * @returns {Table}
     */
    rightJoin(rightTable) {
        return this.join(rightTable, "right join")
    }
    /**
     * set on expression
     * @param {String} leftValue 
     * @param {String} rightValue 
     * @returns {Table}
     */
    on(leftValue, rightValue) {
        this.#leftValue = leftValue;
        this.#rightValue = rightValue;
        return this
    }
    toJSON() {
        if (!this.#rightTable) {
            return this.#leftTable
        }
        else {
            return {
                leftTable: this.leftTable,
                rightTable: this.rightTable,
                leftValue: this.leftValue,
                rightValue: this.rightValue,
                join: this.join
            }
        }
    }
}
/**
 * create table query
 * @param {String} tableName 
 * @returns {Table}
 */
export function table(tableName) {
    return new Table(tableName)
}