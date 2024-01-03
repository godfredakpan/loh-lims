
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index'); 
const { expect } = chai;

chai.use(chaiHttp);

describe('Supply Routes', () => {
  const testSupply = {
    name: 'Test Supply',
    quantity: 20,
    reorder_point: 10,
  };

  let createdSupplyId;

  describe('POST /api/supplies', () => {
    it('should create a new supply', async () => {
      const res = await chai
        .request(server)
        .post('/api/supplies')
        .send(testSupply);

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      createdSupplyId = res.body.id;
    });
  });

  describe('GET /api/supplies/:id', () => {
    it('should get details of a specific supply', async () => {
      const res = await chai.request(server).get(`/api/supplies/${createdSupplyId}`);
      
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name').equal(testSupply.name);
    });
  });

  describe('PUT /api/supplies/:id', () => {
    it('should update information about a supply', async () => {
      const updatedSupply = { ...testSupply, quantity: 25 };
      const res = await chai
        .request(server)
        .put(`/api/supplies/${createdSupplyId}`)
        .send(updatedSupply);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('quantity').equal(updatedSupply.quantity);
    });
  });

  describe('DELETE /api/supplies/:id', () => {
    it('should delete a supply', async () => {
      const res = await chai.request(server).delete(`/api/supplies/${createdSupplyId}`);
      
      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id').equal(createdSupplyId);
    });
  });
});
