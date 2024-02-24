import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { Typography } from '@mui/material';
import useAuthContext from '@/hooks/useAuthContext';
import MenuIcon from '@mui/icons-material/Menu';

const User = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  backgroundColor: theme.palette.primary.main,
  padding: '5px 9px',
  borderRadius: '25px',
  color: '#333333',
  '& img': {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
  },
}));

const MenuContainer = styled('nav')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const NavbarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& h2': {
    margin: 0,
  },

});

const Menu = styled('ul')({
  display: 'flex',
  listStyle: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '20px',
  '& li': {
    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      textTransform: 'uppercase',
    },
  },
  '@media (max-width: 570px)': {
    display: 'none',
  },
});

const BurgerMenu = styled('div')(({ theme }) => ({
  display: 'none',
  cursor: 'pointer',
  borderRadius: '50%',
  padding: '5px',
  backgroundColor: theme.palette.primary.main,
  color: '#333333',
  width: '30px',
  height: '30px',
  '@media (max-width: 570px)': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));


const Navbar = () => {

  const { user, logOut } = useAuthContext();

  return (
    <NavbarContainer>
      <h2>Chat App</h2>
      {user && <User><Typography variant="body2">Welcome {user.name}</Typography></User>}
      <MenuContainer>
        <Menu>
          {user && <>
            <li>
              <Link to="/">
                <Typography variant="body2">Chat</Typography>
              </Link>
            </li>
            <li>
              <Link onClick={logOut} to="/login">
                <Typography variant="body2">Logout</Typography>
              </Link>
            </li>
          </>}
          {!user && <>
            <li>
              <Link to="/login">
                <Typography variant="body2">Login</Typography>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <Typography variant="body2">Register</Typography>
              </Link>
            </li>
          </>}
        </Menu>
        <BurgerMenu>
          <MenuIcon />
        </BurgerMenu>
      </MenuContainer>
    </NavbarContainer>
  );
};

export default Navbar;