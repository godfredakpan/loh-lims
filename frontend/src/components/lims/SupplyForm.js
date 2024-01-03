
import React, { useState, useEffect } from 'react';

const SupplyForm = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...item });

  useEffect(() => {
    setFormData({ ...item });
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input className='form-control' type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label style={{marginLeft: 10}} >
        Quantity:
        <input className='form-control' type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
      </label>
      <label>
        Reorder Point:
        <input className='form-control' type="number" name="reorder_point" value={formData.reorder_point} onChange={handleChange} />
      </label>
      <br/>
      <button className='btn btn-success' style={{marginTop: 10}} type="submit">Save</button>
    </form>
  );
};

export default SupplyForm;
