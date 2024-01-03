
import React, { useState, useEffect } from 'react';
import { fetchAllSupplies, createSupply, updateSupply, deleteSupply } from './services/api'
import './App.css';
import DataTable from './components/DataTable';
import SupplyForm from './components/lims/SupplyForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ToastContainer,toast} from 'react-toastify'
import 'material-react-toastify/dist/ReactToastify.css';
function App() {
  const [data, setData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const supplies = await fetchAllSupplies();
      setData(supplies);
    };

    fetchData();
  }, []);

  const handleCreate = async (newItem) => {
    try {
      const createdItem = await createSupply(newItem);
      setData([...data, createdItem]);
      toast.success('Supply created successfully!');
    } catch (error) {
      console.error('Error creating supply:', error);
      toast.error('Error creating supply. Please try again.');
    }
  };

  const handleEdit = async (editedItem) => {
    try {
      const updatedItem = await updateSupply(editedItem.id, editedItem);
      const updatedData = data.map(item => (item.id === updatedItem.id ? updatedItem : item));
      setData(updatedData);
      toast.success('Supply updated successfully!');
    } catch (error) {
      console.error('Error updating supply:', error);
      toast.error('Error updating supply. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this supply?');
  
    if (shouldDelete) {
      try {
        await deleteSupply(id);
        const updatedData = data.filter(item => item.id !== id);
        setData(updatedData);
        toast.success('Supply deleted successfully!');
      } catch (error) {
        console.error('Error deleting supply:', error);
        toast.error('Error deleting supply. Please try again.');
      }
    }
  };
  

  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Quantity', accessor: 'quantity' },
    { Header: 'Reorder Point', accessor: 'reorder_point' },
  ];

  return (
    <>
    <ToastContainer />
    <div className="container mt-5">
      <h1>Laboratory Supplies</h1>

      <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>Create New Supply</button>

      {data.length === 0 ? (
        <p className='text-danger'>No supplies available, create above</p>
      ) : (
      <DataTable
        columns={columns}
        data={data}
        onEdit={(item) => {
          setSelectedItem(item);
          setShowEditModal(true);
        } }
        onDelete={handleDelete} />
        )}

      {showCreateModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Supply</h5>
                <button type="button" className="close btn btn-danger" aria-label="Close" onClick={() => setShowCreateModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <SupplyForm item={{ name: '', quantity: 0, reorder_point: 0 }} onSave={handleCreate} onClose={() => setShowCreateModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Supply</h5>
                <button type="button" className="close btn btn-danger" aria-label="Close" onClick={() => setShowEditModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <SupplyForm item={selectedItem} onSave={handleEdit} onClose={() => setShowEditModal(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div></>
  );
}

export default App;
