import ConstraintType from '../src/constraint-type.js'
import { Query } from '../src/index.js' 
import Operator from '../src/operator.js'
const q1 = new Query("Table")
q1.Fields = ["a", "b", "c"]

q1.Where("a").IsEqualTo(10)
    .And("b").In(1, 2, 3)
    .AndStartExpression("c").IsBetweenAnd(5, 6)
    .OrEndExpression("c").IsBetweenAnd(7, 8)



const getStartConstraint = constraintType => {
    switch (constraintType) {
        case ConstraintType.And:
        case ConstraintType.AndEndExpression:
            return "And"
        case ConstraintType.AndStartExpression:
            return "And ("
        case ConstraintType.Or:
        case ConstraintType.OrEndExpression:
            return "OR"
        case ConstraintType.OrStartExpression:
            return "OR ("
    }
    return ""

}

const getEndConstraint = constraintType => {
    switch (constraintType) {
        case ConstraintType.AndEndExpression:
        case ConstraintType.OrEndExpression:
        case ConstraintType.CloseExpression:
            return ")"
    }
    return ""
}
const buildQuery = query => {
    const sqlWhere = []
    for (let constraint of query.Constraints) {
        sqlWhere.push(getStartConstraint(constraint.ConstraintType))
        switch (constraint.Operator) {
            case Operator.In:
                sqlWhere.push(`${constraint.FieldName} in (${constraint.Value.join(',')})`)
                break;
            case Operator.IsEqualTo:
                sqlWhere.push(`${constraint.FieldName} = ${constraint.Value}`)
                break;
            case Operator.IsBetweenAnd:
                const [from, to] = constraint.Value
                sqlWhere.push(`${constraint.FieldName} between ${from} and ${to}`)
                break
        }
        sqlWhere.push(getEndConstraint(constraint.ConstraintType))
    }
    return sqlWhere.join(' ')

}

console.log("query 1", q1)


console.log("query where:", buildQuery(q1))