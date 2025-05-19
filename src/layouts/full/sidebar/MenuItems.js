
import { uniqueId } from 'lodash';

import {
  IconLayoutDashboard,
  IconUsers,
  IconHistory,
  IconAward,
  IconRocket,
  IconHeartHandshake,
  IconBriefcase,
  IconSlideshow,
  IconTrophy,
  IconBox,
  IconCategory,
  IconUser,
  IconBuilding,
  IconUsersGroup,
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
    title: 'Users',
    icon: IconUsers,
    href: '/users',
  },
  {
    id: uniqueId(),
    title: 'History',
    icon: IconHistory,
    href: '/history',
  },
  {
    id: uniqueId(),
    title: 'Leadership',
    icon: IconAward,
    href: '/leadership',
  },
  {
    id: uniqueId(),
    title: 'Mission',
    icon: IconRocket,
    href: '/mission',
  },
  {
    id: uniqueId(),
    title: 'Partnership',
    icon: IconHeartHandshake,
    href: '/partnership',
  },
  {
    id: uniqueId(),
    title: 'Services',
    icon: IconBriefcase,
    href: '/services',
  },
  {
    id: uniqueId(),
    title: 'Sliders',
    icon: IconSlideshow,
    href: '/sliders',
  },
  {
    id: uniqueId(),
    title: 'Success Snapshots',
    icon: IconTrophy,
    href: '/successSnapshots',
  },
  {
    id: uniqueId(),
    title: 'Projects',
    icon: IconBox,
    href: '/projects',
  },
  {
    id: uniqueId(),
    title: 'Project Categories',
    icon: IconCategory,
    href: '/projectCategories',
  },
  {
    id: uniqueId(),
    title: 'Bio',
    icon: IconUser,
    href: '/bio',
  },
  {
    id: uniqueId(),
    title: 'Company Info',
    icon: IconBuilding,
    href: '/companyInfo',
  },
  {
    id: uniqueId(),
    title: 'Team',
    icon: IconUsersGroup,
    href: '/team',
  },
];

export default Menuitems;
