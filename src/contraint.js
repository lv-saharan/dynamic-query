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

    setBoost(boost) {
        this.boost = boost
        return this
    }
    isEqualTo(value) {
        this.operator = Operator.IsEqualTo
        this.value = value
        return this.#query
    }
    isNotEqualTo(value) {
        this.operator = Operator.IsNotEqualTo
        this.value = value
        return this.#query
    }
    in(...value) {
        this.operator = Operator.In
        this.value = value
        return this.#query
    }
    notIn(...value) {
        this.operator = Operator.NotIn
        this.value = value
        return this.#query
    }
    isBetweenAnd(...value) {
        this.operator = Operator.IsBetweenAnd
        this.value = value
        return this.#query
    }
    isNotBetweenAnd(...value) {
        this.operator = Operator.IsNotBetweenAnd
        this.value = value
        return this.#query
    }
    isGreaterThan(value) {
        this.operator = Operator.IsGreaterThan
        this.value = value
        return this.#query
    }
    isGreaterThanOrEqualTo(value) {
        this.operator = Operator.IsGreaterThanOrEqualTo
        this.value = value
        return this.#query
    }
    isLessThan(value) {
        this.operator = Operator.IsLessThan
        this.value = value
        return this.#query
    }
    isLessThanOrEqualTo(value) {
        this.operator = Operator.IsLessThanOrEqualTo
        this.value = value
        return this.#query
    }

    like(value) {
        this.operator = Operator.Like
        this.value = value
        return this.#query
    }
    notLike(value) {
        this.operator = Operator.NotLike
        this.value = value
        return this.#query
    }
    startsWith(value) {
        this.operator = Operator.StartsWith
        this.value = value
        return this.#query
    }
    notStartsWith(value) {
        this.operator = Operator.NotStartsWith
        this.value = value
        return this.#query
    }
    endsWith(value) {
        this.operator = Operator.EndsWith
        this.value = value
        return this.#query
    }
    notEndsWith(value) {
        this.operator = Operator.NotEndsWith
        this.value = value
        return this.#query
    }
}

export default Constraint