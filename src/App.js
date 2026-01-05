import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Fab,
  Box,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import Chat from './components/Chat';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  const handleChatToggle = () => {
    setChatOpen(!chatOpen);
  };

  return (
    <div className="App">
      {/* Title Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Interactive Playbook
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content Area */}
      <Box sx={{ p: 3 }}>
        <Typography variant="body1">
          Welcome to Interactive Playbook
        </Typography>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
        onClick={handleChatToggle}
      >
        <ChatIcon />
      </Fab>

      {/* Chat Component */}
      <Chat open={chatOpen} onClose={handleChatToggle} />
    </div>
  );
}

export default App;
