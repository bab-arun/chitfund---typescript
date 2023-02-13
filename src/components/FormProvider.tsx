/* eslint-disable react/react-in-jsx-scope */
import PropTypes from 'prop-types';
// form
import { FormProvider as Form } from 'react-hook-form';

// ----------------------------------------------------------------------

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
  methods: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
};

interface Props {
  children?: any,
  onSubmit?:any,
  methods?:any
}

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <>
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
    </>
  );
}
