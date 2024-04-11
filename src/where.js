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
   * as andStartExpression
   * @param {*} field
   * @returns
   */
  andLeft(field) {
    return this.andStartExpression(field);
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
   * as orStartExpression
   * @param {*} field
   * @returns
   */
  orLeft(field) {
    return this.orStartExpression(field);
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
   * as andEndExpression
   * @param {*} field
   * @returns
   */
  andRight(field) {
    return this.andEndExpression(field);
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
   * as orEndExpression
   * @param {*} field
   * @returns
   */
  orRight(field) {
    return this.orEndExpression(field);
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

  right() {
    return this.closeExpression();
  }

  close() {
    return this.closeExpression();
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
