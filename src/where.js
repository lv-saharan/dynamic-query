import Constraint from "./contraint.js";
import ConstraintType from "./constraint-type.js";
export default class Where {
  #constraints = [];

  get constraints() {
    return this.#constraints;
  }
  /**
   * Where field ...
   * @param {String} field
   * @returns {Constraint}
   */

  where(field) {
    return new Constraint(ConstraintType.Where, field, this);
  }
  /**
   * And field ...
   * @param {String} field
   * @returns {Constraint}
   */
  and(field) {
    return new Constraint(ConstraintType.And, field, this);
  }
  /**
   * Or field ...
   * @param {String} field
   * @returns {Constraint}
   */
  or(field) {
    return new Constraint(ConstraintType.Or, field, this);
  }
  /**
   * And ( field ...
   * @param {String} field
   * @returns {Constraint}
   */
  andStartExpression(field) {
    return new Constraint(ConstraintType.AndStartExpression, field, this);
  }
  /**
   * Or ( field ...
   * @param {String} field
   * @returns {Constraint}
   */
  orStartExpression(field) {
    return new Constraint(ConstraintType.OrStartExpression, field, this);
  }
  /**
   * And field ...)
   * @param {String} field
   * @returns {Constraint}
   */
  andEndExpression(field) {
    return new Constraint(ConstraintType.AndEndExpression, field, this);
  }
  /**
   * Or field ... )
   * @param {String} field
   * @returns {Constraint}
   */
  orEndExpression(field) {
    return new Constraint(ConstraintType.OrEndExpression, field, this);
  }
  /**
   * )
   * @param {String} field
   * @returns {Constraint}
   */
  closeExpression() {
    this.Constraints.push(new Constraint(ConstraintType.CloseExpression));
    return this;
  }

  /**
   * post more easy
   * @returns String
   */
  toString() {
    return JSON.stringify(this.toJSON());
  }

  toJSON() {
    return {
      constraints: this.constraints,
    };
  }
}
