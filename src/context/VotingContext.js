import React, { createContext, useState, useContext } from 'react';

const VotingContext = createContext();

export const VotingProvider = ({ children }) => {
  const [sessions, setSessions] = useState([
    {
      id: '1',
      title: 'Best Programming Language',
      createdAt: 'March 15, 2024',
      showResults: true,
      resultsRevealed: false,
      options: [
        { id: 1, text: "Python", votes: 0 },
        { id: 2, text: "JavaScript", votes: 0 },
        { id: 3, text: "Java", votes: 0 },
      ],
    },
  ]);

  // Track which sessions the user has voted in
  const [votedSessions, setVotedSessions] = useState([]);

  const addSession = (newSession) => {
    const sessionWithId = {
      ...newSession,
      id: Date.now().toString(),
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      options: newSession.options.map((option, index) => ({
        id: index + 1,
        text: option,
        votes: 0
      }))
    };
    setSessions(prevSessions => [sessionWithId, ...prevSessions]);
    return sessionWithId;
  };

  const addVote = (sessionId, optionId) => {
    setSessions(prevSessions =>
      prevSessions.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            options: session.options.map(option => {
              if (option.id === optionId) {
                return { ...option, votes: option.votes + 1 };
              }
              return option;
            })
          };
        }
        return session;
      })
    );
    // Add sessionId to votedSessions
    setVotedSessions(prev => [...prev, sessionId]);
  };

  const hasVoted = (sessionId) => {
    return votedSessions.includes(sessionId);
  };

  const getSession = (sessionId) => {
    return sessions.find(session => session.id === sessionId);
  };

  const revealResults = (sessionId) => {
    setSessions(prevSessions =>
      prevSessions.map(session => {
        if (session.id === sessionId) {
          return {
            ...session,
            resultsRevealed: true
          };
        }
        return session;
      })
    );
  };

  const isResultRevealed = (sessionId) => {
    const session = sessions.find(s => s.id === sessionId);
    return session?.resultsRevealed || false;
  };

  return (
    <VotingContext.Provider value={{ 
      sessions, 
      addSession, 
      addVote,
      getSession,
      hasVoted,
      revealResults,
      isResultRevealed
    }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVoting = () => useContext(VotingContext); 