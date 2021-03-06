import React, { Component } from 'react';
import classNames from 'classnames';
// import ClickOutHandler from 'react-onclickout'

import { sidebarCssClasses } from './Shared';
import 'element-closest'

interface Props {
  children: JSX.Element | JSX.Element[];
  className?: string;
  compact?: boolean;
  display: string;
  fixed: boolean;
  minimized?: boolean;
  isOpen?: boolean;
  offCanvas?: boolean;
  staticContext?: any;
  tag?: any;
};

class AppSidebar extends Component<Props> {
  static defaultProps = {
    tag: 'div',
    compact: false,
    display: '',
    fixed: false,
    minimized: false,
    isOpen: false,
    offCanvas: false
  };

  componentDidMount = () => {
    this.displayBreakpoint(this.props.display);
    this.isCompact(this.props.compact);
    this.isFixed(this.props.fixed);
    this.isMinimized(this.props.minimized);
    this.isOffCanvas(this.props.offCanvas);
  }

  isCompact = (compact: boolean = false) => {
    if (compact) { document.body.classList.add('sidebar-compact'); }
  }

  isFixed = (fixed: boolean) => {
    if (fixed) { document.body.classList.add('sidebar-fixed'); }
  }

  isMinimized = (minimized: boolean = false) => {
    if (minimized) { document.body.classList.add('sidebar-minimized'); }
  }

  isOffCanvas = (offCanvas: boolean = false) => {
    if (offCanvas) { document.body.classList.add('sidebar-off-canvas'); }
  }

  displayBreakpoint = (display: string) => {
    const cssTemplate = `sidebar-${display}-show`;
    let [cssClass] = sidebarCssClasses[0];
    if (display && sidebarCssClasses.indexOf(cssTemplate) > -1) {
      cssClass = cssTemplate;
    }
    document.body.classList.add(cssClass);
  }

  hideMobile = () => {
    if (document.body.classList.contains('sidebar-show')) {
      document.body.classList.remove('sidebar-show');
    }
  }

  onClickOut = (e: any) => {
    if (!e.target.closest('[data-sidebar-toggler]')) {
      this.hideMobile();
    }

  }

  render() {
    const { className, children, tag: Tag, ...attributes } = this.props;

    delete attributes.compact
    delete attributes.display
    delete attributes.fixed
    delete attributes.minimized
    delete attributes.offCanvas
    delete attributes.isOpen
    delete attributes.staticContext

    const classes = classNames(className, 'sidebar');

    // sidebar-nav root
    return (
      // TODO: Neex a fix
      // <ClickOutHandler onClickOut={(e: any) => { this.onClickOut(e) }}>
        <Tag className={classes} {...attributes}>
          {children}
        </Tag>
      // </ClickOutHandler>
    );
  }
}

export default AppSidebar;
