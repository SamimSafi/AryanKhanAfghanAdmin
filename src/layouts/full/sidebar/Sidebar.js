import { useMediaQuery, Box, Drawer } from '@mui/material';
import SidebarItems from './SidebarItems';
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
import Upgrade from './Upgrade'

const Sidebar = (props) => {

  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const sidebarWidth = '270px';



  if (lgUp) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          flexShrink: 0,
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          // eslint-disable-next-line react/prop-types
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
              top: '64px',
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Scrollbar sx={{ height: "calc(100% - 73px)" }}>
            <Box>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Box>
          </Scrollbar>
        </Drawer >
      </Box >
    );
  }
  return (
    <Drawer
      anchor="left"
      // eslint-disable-next-line react/prop-types
      open={props.isMobileSidebarOpen}
      // eslint-disable-next-line react/prop-types
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {

          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >

      <Scrollbar sx={{ height: "calc(100% - 73px)" }}>
        {/* ------------------------------------------- */}
        {/* Sidebar For Mobile */}
        {/* ------------------------------------------- */}
        <SidebarItems />
      </Scrollbar>
      <Upgrade />

    </Drawer>
  );
};
export default Sidebar;
