
const request = require('supertest');
const app = require('../index'); 
const assert = require('assert');

describe('Supply Routes', () => {
  let createdSupplyId;

  // Test case for creating a new supply
  it('should create a new supply', async () => {
    const newSupplyData = {
      name: 'Test Supply',
      quantity: 20,
      reorder_point: 10,
    };

    const response = await request(app)
      .post('/api/laboratory-supplies')
      .send(newSupplyData)
      .expect(200);

    assert.strictEqual(response.body.name, newSupplyData.name);
    assert.strictEqual(response.body.quantity, newSupplyData.quantity);
    assert.strictEqual(response.body.reorder_point, newSupplyData.reorder_point);

    createdSupplyId = response.body.id; 
  });

  // Test case for getting details of a specific supply
  it('should get details of a specific supply', async () => {
    const response = await request(app)
      .get(`/api/laboratory-supplies/${createdSupplyId}`)
      .expect(200);

    assert.strictEqual(response.body.id, createdSupplyId);
    assert.strictEqual(response.body.name, 'Test Supply');
  });

  // Test case for updating information about a supply
  it('should update information about a supply', async () => {
    const updatedSupplyData = {
      name: 'Updated Supply',
      quantity: 25,
      reorder_point: 15,
    };

    const response = await request(app)
      .put(`/api/laboratory-supplies/${createdSupplyId}`)
      .send(updatedSupplyData)
      .expect(200);

    assert.strictEqual(response.body.id, createdSupplyId);
    assert.strictEqual(response.body.name, 'Updated Supply');
    assert.strictEqual(response.body.quantity, 25);
    assert.strictEqual(response.body.reorder_point, 15);
  });

  // Test case for deleting a supply
  it('should delete a supply', async () => {
    const response = await request(app)
      .delete(`/api/laboratory-supplies/${createdSupplyId}`)
      .expect(200);

    assert.strictEqual(response.body.id, createdSupplyId);
  });
});
