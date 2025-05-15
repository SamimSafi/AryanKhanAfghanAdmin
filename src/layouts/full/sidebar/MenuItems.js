
import { uniqueId } from 'lodash';

import {
  IconCopy, IconLayoutDashboard, IconTypography,
  IconUserCircle,
  IconLock, IconAlignBoxLeftBottom, IconCheckbox, IconRadar, IconSlideshow, IconCaretUpDown, IconTable, IconForms,
  IconLogin,
  IconAperture
} from '@tabler/icons-react';


const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },

  {
    id: uniqueId(),
    title: 'Clients',
    icon: IconAperture,
    href: '/clients',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconAperture,
    href: '/users',
  },
  {
    id: uniqueId(),
    title: 'History',
    icon: IconAperture,
    href: '/history',
  },
  {
    id: uniqueId(),
    title: 'Leadership',
    icon: IconAperture,
    href: '/leadership',
  },
  {
    navlabel: true,
    subheader: 'Utilities',
  },
  {
    id: uniqueId(),
    title: 'Autocomplete',
    icon: IconTypography,
    href: '/form-elements/autocomplete',
  },
  {
    id: uniqueId(),
    title: 'Buttons',
    icon: IconAlignBoxLeftBottom,
    href: '/form-elements/button',
  },
  {
    id: uniqueId(),
    title: 'Checkbox',
    icon: IconCheckbox,
    href: '/form-elements/checkbox',
  },
  {
    id: uniqueId(),
    title: 'Radio',
    icon: IconRadar,
    href: '/form-elements/radio',
  },
  {
    id: uniqueId(),
    title: 'Slider',
    icon: IconSlideshow,
    href: '/form-elements/slider',
  },
  {
    id: uniqueId(),
    title: 'Switch',
    icon: IconCaretUpDown,
    href: '/form-elements/switch',
  },
  {
    id: uniqueId(),
    title: 'Tables',
    icon: IconTable,
    href: '/tables/basic-table',
  },
  {
    id: uniqueId(),
    title: 'Form Layouts',
    icon: IconForms,
    href: '/form-layouts',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
  {
    id: uniqueId(),
    title: 'Typography',
    icon: IconTypography,
    href: '/ui/typography',
  },
  {
    id: uniqueId(),
    title: 'Shadow',
    icon: IconCopy,
    href: '/ui/shadow',
  },

  {
    navlabel: true,
    subheader: 'Auth',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserCircle,
    href: '/auth/register',
  },
  {
    id: uniqueId(),
    title: 'Auth Pages',
    icon: IconLock,
    href: '/auth/login',
    chip: 'Pro',
  },

];

export default Menuitems;
