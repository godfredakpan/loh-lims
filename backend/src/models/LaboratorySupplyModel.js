
const db = require('../config/db.js');

class LaboratorySupplyModel {
  static getAll() {
    return db.any('SELECT * FROM laboratory_supplies');
  }

  static getById(id) {
    return db.one('SELECT * FROM laboratory_supplies WHERE id = $1', id);
  }

  static create({ name, quantity, reorder_point }) {
    return db.one(
      'INSERT INTO laboratory_supplies (name, quantity, reorder_point) VALUES ($1, $2, $3) RETURNING *',
      [name, quantity, reorder_point]
    );
  }

  static update(id, { name, quantity, reorder_point }) {
    return db.one(
      'UPDATE laboratory_supplies SET name = $1, quantity = $2, reorder_point = $3 WHERE id = $4 RETURNING *',
      [name, quantity, reorder_point, id]
    );
  }

  static delete(id) {
    return db.one('DELETE FROM laboratory_supplies WHERE id = $1 RETURNING *', id);
  }
}

module.exports = LaboratorySupplyModel;
