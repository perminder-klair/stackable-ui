import React from 'react';
import PropTypes from 'prop-types';
import { withFormik } from 'formik';

// this form is use for both purpose( create and update)
// Our inner form component which receives our form's state and updater methods as props
const InfoForm = ({
  values,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="ui form">
      <div className="field">
        <label htmlFor="itemName">
          Field Name
          <input
            type="text"
            name="name"
            id="itemName"
            placeholder="type field name here, eg: Title, Description, Featured Image, Is Active"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.itemName}
          />
        </label>
      </div>
      <div className="field">
        <label htmlFor="description">
          Field Description
          <input
            type="text"
            name="description"
            placeholder="type field description here"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.description}
          />
        </label>
      </div>
      <div className="field">
        <div className="ui checkbox">
          <label htmlFor="isDisabled">
            <input
              type="checkbox"
              name="isDisabled"
              checked={values.isDisabled}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            Field Disabled
          </label>
        </div>
      </div>
      <div className="ui divider" />
      <button
        className="ui primary button"
        type="submit"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </div>
  </form>
);

// Wrap our form with the using withFormik HoC
export default withFormik({
  // Transform outer props into form values
  mapPropsToValues: props => ({
    itemName: '',
    description: '',
    isDisabled: false,
  }),
  // Add a custom validation function (this can be async too!)
  validate: () => {},
  // Submission handler
  handleSubmit: (values, { props, setSubmitting }) => {
    console.log('submit', values);
    // props.submit(values);
    setSubmitting(false);
  },
})(InfoForm);

InfoForm.propTypes = {
  values: PropTypes.shape({
    itemName: PropTypes.string,
    description: PropTypes.string,
    isDisabled: PropTypes.bool,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
};