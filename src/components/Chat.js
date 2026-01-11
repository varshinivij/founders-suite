import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  IconButton,
  Box,
  Paper,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { GoogleGenAI } from '@google/genai';
import { Prompts } from './prompts';
import { responseSchema } from './responseSchema';
import { personalities } from './personalities';
function Chat({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState('');
  const [personalityLocked, setPersonalityLocked] = useState(false);
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Initialize Gemini
  useEffect(() => {
    const ai = new GoogleGenAI({ apiKey: process.env.REACT_APP_GEMINI_API_KEY });
    chatRef.current = ai.chats.create({
      model: "gemini-2.5-flash",
      //model: "gemma-3-27b-it",
      config: {
        systemInstruction: Prompts[0],
        responseMimeType: 'application/json',
        responseSchema: responseSchema
      }
    });
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() && chatRef.current) {
      const userMessage = inputValue.trim();
      setMessages(prev => [...prev, { text: { assistantMessage: userMessage }, sender: 'user' }]);
      setInputValue('');
      setIsLoading(true);
      
      // Lock personality after first message
      if (!personalityLocked) {
        setPersonalityLocked(true);
      }

      try {
        const mesSend = messages[messages.length-1];
        const selectedPersonalityObj = personalities.find(p => p.person === selectedPersonality);
        let toSend;
        if (!mesSend) {
          toSend = { message: userMessage+"\n\nCurrent Playbook State:\n"+JSON.stringify(selectedPersonalityObj, null, 2) };
        } else {
          toSend = { message: userMessage+"\n\nCurrent Playbook State:\n"+JSON.stringify(mesSend)};
        }
        const response = await chatRef.current.sendMessage(toSend);
        const text = JSON.parse(response.text);
        console.log(text.bluePrintState);
        setMessages(prev => [...prev, { text: text, sender: 'model' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages(prev => [...prev, { 
          text: { assistantMessage: 'Sorry, I encountered an error. Please try again.' }, 
          sender: 'model' 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  const handlePersonalityChange = (e) => {
    if (!personalityLocked) {
      setSelectedPersonality(e.target.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
    setPersonalityLocked(false);
    setSelectedPersonality('');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      hideBackdrop
      PaperProps={{
        sx: {
          position: 'fixed',
          bottom: 80,
          right: 16,
          m: 0,
          maxHeight: '700px',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Chat
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={clearChat} size="small" title="Clear chat">
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', flexDirection: 'column', p: 0 }}>
        {/* Messages Area */}
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            overflowY: 'auto',
            minHeight: '450px',
            maxHeight: '450px',
          }}
        >
          {messages.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center">
              Start a conversation...
            </Typography>
          ) : (
            messages.map((message, index) => (
              <Paper
                key={index}
                sx={{
                  p: 1.5,
                  mb: 1,
                  maxWidth: '80%',
                  ml: message.sender === 'user' ? 'auto' : 0,
                  mr: message.sender === 'user' ? 0 : 'auto',
                  bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.200',
                  color: message.sender === 'user' ? 'white' : 'text.primary',
                }}
              >
                <Typography variant="body2">{message.text.assistantMessage}</Typography>
              </Paper>
            ))
          )}
          {isLoading && (
            <Paper
              sx={{
                p: 1.5,
                mb: 1,
                maxWidth: '80%',
                bgcolor: 'grey.200',
                color: 'text.secondary',
              }}
            >
              <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                Model is typing...
              </Typography>
            </Paper>
          )}
          <div ref={messagesEndRef} />
        </Box>
        
        {/* Input Area */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <FormControl size="small" sx={{ minWidth: 140 }} disabled={personalityLocked}>
              <InputLabel>Personality</InputLabel>
              <Select
                value={selectedPersonality}
                label="Personality"
                onChange={handlePersonalityChange}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {personalities.map(p => (
                  <MenuItem key={p.person} value={p.person}>
                    {p.person}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {personalityLocked && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="caption" color="text.secondary">
                  ✓ {selectedPersonality}
                </Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder={selectedPersonality ? "Type a message..." : "Select a personality first..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              variant="outlined"
              disabled={isLoading || !selectedPersonality}
            />
            <IconButton color="primary" onClick={handleSendMessage} disabled={isLoading || !selectedPersonality}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}


export default Chat;
