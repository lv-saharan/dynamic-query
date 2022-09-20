class Constraint {
    #Query
    /**
     * 
     * @param {String} type 
     * @param {String} fieldName 
     * @param {Query} query 
     * @param {Number} boost 
     */
    constructor(type, fieldName, query) {
        this.ConstraintType = type;
        this.FieldName = fieldName;
        this.Boost = 1.0;
        this.Operator = null
        this.Value = null

        this.#Query = query;
        this.#Query.Constraints.push(this)
    }

    SetBoost(boost) {
        this.Boost = boost
        return this
    }
    IsEqualTo(value) {
        this.Operator = "IsEqualTo"
        this.Value = value
        return this.#Query
    }
    IsNotEqualTo(value) {
        this.Operator = "IsNotEqualTo"
        this.Value = value
        return this.#Query
    }
    In(...value) {
        this.Operator = "In"
        this.Value = value
        return this.#Query
    }
    NotIn(...value) {
        this.Operator = "NotIn"
        this.Value = value
        return this.#Query
    }
    IsBetweenAnd(...value) {
        this.Operator = "IsBetweenAnd"
        this.Value = value
        return this.#Query
    }
    IsNotBetweenAnd(...value) {
        this.Operator = "IsNotBetweenAnd"
        this.Value = value
        return this.#Query
    }
    IsGreaterThan(value) {
        this.Operator = "IsGreaterThan"
        this.Value = value
        return this.#Query
    }
    IsGreaterThanOrEqualTo(value) {
        this.Operator = "IsGreaterThanOrEqualTo"
        this.Value = value
        return this.#Query
    }
    IsLessThan(value) {
        this.Operator = "IsLessThan"
        this.Value = value
        return this.#Query
    }
    IsLessThanOrEqualTo(value) {
        this.Operator = "IsLessThanOrEqualTo"
        this.Value = value
        return this.#Query
    }

    Like(value) {
        this.Operator = "Like"
        this.Value = value
        return this.#Query
    }
    NotLike(value) {
        this.Operator = "NotLike"
        this.Value = value
        return this.#Query
    }
    StartsWith(value) {
        this.Operator = "StartsWith"
        this.Value = value
        return this.#Query
    }
    NotStartsWith(value) {
        this.Operator = "NotStartsWith"
        this.Value = value
        return this.#Query
    }
    EndsWith(value) {
        this.Operator = "EndsWith"
        this.Value = value
        return this.#Query
    }
    NotEndsWith(value) {
        this.Operator = "NotEndsWith"
        this.Value = value
        return this.#Query
    }
}

export default Constraint