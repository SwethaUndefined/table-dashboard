import React from "react";
import { AppBar, Toolbar, InputBase, IconButton, Box } from "@mui/material";
import { Search, WbSunny, CloudUpload, Message, Notifications, Settings } from "@mui/icons-material";
import styled from "@emotion/styled";
import companyLogo from "../assests/companyLogo.svg";
import profile from "../assests/profile.jpg";

const HeaderContainer = styled(AppBar)`
  background-color: #ffffff;
  height: 65px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  z-index: 1300;
`;

const Logo = styled.img`
  height: 30px;
`;

const SearchBox = styled(Box)`
  margin-left: 100px;
  margin-right: 16px;
  width: 400px;
`;

const Input = styled(InputBase)`
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  margin-top: 6px;
  width: 100%;
  padding: 8px;
`;

const HeaderIcons = styled(Box)`
  cursor: pointer;
`;

const HeaderIcon = styled(IconButton)`
  font-size: 20px;
  color: #8e8e8e;
  margin-right: 40px;
`;

const ProfileImage = styled.img`
  height: 30px;
  border-radius: 50%;
`;

const SearchIcon = styled(Search)`
  color: #717577;
`;

const Header = () => {
  return (
    <HeaderContainer position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" flexGrow={1}>
          <Logo src={companyLogo} alt="Company Logo" />
          <SearchBox>
            <Input
              placeholder="Search"
              startAdornment={<SearchIcon />}
            />
          </SearchBox>
        </Box>
        <HeaderIcons display="flex" alignItems="center">
          <HeaderIcon>
            <WbSunny />
          </HeaderIcon>
          <HeaderIcon>
            <CloudUpload />
          </HeaderIcon>
          <HeaderIcon>
            <Message />
          </HeaderIcon>
          <HeaderIcon>
            <Notifications />
          </HeaderIcon>
          <HeaderIcon>
            <Settings />
          </HeaderIcon>
          <ProfileImage src={profile} alt="Profile" />
        </HeaderIcons>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;
