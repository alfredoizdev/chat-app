import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Chat from "@/pages/Chat";
import Navbar from "@/components/shared/Navbar";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Auth from "@/Guard/Auth";
import Logout from "./Guard/Logout";

function App() {

  return (

    <Box sx={{
      bgcolor: 'background.default',
      minHeight: '100vh',
      maxWidth: '900px',
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      alignItems: 'center',
      padding: '20px',
    }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Auth><Chat /></Auth>} />
              <Route path="/login" element={<Logout><Login /></Logout>} />
              <Route path="/register" element={<Logout><Register /></Logout>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </Box>

  );
}

export default App;