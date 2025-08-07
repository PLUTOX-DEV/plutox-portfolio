import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as TbIcons from 'react-icons/tb';
import * as RiIcons from 'react-icons/ri';
import * as HiIcons from 'react-icons/hi';
import * as IoIcons from 'react-icons/io5';
import * as MdIcons from 'react-icons/md';

// Merge all icon sets
export const allIcons = {
  ...FaIcons,
  ...SiIcons,
  ...TbIcons,
  ...RiIcons,
  ...HiIcons,
  ...IoIcons,
  ...MdIcons,
};

// Return actual icon component from name
export function getIconComponent(name) {
  return allIcons[name] || null;
}
