# dynamic-query

build a query object 

用js构建类sql的语句解构，可以把前端的查询或其他操作通过通用的结构传递给后端，后端解析结构后可以应用相关逻辑执行。

# install

```bash
npm i dynamic-query
```

# usage

## create query

```javascript
import { query, Query } from "dynamic-query";

const q1 = query("table")
  .select("a", "b", "c")
  .where("a")
  .isEqualTo(10)
  .and("b")
  .in(1, 2, 3)
  .andStartExpression("c")
  .isBetweenAnd(5, 6)
  .orEndExpression("c")
  .isBetweenAnd(7, 8)
  .orderBy("a","b")
  .groupBy("a", "b", "c")
  .having("a").isGreaterThan(3).and("b").isGreaterThan(2)
```

## post to server

```javascript
$.post(...,q1)
```

## build a query use server code

```javascript
//demo

const getStartConstraint = (constraintType) => {
  switch (constraintType) {
    case constraintType.And:
    case constraintType.AndEndExpression:
      return "And";
    case constraintType.AndStartExpression:
      return "And (";
    case constraintType.Or:
    case constraintType.OrEndExpression:
      return "OR";
    case constraintType.OrStartExpression:
      return "OR (";
  }
  return "";
};

const getEndConstraint = (constraintType) => {
  switch (constraintType) {
    case constraintType.AndEndExpression:
    case constraintType.OrEndExpression:
    case constraintType.CloseExpression:
      return ")";
  }
  return "";
};
const buildQuery = (query) => {
  const sqlWhere = [];
  for (let constraint of query.constraints) {
    sqlWhere.push(getStartConstraint(constraint.constraintType));
    switch (constraint.operator) {
      case Operator.In:
        sqlWhere.push(`${constraint.field} in (${constraint.value.join(",")})`);
        break;
      case Operator.IsEqualTo:
        sqlWhere.push(`${constraint.field} = ${constraint.value}`);
        break;
      case Operator.IsBetweenAnd:
        const [from, to] = constraint.value;
        sqlWhere.push(`${constraint.field} between ${from} and ${to}`);
        break;
    }
    sqlWhere.push(getEndConstraint(constraint.constraintType));
  }
  return sqlWhere.join(" ");
};
```

## out put

```sql
a = 10  And b in (1,2,3)  And ( c between 5 and 6  OR c between 7 and 8 )
```

## constraints

```javascript
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

## insert

```javascript
import { insert } from "dynamic-query";

const insertUser = insert("user", { name: "lv", age: 99 });

console.log("insert user", updateUser.toString());
```

## update

```javascript
import { update } from "dynamic-query";

const updateUser = update("user", { name: "lv", age: 99 });

updateUser.where("age").isGreaterThan(90).and("age").isLessThan(98);

console.log("update user", updateUser.toString());
```

## delete

```javascript
import { del } from "dynamic-query";
const delUsers = del("user").where("age").isGreaterThan(29);

console.log("del user", delUsers.toString());
```
