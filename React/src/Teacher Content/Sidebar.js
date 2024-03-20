import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const Sidebarr = () => {return(
<Sidebar>
  <Menu>
    <SubMenu label="Java">
      <MenuItem> Pie charts </MenuItem>
      <MenuItem> Line charts </MenuItem>
    </SubMenu>
    <MenuItem> OOPS Concept </MenuItem>
    <MenuItem> IO Stream </MenuItem>
    <MenuItem> JDBC </MenuItem>
    <MenuItem> Exception Handling </MenuItem>
    <MenuItem> Streams </MenuItem>
    <MenuItem> Reflection </MenuItem>
    <MenuItem> Collections </MenuItem>
    <MenuItem> Lambda Expressions </MenuItem>
    <MenuItem> Enums </MenuItem>
    <MenuItem> + Add Content </MenuItem>
  </Menu>
</Sidebar>
); 

}

export default Sidebarr;

