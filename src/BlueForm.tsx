import * as React from 'react';

type TRenderCompoent = (
  handler: object,
  setFieldValidator: Function
) => React.ComponentClass | React.SFC;

interface IState {
  isValid: boolean;
}

interface IValues {
  [index: string]: any;
}

interface IEventTarget {
  name: string;
  value: number | string;
}

export default function BlueForm(options: object) {
  return (renderComponent: TRenderCompoent) => {
    return class extends React.Component<{}, {}> {
      private filedValidators: any[];
      state: IState;

      constructor(props: {}) {
        super(props);
        this.state = { isValid: false };
        this.filedValidators = [];
      }

      setFieldValidator = (validator: Function) => {
        this.filedValidators.concat(validator);
      }

      onSubmit = (event: MouseEvent) => {
        event.preventDefault();
        if (!this.state.isValid) return console.log('errors');
      }

      render() {
        const handlers = {
          onSubmit: this.onSubmit,
        };

        return renderComponent(handlers, this.setFieldValidator);
      }
    }
  }
}
