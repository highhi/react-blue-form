import * as React from 'react';

interface IState {
  isValid: boolean;
}

export default function BlueForm(options: object) {
  return (renderComponent: Function) => {
    return class extends React.Component<{}, {}> {
      state: IState;

      constructor(props: {}) {
        super(props);
        this.state = { isValid: false };
      }

      onSubmit = (event: MouseEvent) => {
        event.preventDefault();
        if (!this.state.isValid) return console.log('errors');
      }

      render() {
        const handlers = {
          onSubmit: this.onSubmit,
        };

        return renderComponent(handlers);
      }
    }
  }
}
