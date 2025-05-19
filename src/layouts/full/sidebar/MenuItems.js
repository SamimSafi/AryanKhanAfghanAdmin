
import { uniqueId } from 'lodash';

import {
  IconLayoutDashboard, IconTypography,
 IconAlignBoxLeftBottom, IconCheckbox, IconRadar, IconSlideshow, IconCaretUpDown, IconTable, IconForms,
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
    id: uniqueId(),
    title: 'Mission',
    icon: IconAperture,
    href: '/mission',
  },
  {
    id: uniqueId(),
    title: 'Partnership',
    icon: IconAperture,
    href: '/partnership',
  },
  {
    id: uniqueId(),
    title: 'Services',
    icon: IconAperture,
    href: '/services',
  },
  {
    id: uniqueId(),
    title: 'Sliders',
    icon: IconAperture,
    href: '/sliders',
  },
  {
    id: uniqueId(),
    title: 'Success Snapshots',
    icon: IconAperture,
    href: '/successSnapshots',
  },
  {
    id: uniqueId(),
    title: 'Projects',
    icon: IconAperture,
    href: '/projects',
  },
  {
    id: uniqueId(),
    title: 'Project Categories',
    icon: IconAperture,
    href: '/projectCategories',
  },
  {
    id: uniqueId(),
    title: 'Bio',
    icon: IconAperture,
    href: '/bio',
  },
  {
    id: uniqueId(),
    title: 'Company Info',
    icon: IconAperture,
    href: '/companyInfo',
  },
  {
    id: uniqueId(),
    title: 'Team',
    icon: IconAperture,
    href: '/team',
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
];

export default Menuitems;
