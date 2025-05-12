import { useLocation, NavLink, Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import {
  Logo,
  Sidebar as MUI_Sidebar,
  Menu,
  MenuItem,
  Submenu,
} from 'react-mui-sidebar';
import { IconPoint } from '@tabler/icons-react';
import Menuitems from './MenuItems';
import logoicn from '../../../assets/images/logos/dark1-logo.svg';
import Upgrade from './Upgrade';

const renderMenuItems = (items, pathDirect) => {
  return items.map((item) => {
    const Icon = item.icon ? item.icon : IconPoint;
    const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

    if (item.subheader) {
      // Display Subheader
      return (
        <Box sx={{ margin: '0 -24px', textTransform: 'uppercase' }} key={item.subheader}>
          <Menu subHeading={item.subheader} key={item.subheader} />
        </Box>
      );
    }

    // If the item has children (submenu)
    if (item.children) {
      return (
        <Submenu
          key={item.id}
          title={item.title}
          icon={itemIcon}
          borderRadius="7px"
        >
          {renderMenuItems(item.children, pathDirect)}
        </Submenu>
      );
    }

    // Common MenuItem props
    const menuItemProps = {
      isSelected: pathDirect === item.href,
      borderRadius: '7px',
      icon: item.icon ? (
        <Icon icon={`solar:${item.icon}`} width="20" height="20" />
      ) : (
        <Icon icon="mdi:circle" width="6" height="6" />
      ),
      badge: item.chip ? true : false,
      badgeContent: item.chip || '',
      badgeColor: 'secondary',
      badgeTextColor: '#1b84ff',
      disabled: item.disabled,
    };

    // If the item has no children, render a MenuItem
    if (item.href && item.href.startsWith('https')) {
      // External link: Use <a> tag
      return (
        <a
          key={item.id}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem {...menuItemProps}>
            <Typography
              component="span"
              color={pathDirect === item.href ? '#fff' : 'inherit'}
            >
              {item.title}
            </Typography>
          </MenuItem>
        </a>
      );
    } else if (item.href) {
      // Internal link: Use Link
      return (
        <Link
          key={item.id}
          to={item.href}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <MenuItem {...menuItemProps}>
            <Typography
              component="span"
              color={pathDirect === item.href ? '#fff' : 'inherit'}
            >
              {item.title}
            </Typography>
          </MenuItem>
        </Link>
      );
    } else {
      // No link: Render MenuItem directly
      return (
        <MenuItem key={item.id} {...menuItemProps}>
          <Typography
            component="span"
            color={pathDirect === item.href ? '#fff' : 'inherit'}
          >
            {item.title}
          </Typography>
        </MenuItem>
      );
    }
  });
};

const SidebarItems = () => {
  const location = useLocation();
  const pathDirect = location.pathname;

  return (
    <Box sx={{ px: '24px', overflowX: 'hidden' }}>
      <MUI_Sidebar width="100%" showProfile={false} themeColor="#5D87FF" themeSecondaryColor="#49BEFF1a">
        <Box sx={{ margin: '0 -24px' }}>
          <Logo img={logoicn} component={NavLink} to="/">
            Flexy
          </Logo>
        </Box>
        {renderMenuItems(Menuitems, pathDirect)}
      </MUI_Sidebar>
      <Upgrade />
    </Box>
  );
};

export default SidebarItems;