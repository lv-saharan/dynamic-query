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
q1.Fields = ["a", "b", "c"]

q1.Where("a").IsEqualTo(10)
    .And("b").In(1, 2, 3)
    .AndStartExpression("c").IsBetweenAnd(5, 6)
    .OrEndExpression("c").IsBetweenAnd(7, 8)

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

```

## out put
```sql
a = 10  And b in (1,2,3)  And ( c between 5 and 6  OR c between 7 and 8 )
```

## Constraints
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
