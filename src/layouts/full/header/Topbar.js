import React, { useState } from 'react';
import { Box, AppBar, Toolbar, styled, Stack, Button, IconButton, Badge, Menu, MenuItem } from '@mui/material';
import adminmartLogo from '../../../assets/images/logos/logo-adminmart.svg';
import { IconLifebuoy, IconGift, IconBriefcase, IconBellRinging } from '@tabler/icons-react';
import { Typography} from '@mui/material';
import { Link } from 'react-router';
import LivePreviewDropdown from './LivePreviewDropdown';
import BuyNowDropdown from './BuyNowDropdown';
import Profile from './Profile';
import { Logo } from 'react-mui-sidebar';
import { NavLink } from 'react-router';
import logoicn from "../../../assets/images/logos/dark1-logo.svg";

const Topbar = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
  
    const [menuPosition, setMenuPosition] = useState(null);
  
    const handleClick = (event) => {
      const rect = event.currentTarget.getBoundingClientRect(); // Get exact position
      setMenuPosition({
        top: rect.bottom + window.scrollY, // Position menu below the icon
        left: rect.left + window.scrollX,  // Align with icon
      });
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.grey[600],
    zIndex:"50",
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
      minHeight: '61px',
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled sx={{flexWrap:"wrap"}} >
              <Stack
                  spacing={{ xs: 1, sm: 8 }}
                  direction="row"
                  useFlexGap
                  sx={{ flexWrap: 'wrap', justifyContent:{xs:"center", lg:"between"}, paddingY:{xs:"8px" , lg:"0px"} , width:{xs:"100%" , lg:"auto"} }}
              >
                 <Box sx={{ margin: "0 -24px" }}>
                   <Logo img={logoicn} component={NavLink} to="/" >Flexy</Logo>
                 </Box>
               <Stack spacing={1} direction="row" sx={{flexWrap:'wrap' , display : {xs:"none",lg:"flex"} }} >
                   <Box>
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            aria-controls="notification-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <Badge variant="dot" color="primary">
              <IconBellRinging size="21" stroke="1.5" />
            </Badge>
          </IconButton>

          <Menu
            id="notification-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorReference="anchorPosition" // Use custom positioning
            anchorPosition={menuPosition ? { top: menuPosition.top, left: menuPosition.left } : undefined}
            PaperProps={{
              sx: {
                mt: 1, // Ensures the menu appears slightly below the bell icon
                boxShadow: 9, // Optional: Improves visibility with a shadow
                minWidth: '200px', // Adjust width to ensure proper alignment
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <Typography variant="body1">Item 1</Typography>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography variant="body1">Item 2</Typography>
            </MenuItem>
          </Menu>

        </Box>
               </Stack>
                
              </Stack>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center" sx={{ flexWrap: 'wrap', justifyContent:"center" , gap:{xs:"10px" , lg:"0px"} , padding:{xs:"0px 0px 10px 0px" , lg:"0px 0px"} }}>
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};


export default Topbar;
