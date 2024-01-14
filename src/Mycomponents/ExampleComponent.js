// src/Mycomponents/ExampleComponent.js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const ExampleComponent = ({ data, firstName, dispatchExampleAction, dispatchUpdateFirstName }) => {
  // Local state to track changes for logging
  const [localData, setLocalData] = useState(data);
  const [localFirstName, setLocalFirstName] = useState(firstName);

  // Use useEffect to log changes whenever data or firstName is updated
  useEffect(() => {
    console.log('Data updated:', localData);
  }, [localData]);

  useEffect(() => {
    console.log('First Name updated:', localFirstName);
  }, [localFirstName]);

  // Use console.log to check whether the values are updated
  console.log('Rendered ExampleComponent with data:', localData, 'and firstName:', localFirstName);

  return (
    <div>
      <p>{localData}</p>
      <p>First Name: {localFirstName}</p>
      <button
        onClick={() => {
          dispatchExampleAction('New Data');
          setLocalData('New Data');
        }}
      >
        Update Data
      </button>
      <button
        onClick={() => {
          dispatchUpdateFirstName('Akash');
          setLocalFirstName('Akash');
        }}
      >
        Set First Name to Akash
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.example.data,
    firstName: state.example.firstName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchExampleAction: (newData) =>
      dispatch({
        type: 'EXAMPLE_ACTION',
        payload: Promise.resolve(newData),
      }),
    dispatchUpdateFirstName: (firstName) =>
      dispatch({
        type: 'UPDATE_FIRST_NAME',
        payload: firstName,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExampleComponent);
