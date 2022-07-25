import React from 'react';
import * as BoxIcons from "react-icons/bi";

type IconName = keyof typeof BoxIcons;
interface IconProps {
  icon: IconName;
  className?: string;
  title?: string;
}

/**
 *
 * @param {object} {icon}
 * @return {React.ReactElement}
 */
function Icon({ icon, className, title }: IconProps): React.ReactElement {
  const SingleIcon = BoxIcons[icon];

  return <SingleIcon className={`flex-shrink-0 ${className}`} title={title} />;
}

export default Icon;
