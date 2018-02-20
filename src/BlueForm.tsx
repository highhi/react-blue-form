import * as React from 'react';

type TRenderCompoent = (
  handler: object,
  validator: object
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
        this.filedValidators = this.filedValidators.concat([validator]);
      }

      valiate = (): boolean => {
        return this.filedValidators.every(validator => validator());
      }

      onSubmit = (event: MouseEvent) => {
        event.preventDefault();
        const reuslt = this.valiate();
        if (reuslt) {
          console.log('done');
        } else {
          console.log('fail');
        }

        this.setState({ isValid: reuslt });
      }

      render() {
        const handlers = {
          onSubmit: this.onSubmit,
        };

        const validator = {
          setFieldValidator: this.setFieldValidator,
        };

        return renderComponent(handlers, validator);
      }
    }
  }
}
