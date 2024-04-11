import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom"; // Import useLocation hook
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Item = ({ title, to, icon }) => {
  // Removed selected and setSelected props
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Get the current location
  const location = useLocation();

  return (
    <MenuItem
      active={location.pathname === to} // Check if the current pathname matches the item's 'to' prop
      style={{
        color: colors.grey[100],
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useSelector((state) => state.GlobalVariable);
  const [userInfo, setUser] = useState("");

  useEffect(() => {
    if (typeof user === "string") {
      setUser(user);
    } else {
      if (user) {
        setUser(user);
      }
    }
  }, [user]);

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
          height: "100%",
          position: "fixed",
          width: "inherit",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  AYATT ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={`../../assets/user_avatar.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  textTransform="capitalize"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {userInfo?.email
                    ? userInfo.email.substring(0, userInfo.email.indexOf("@"))
                    : ""}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  {userInfo?.userType ? userInfo.userType : "Administrator"}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item title="Dashboard" to="/" icon={<HomeOutlinedIcon />} />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item title="Owner" to="/team" icon={<PeopleOutlinedIcon />} />
            <Item
              title="Project"
              to="/project"
              icon={<WorkOutlineOutlinedIcon />}
            />
            <Item
              title="Property"
              to="/contacts"
              icon={<ContactsOutlinedIcon />}
            />

            <Item title="Booking" to="/form" icon={<PersonOutlinedIcon />} />
            <Item
              title="Image"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
            />
            <Item
              title="Availability"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
            />
            <Item
              title="Property Price"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
            />
            <Item
              title="Payment"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
            />

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item title="Bar Chart" to="/bar" icon={<BarChartOutlinedIcon />} />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
