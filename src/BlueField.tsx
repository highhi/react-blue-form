import * as React from 'react';

interface IState {
  isValid: boolean;
  value: any;
}

interface IProps {
  setFieldValidator(isValid: Function): void;
}

export default function BulueField() {
  return (renderComponent: Function) => {
    return class extends React.Component<IProps, IState> {
      private value: any;
      private mergedProps: object;
      state: IState;

      constructor(props: IProps) {
        super(props);
        const { setFieldValidator, ..._props } = this.props;
        this.state = { isValid: false };
        this.mergedProps = {
          value: this.state.value,
          onChange: this.onChange,
          onBlur: this.onBlur,
          ..._props,
        };

        setFieldValidator(this.getValid);
      }

      validate = (value: any): boolean => {
        return value ? true : false;
      }

      getValid = (): boolean => {
        return this.state.isValid;
      }

      onChange = (event: Event) => {
        const { value } = event.target;
        this.setState({ value });
      }

      onBlur = () => {
        const isValid = this.validate(this.state.value);
        this.setState({ isValid });
      }

      render() {
        return renderComponent(this.mergedProps);
      }
    }
  }
}