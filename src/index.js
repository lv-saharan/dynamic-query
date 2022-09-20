import Constraint from "./contraint.js"
import ConstraintType from "./constraint-type.js"

class Query {
    Fields = []
    Constraints = []
    DistinctBy = []
    Orders = []
    From = null
    constructor(from) {
        this.From = from
    }
    Where(fieldName) {
        return new Constraint(ConstraintType.Where, fieldName, this);
    }
    And(fieldName) {
        return new Constraint(ConstraintType.And, fieldName, this);
    }
    Or(fieldName) {
        return new Constraint(ConstraintType.Or, fieldName, this);
    }
    AndExpression(fieldName) {
        return new Constraint(ConstraintType.AndStartExpression, fieldName, this);
    }
    OrExpression(fieldName) {
        return new Constraint(ConstraintType.OrStartExpression, fieldName, this);
    }
    EndAndExpression(fieldName) {
        return new Constraint(ConstraintType.AndEndExpression, fieldName, this);
    }
    EndOrExpression(fieldName) {
        return new Constraint(ConstraintType.OrEndExpression, fieldName, this);
    }
    AndEndExpression(fieldName) {
        return new Constraint(ConstraintType.AndEndExpression, fieldName, this);
    }
    OrEndExpression(fieldName) {
        return new Constraint(ConstraintType.OrEndExpression, fieldName, this);
    }
    CloseExpression() {
        this.Constraints.push(new Constraint(ConstraintType.CloseExpression));
        return this;
    }
    AndStartExpression(fieldName) {
        return new Constraint(ConstraintType.AndStartExpression, fieldName, this);
    }
    OrStartExpression(fieldName) {
        return new Constraint(ConstraintType.OrStartExpression, fieldName, this);
    }

    OrderBy(fieldName) {
        this.Orders.push(new {
            FieldName: fieldName,
            Aspect: "ASC"
        })
        return this
    }
    OrderByDescending(fieldName) {
        this.Orders.push(new {
            FieldName: fieldName,
            Aspect: "DESC"
        });
        return this
    }
}

export default Query
export { Query }