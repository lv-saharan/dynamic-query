# dynamic-query
build a query object
# install

```bash
npm i dynamic-query
```

# usage

## create query

```javascript
import { Query } from 'dynamic-query'

const q1 = new Query("Table")
q1.fields.push("a", "b", "c")

q1.where("a").isEqualTo(10)
    .and("b").in(1, 2, 3)
    .andStartExpression("c").isBetweenAnd(5, 6)
    .orEndExpression("c").isBetweenAnd(7, 8)

```
 
## post to server
```javascript
$.post(...,q1)
```

## build a query use server code
``` javascript
//demo



const getStartConstraint = constraintType => {
    switch (constraintType) {
        case constraintType.And:
        case constraintType.AndEndExpression:
            return "And"
        case constraintType.AndStartExpression:
            return "And ("
        case constraintType.Or:
        case constraintType.OrEndExpression:
            return "OR"
        case constraintType.OrStartExpression:
            return "OR ("
    }
    return ""

}

const getEndConstraint = constraintType => {
    switch (constraintType) {
        case constraintType.AndEndExpression:
        case constraintType.OrEndExpression:
        case constraintType.CloseExpression:
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

```

## out put
```sql
a = 10  And b in (1,2,3)  And ( c between 5 and 6  OR c between 7 and 8 )
```

## constraints
``` javascript
 {
    Where: "Where",
    And: "And",
    Or: "Or",
    AndStartExpression: "AndStartExpression",
    OrStartExpression: "OrStartExpression",
    AndEndExpression: "AndEndExpression",
    OrEndExpression: "OrEndExpression",
    CloseExpression: "CloseExpression"
}
```

## Operators
```javascript
{
    IsEqualTo: "IsEqualTo",
    IsNotEqualTo: " IsNotEqualTo",
    In: "In",
    NotIn: "NotIn",
    IsBetweenAnd: "IsBetweenAnd",
    IsNotBetweenAnd: "IsNotBetweenAnd",
    IsGreaterThan: "IsGreaterThan",
    IsGreaterThanOrEqualTo: "IsGreaterThanOrEqualTo",
    IsLessThan: " IsLessThan",
    IsLessThanOrEqualTo: "IsLessThanOrEqualTo",
    Like: "Like",
    NotLike: "NotLike",
    StartWith: "StartWith",
    NotStartWith: "NotStartWith",
    EndWith: "EndWith",
    NotEndWith: "NotEndWith"
}
```
