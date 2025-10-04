import React, { useState } from 'react';
import $ from 'jquery';

const FormComponent = () => {
  const [formData, setFormData] = useState({ name: '', email: '', description: '' });
  const [cards, setCards] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, description } = formData;
    if (name && email && description) {
      setCards([...cards, { ...formData }]);
      $('#confirmationModal').modal('show');
      setFormData({ name: '', email: '', description: '' });
    } else {
      alert('Please fill out all fields');
    }
  };

  return (
    <div>
      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-success">Submit</button>
      </form>

      <div className="row">
        {cards.map((card, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card">
              <div className="card-body">
                <h5>{card.name}</h5>
                <p>{card.email}</p>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <div className="modal fade" id="confirmationModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Submission Successful</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Your request has been submitted!</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
