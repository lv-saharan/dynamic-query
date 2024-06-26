import {
  from,
  update,
  insert,
  del,
  table,
  ConstraintType,
  Operator,
} from "../src/index.js";

const q1 = from(
  table("table1").join("table2").on("table1.table1Id", "table2.table1Id")
)
  .distinct()
  .select("userName", "userAge", { field: "userAge", as: "age" })
  .page(1, 10)
  .where("a")
  .isEqualTo(10)
  .and()
  .exists(from("sub").select("subId").where("subId").isEqualTo(1))
  .and("b")
  .in(1, 2, 3)
  .andStartExpression("c")
  .isBetweenAnd(5, 6)
  .orEndExpression("c")
  .isBetweenAnd(7, 8)
  .and("b")
  .isBetweenAnd(2, 3)
  .orderBy("a", "c")
  .orderByDescending("b")
  .groupBy("a", "b", "c")
  .having("a")
  .isGreaterThan(5)
  .and("b")
  .isGreaterThan(2);

console.log("q1", q1.toString());
console.log("========================================================");
const getStartConstraint = (constraintType) => {
  switch (constraintType) {
    case ConstraintType.And:
    case ConstraintType.AndEndExpression:
      return "And";
    case ConstraintType.AndStartExpression:
      return "And (";
    case ConstraintType.Or:
    case ConstraintType.OrEndExpression:
      return "OR";
    case ConstraintType.OrStartExpression:
      return "OR (";
  }
  return "";
};

const getEndConstraint = (constraintType) => {
  switch (constraintType) {
    case ConstraintType.AndEndExpression:
    case ConstraintType.OrEndExpression:
    case ConstraintType.CloseExpression:
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

console.log("query 1", JSON.stringify(q1));

console.log("query where:", buildQuery(q1));

const updateUser = update("user", { name: "lv", age: 99 });
updateUser.where("age").isGreaterThan(90).and("age").isLessThan(98);

console.log("update user", updateUser.toString());

const insertUser = insert("user", { name: "lv", age: 99 });

console.log("insert user", updateUser.toString());

const delUsers = del("user").where("age").isGreaterThan(29);

console.log("del user", delUsers.toString());
