import { Component } from "react";
import ReactDOM from "react-dom";

const portalRoot =
  typeof document !== `undefined` ? document.getElementById("portal") : null;

export default class Portal extends Component {
  constructor() {
    super();
    this.el =
      typeof document !== `undefined` ? document.createElement("div") : null;
  }

  componentDidMount = () => {
    if (!portalRoot) {
      const newNode = document.createElement('div')
      newNode.setAttribute('id', 'select-root')
      const rootNode = document.querySelector('#root')
      rootNode.after(newNode)
      newNode.appendChild(this.el)
    } else {
      portalRoot.appendChild(this.el);
    }
  };

  componentWillUnmount = () => {
    portalRoot.removeChild(this.el);
  };

  render() {
    const { children } = this.props;

    if (this.el) {
      return ReactDOM.createPortal(children, this.el);
    } else {
      return null;
    }
  }
}