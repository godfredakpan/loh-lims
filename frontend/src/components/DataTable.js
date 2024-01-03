
import React, { useState } from 'react';
import { useTable } from 'react-table';
import SupplyForm from './lims/SupplyForm';

const DataTable = ({ columns, data, onEdit, onDelete }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div>
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
                <td>
                  <button  className="btn btn-outline-primary" onClick={() => handleEdit(row.original)}>Edit</button>
                  <button  className="btn btn-outline-danger" onClick={() => handleDelete(row.original.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Supply</h5>
              <button type="button" className="close btn btn-danger" aria-label="Close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
            <SupplyForm item={selectedItem} onSave={onEdit} onClose={() => setShowModal(false)} />
          </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
