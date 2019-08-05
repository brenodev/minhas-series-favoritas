import React from "react";

const NewGenres = () => {
  return (
    <div className="container">
      <h1>Novo Gênero</h1>
      <form action="">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
      </form>
    </div>
  );
};

export default NewGenres;
