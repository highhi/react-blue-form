import * as React from 'react';
import omit from './utils/omit';

interface IState {
  isValid: boolean;
  value: string;
}

interface IProps {
  validator: {
    setFieldValidator: Function;
  };
}

export default function BulueField() {
  return (renderComponent: Function) => {
    return class extends React.Component<IProps, IState> {
      private value: any;
      state: IState;

      constructor(props: IProps) {
        super(props);
        this.state = { value: '', isValid: false };
        this.props.validator.setFieldValidator(this.getValidedResult);
      }

      validate = (value: any): boolean => {
        return value ? true : false;
      }

      getValidedResult = (): boolean => {
        return this.state.isValid;
      }

      onChange = (event: Event) => {
        this.setState({ value: event.target.value });
      }

      onBlur = () => {
        const isValid = this.validate(this.state.value);
        this.setState({ isValid });
      }

      render() {
        const props = {
          value: this.state.value,
          onChange: this.onChange,
          onBlur: this.onBlur,
          ...omit(this.props, 'validator')
        };

        return renderComponent(props, this.state.isValid);
      }
    }
  }
}