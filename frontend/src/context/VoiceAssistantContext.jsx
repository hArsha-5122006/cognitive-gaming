import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const VoiceContext = createContext();

export const useVoice = () => useContext(VoiceContext);

export const VoiceProvider = ({ children }) => {
  const [status, setStatus] = useState('idle');
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);
  const commandTimeoutRef = useRef(null);
  const commandRecognitionRef = useRef(null);
  let onCommand = null;

  const speak = (text, callback) => {
    if (!synthRef.current) { if (callback) callback(); return; }
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => {
      setStatus('listening');
      if (callback) callback();
    };
    utterance.onerror = () => {
      setStatus('listening');
      if (callback) callback();
    };
    setStatus('speaking');
    synthRef.current.speak(utterance);
  };

  const startCommandListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (commandRecognitionRef.current) {
      commandRecognitionRef.current.abort();
      commandRecognitionRef.current = null;
    }
    const cmdRec = new SpeechRecognition();
    cmdRec.continuous = false;
    cmdRec.interimResults = false;
    cmdRec.lang = 'en-US';
    commandRecognitionRef.current = cmdRec;
    let isCommandProcessed = false;
    cmdRec.onstart = () => {
      setStatus('listening');
      commandTimeoutRef.current = setTimeout(() => {
        if (!isCommandProcessed) {
          cmdRec.abort();
          setStatus('idle');
          if (recognitionRef.current) {
            recognitionRef.current.stopPending = false;
            recognitionRef.current.start();
          }
        }
      }, 15000);
    };
    cmdRec.onresult = (e) => {
      isCommandProcessed = true;
      clearTimeout(commandTimeoutRef.current);
      const cmd = e.results[0][0].transcript.toLowerCase().trim();
      if (onCommand) onCommand(cmd);
    };
    cmdRec.onend = () => {
      clearTimeout(commandTimeoutRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.stopPending = false;
        recognitionRef.current.start();
      }
    };
    cmdRec.onerror = () => {
      clearTimeout(commandTimeoutRef.current);
      if (recognitionRef.current) {
        recognitionRef.current.stopPending = false;
        recognitionRef.current.start();
      }
    };
    cmdRec.start();
  };

  const setCommandHandler = (handler) => { onCommand = handler; };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech recognition not supported');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    recognition.onstart = () => setStatus('listening');
    recognition.onend = () => {
      setStatus('idle');
      if (!recognition.stopPending) {
        setTimeout(() => {
          if (recognitionRef.current) recognitionRef.current.start();
        }, 150);
      }
    };
    recognition.onerror = (event) => {
      console.warn('Speech error:', event.error);
      if (event.error === 'not-allowed') alert('Please allow microphone access.');
      setStatus('idle');
      setTimeout(() => {
        if (recognitionRef.current) recognitionRef.current.start();
      }, 500);
    };
    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript.toLowerCase().trim();
      if (transcript.includes('lara')) {
        recognition.stopPending = true;
        recognition.stop();
        setStatus('speaking');
        speak('Yes, how can I help?', () => {
          startCommandListening();
        });
      }
    };
    recognition.start();
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
    };
  }, []);

  return (
    <VoiceContext.Provider value={{ status, setCommandHandler, speak }}>
      {children}
    </VoiceContext.Provider>
  );
};
