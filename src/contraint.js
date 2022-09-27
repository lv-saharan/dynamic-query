import Operator from "./operator.js"
class Constraint {
    #query
    /**
     * 
     * @param {String} type 
     * @param {String} field 
     * @param {Query} query 
     * @param {Number} boost 
     */
    constructor(type, field, query) {
        this.constraintType = type;
        this.field = field;
        this.boost = 1.0;
        this.operator = null
        this.value = null

        this.#query = query;
        this.#query.constraints.push(this)
    }

    /**
     * 设置权重
     * @param {Number} boost 
     * @returns {Constraint}
     */
    setBoost(boost) {
        this.boost = boost
        return this
    }
    /**
     * 相等
     * @param {*} value 
     * @returns {Query}
     */
    isEqualTo(value) {
        this.operator = Operator.IsEqualTo
        this.value = value
        return this.#query
    }
    /**
     * 不相等
     * @param {*} value 
     * @returns {Query}
     */
    isNotEqualTo(value) {
        this.operator = Operator.IsNotEqualTo
        this.value = value
        return this.#query
    }
    /**
     * 包含值
     * @param  {...any} value 
     * @returns  {Query}
     */
    in(...value) {
        this.operator = Operator.In
        this.value = value
        return this.#query
    }

    /**
     * 不包含值
     * @param  {...any} value 
     * @returns {Query}
     */
    notIn(...value) {
        this.operator = Operator.NotIn
        this.value = value
        return this.#query
    }
    /**
     * 两个值之间
     * @param  {...any} value 
     * @returns {Query}
     */
    isBetweenAnd(...value) {
        this.operator = Operator.IsBetweenAnd
        this.value = value
        return this.#query
    }
    /**
     * 不在两个值之间
     * @param  {...any} value 
     * @returns {Query}
     */
    isNotBetweenAnd(...value) {
        this.operator = Operator.IsNotBetweenAnd
        this.value = value
        return this.#query
    }
    /**
    * 大于
    * @param  {any} value 
    * @returns {Query}
    */
    isGreaterThan(value) {
        this.operator = Operator.IsGreaterThan
        this.value = value
        return this.#query
    }
    /**
     * 大于等于
     * @param {*} value 
     * @returns {Query}
     */
    isGreaterThanOrEqualTo(value) {
        this.operator = Operator.IsGreaterThanOrEqualTo
        this.value = value
        return this.#query
    }
    /**
     * 小于
     * @param {*} value 
     * @returns {Query}
     */
    isLessThan(value) {
        this.operator = Operator.IsLessThan
        this.value = value
        return this.#query
    }
    /**
     * 小于等于
     * @param {*} value 
     * @returns {Query}
     */
    isLessThanOrEqualTo(value) {
        this.operator = Operator.IsLessThanOrEqualTo
        this.value = value
        return this.#query
    }
    /**
     * LIKE
     * @param {String} value 
     * @returns {Query}
     */
    like(value) {
        this.operator = Operator.Like
        this.value = value
        return this.#query
    }
    /**
     * Not Like
     * @param {String} value 
     * @returns {Query}
     */
    notLike(value) {
        this.operator = Operator.NotLike
        this.value = value
        return this.#query
    }
    /**
     * startsWith
     * @param {String} value 
     * @returns {Query}
     */
    startsWith(value) {
        this.operator = Operator.StartsWith
        this.value = value
        return this.#query
    }
    /**
     * notStartsWith 
     * @param {String} value 
     * @returns {Query}
     */
    notStartsWith(value) {
        this.operator = Operator.NotStartsWith
        this.value = value
        return this.#query
    }
    /**
     * endsWith
     * @param {String} value 
     * @returns {Query}
     */
    endsWith(value) {
        this.operator = Operator.EndsWith
        this.value = value
        return this.#query
    }
    /**
     * notEndsWith
     * @param {String} value 
     * @returns {Query}
     */
    notEndsWith(value) {
        this.operator = Operator.NotEndsWith
        this.value = value
        return this.#query
    }
}

export default Constraint