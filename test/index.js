import { Query, ConstraintType, Operator } from '../src/index.js'
const q1 = new Query("Table")
q1.fields.push("a", "b", "c")

q1.where("a").isEqualTo(10)
    .and("b").in(1, 2, 3)
    .andStartExpression("c").isBetweenAnd(5, 6)
    .orEndExpression("c").isBetweenAnd(7, 8)



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
    for (let constraint of query.constraints) {
        sqlWhere.push(getStartConstraint(constraint.constraintType))
        switch (constraint.operator) {
            case Operator.In:
                sqlWhere.push(`${constraint.field} in (${constraint.value.join(',')})`)
                break;
            case Operator.IsEqualTo:
                sqlWhere.push(`${constraint.field} = ${constraint.value}`)
                break;
            case Operator.IsBetweenAnd:
                const [from, to] = constraint.value
                sqlWhere.push(`${constraint.field} between ${from} and ${to}`)
                break
        }
        sqlWhere.push(getEndConstraint(constraint.constraintType))
    }
    return sqlWhere.join(' ')

}

 
console.log("query 1", JSON.stringify(q1))


console.log("query where:", buildQuery(q1))