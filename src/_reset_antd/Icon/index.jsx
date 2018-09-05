import * as React from 'react'
import classNames from 'classnames'
import * as allIcons from './icons'
import ReactIcon from '@ant-design/icons-react'
import createFromIconfontCN from './IconFont.jsx'
import {
  svgBaseProps, withThemeSuffix,
  removeTypeTheme, getThemeFromTypeName,
} from './utils'
import { getTwoToneColor, setTwoToneColor } from './twoTonePrimaryColor'

// Initial setting
ReactIcon.add(...Object.keys(allIcons).map((key) => allIcons[key]))
setTwoToneColor('#1890ff');

const Icon = (props) => {
  const {
    // affect outter <i>...</i>
    className,

    // affect inner <svg>...</svg>
    type,
    component: Component,
    viewBox,
    spin,

    // children
    children,

    // other
    theme, // default to outlined
    twoToneColor,

    ...restProps
  } = props;

  const classString = classNames({
    [`anticon`]: true,
    [`anticon-${type}`]: Boolean(type),
  }, className);

  const svgClassString = classNames({
    [`anticon-spin`]: !!spin || type === 'loading',
  });

  let innerNode;

  // component > children > type
  if (Component) {
    const innerSvgProps = {
      ...svgBaseProps,
      className: svgClassString,
      viewBox,
    };
    if (!viewBox) {
      delete innerSvgProps.viewBox;
    }

    innerNode = (
      <Component {...innerSvgProps} >
        {children}
      </Component>
    );
  }

  if (children) {
    const innerSvgProps = {
      ...svgBaseProps,
      className: svgClassString,
    };
    innerNode = (
      <svg {...innerSvgProps} viewBox={viewBox}>
        {children}
      </svg>
    );
  }

  if (typeof type === 'string') {
    let computedType = type;
    if (theme) {
      const alreadyHaveTheme = getThemeFromTypeName(type);
    }
    computedType = withThemeSuffix(
      removeTypeTheme(type),
      theme || 'outlined',
    );
    innerNode = (
      <ReactIcon
        className={svgClassString}
        type={computedType}
        primaryColor={twoToneColor}
      />
    );
  }

  return (
    <i {...restProps} className={classString}>
      {innerNode}
    </i>
  );
};


Icon.displayName = 'Icon';
Icon.createFromIconfontCN = createFromIconfontCN;
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;

export default Icon;