// Input validation utilities
export const validateMatchData = (match) => {
  if (!match) throw new Error('Match data is required');
  
  // Validate team names
  if (!match.team1 || typeof match.team1 !== 'string') {
    throw new Error('Invalid team1 name');
  }
  if (!match.team2 || typeof match.team2 !== 'string') {
    throw new Error('Invalid team2 name');
  }
  
  // Validate venue
  if (!match.venue || typeof match.venue !== 'string') {
    throw new Error('Invalid venue');
  }
  
  // Validate date format (DD-MM-YYYY)
  const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
  if (!match.date || !dateRegex.test(match.date)) {
    throw new Error('Invalid date format. Expected DD-MM-YYYY');
  }
  
  // Validate time format (HH:MM)
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!match.time || !timeRegex.test(match.time)) {
    throw new Error('Invalid time format. Expected HH:MM');
  }
  
  return true;
};

export const sanitizeMatchData = (match) => {
  return {
    team1: String(match.team1).trim().slice(0, 100),
    team2: String(match.team2).trim().slice(0, 100),
    venue: String(match.venue).trim().slice(0, 100),
    date: String(match.date).trim(),
    time: String(match.time).trim()
  };
};