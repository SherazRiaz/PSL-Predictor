import React, { useState } from "react";
import Modal from 'react-modal';
import Countdown from 'react-countdown';
import { validateMatchData, sanitizeMatchData } from './utils/validation';
import { matchesData } from './data/matchesData';

const teamInfo = {
  "Lahore Qalandars": {
    logo: "https://psl-t20.com/wp-content/uploads/2016/01/psl-lahore-qalandars.png",
    captain: "Shaheen Afridi",
    team: [
      "Shaheen Afridi (C)",
      "Fakhar Zaman",
      "Sahibzada Farhan",
      "Abdullah Shafique",
      "Sikandar Raza",
      "Ahsan Hafeez",
      "David Wiese",
      "Jahandad Khan",
      "Kamran Ghulam",
      "Mirza Tahir Baig",
      "Mohammad Imran",
      "Rassie van der Dussen",
      "Shai Hope",
      "Zaman Khan"
    ]
  },
  "Multan Sultans": {
    logo: "https://psl-t20.com/wp-content/uploads/2019/01/psl-multan-sultan.png",
    captain: "Mohammad Rizwan",
    team: [
      "Mohammad Rizwan (C)",
      "Iftikhar Ahmed",
      "David Willey",
      "Khushdil Shah",
      "Usama Mir",
      "Abbas Afridi",
      "Reeza Hendricks",
      "Rehan Ahmed",
      "Mohammad Ali",
      "Dawid Malan",
      "Chris Jordan",
      "Olly Stone",
      "Usman Khan",
      "Faisal Akram"
    ]
  },
  "Peshawar Zalmi": {
    logo: "https://psl-t20.com/wp-content/uploads/2016/01/psl-peshawar-zalmi.png",
    captain: "Babar Azam",
    team: [
      "Babar Azam (C)",
      "Saim Ayub",
      "Tom Kohler-Cadmore",
      "Rovman Powell",
      "Asif Ali",
      "Aamer Jamal",
      "Naveen-ul-Haq",
      "Umair Afridi",
      "Dan Mousley",
      "Mohammad Haris",
      "Salman Irshad",
      "Arif Yaqoob",
      "Sufiyan Muqeem",
      "Luke Wood"
    ]
  },
  "Islamabad United": {
    logo: "https://psl-t20.com/wp-content/uploads/2016/01/psl-islamabad-united.png",
    captain: "Shadab Khan",
    team: [
      "Shadab Khan (C)",
      "Jordan Cox",
      "Colin Munro",
      "Alex Hales",
      "Azam Khan",
      "Faheem Ashraf",
      "Imad Wasim",
      "Naseem Shah",
      "Rumman Raees",
      "Tymal Mills",
      "Matthew Forde",
      "Hunain Shah",
      "Shahab Khan",
      "Ubaid Shah"
    ]
  },
  "Quetta Gladiators": {
    logo: "https://psl-t20.com/wp-content/uploads/2017/02/psl-quetta-gladiators.png",
    captain: "Rilee Rossouw",
    team: [
      "Rilee Rossouw (C)",
      "Jason Roy",
      "Sarfaraz Ahmed",
      "Mohammad Wasim Jr",
      "Mohammad Amir",
      "Will Smeed",
      "Abrar Ahmed",
      "Mohammad Hasnain",
      "Saud Shakeel",
      "Sajjad Ali",
      "Usman Qadir",
      "Omair Bin Yousuf",
      "Khawaja Nafay",
      "Akeal Hosein"
    ]
  },
  "Karachi Kings": {
    logo: "https://psl-t20.com/wp-content/uploads/2017/02/psl-karachi-kings.png",
    captain: "Shan Masood",
    team: [
      "Shan Masood (C)",
      "James Vince",
      "Mohammad Nawaz",
      "Shoaib Malik",
      "Daniel Sams",
      "Tim Seifert",
      "Mohammad Amir Khan",
      "Anwar Ali",
      "Arafat Minhas",
      "Mir Hamza",
      "Muhammad Akhlaq",
      "Mohammad Rohid",
      "Sirajuddin",
      "Zahid Mahmood"
    ]
  }
};

const teamData = {
  "teams": [
    {
    "position": 1,
    "name": "Quetta Gladiators",
    "abbreviation": "QG",
    "matches": 9,
    "wins": 6,
    "losses": 2,
    "nrr": "+1.530",
    "points": 13,
    "last_5": ["W", "W", "D", "W", "W"]
  },
  {
    "position": 2,
    "name": "Karachi Kings",
    "abbreviation": "KAR",
    "matches": 8,
    "wins": 5,
    "losses": 3,
    "nrr": "+0.433",
    "points": 10,
    "last_5": ["L", "W", "L", "W", "W"]
  },
  {
    "position": 3,
    "name": "Islamabad United",
    "abbreviation": "ISL",
    "matches": 9,
    "wins": 5,
    "losses": 4,
    "nrr": "-0.044",
    "points": 10,
    "last_5": ["W", "L", "L", "L", "L"]
  },
  {
    "position": 4,
    "name": "Lahore Qalandars",
    "abbreviation": "LAH",
    "matches": 9,
    "wins": 4,
    "losses": 4,
    "nrr": "+0.958",
    "points": 9,
    "last_5": ["L", "W", "W", "D", "L"]
  },
  {
    "position": 5,
    "name": "Peshawar Zalmi",
    "abbreviation": "PES",
    "matches": 8,
    "wins": 4,
    "losses": 4,
    "nrr": "-0.082",
    "points": 8,
    "last_5": ["L", "W", "L", "W", "W"]
  },
  {
    "position": 6,
    "name": "Multan Sultans",
    "abbreviation": "MS",
    "matches": 9,
    "wins": 1,
    "losses": 8,
    "nrr": "-2.708",
    "points": 2,
    "last_5": ["L", "L", "L", "L", "L"]
  }
  ]
};

const venueCoordinates = {
  "Multan Cricket Stadium": { lat: 30.1575, long: 71.5249 },
  "Gaddafi Stadium": { lat: 31.5204, long: 74.3587 },
  "National Stadium Karachi": { lat: 24.8936, long: 67.0305 },
  "Rawalpindi Cricket Stadium": { lat: 33.6007, long: 73.0679 }
};

const MatchCard = ({ match, teamInfo }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const [day, month, year] = match.date.split('-');
  const [hours, minutes] = match.time.split(':');
  const matchDateTime = new Date(year, month - 1, day, hours, minutes);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    const matchStartTime = matchDateTime.getTime();
    const now = Date.now();
    const matchEndTime = matchStartTime + 4 * 60 * 60 * 1000;

    if (now >= matchEndTime) {
      return <span style={styles.countdown}>Match completed!</span>;
    } else if (completed) {
      return <span style={styles.countdown}>Match in progress!</span>;
    } else {
      return (
        <span style={styles.countdown}>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  const isMatchCompleted = () => {
    const matchStartTime = matchDateTime.getTime();
    const now = Date.now();
    const matchEndTime = matchStartTime + 4 * 60 * 60 * 1000;
    return now >= matchEndTime;
  };

  const getTeamForm = (teamName) => {
    const team = teamData.teams.find(t => t.name === teamName);
    return team ? team.last_5 : ["-", "-", "-", "-", "-"];
  };

  const handlePredict = async () => {
    setModalIsOpen(true);
    setLoading(true);
    setError(null);

    try {
      validateMatchData(match);
      const sanitizedMatch = sanitizeMatchData(match);

      const coordinates = venueCoordinates[sanitizedMatch.venue];
      if (!coordinates) {
        throw new Error('Invalid venue coordinates');
      }

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&current=temperature_2m,wind_speed_10m`
      );

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const weatherData = await weatherResponse.json();

      const currentTeamData = teamData.teams.find(t => t.name === sanitizedMatch.team1);
      const opposingTeamData = teamData.teams.find(t => t.name === sanitizedMatch.team2);

      const matchDataForPrediction = {
        team1: sanitizedMatch.team1,
        team2: sanitizedMatch.team2,
        venue: sanitizedMatch.venue,
        weather: {
          temperature: weatherData.current.temperature_2m,
          windSpeed: weatherData.current.wind_speed_10m
        },
        team1Stats: {
          form: getTeamForm(sanitizedMatch.team1),
          position: currentTeamData?.position,
          nrr: currentTeamData?.nrr,
          points: currentTeamData?.points
        },
        team2Stats: {
          form: getTeamForm(sanitizedMatch.team2),
          position: opposingTeamData?.position,
          nrr: opposingTeamData?.nrr,
          points: opposingTeamData?.points
        },
        matches: matchesData[2].matches || [],
        teamInfo: {
          [sanitizedMatch.team1]: teamInfo[sanitizedMatch.team1],
          [sanitizedMatch.team2]: teamInfo[sanitizedMatch.team2]
        }
      };

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matchData: matchDataForPrediction })
      });

      if (!response.ok) {
        throw new Error(`Prediction API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data.choices?.[0]?.message?.content) {
        throw new Error('Invalid API response structure');
      }

      let predictionResult;
      try {
        const content = data.choices[0].message.content;
        const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
        predictionResult = JSON.parse(cleanedContent);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        throw new Error('Failed to parse prediction data');
      }

      if (!predictionResult.keyPlayers || !predictionResult.winProbability || 
          !predictionResult.headToHead || !predictionResult.venuePerformance) {
        throw new Error('Invalid prediction data structure');
      }

      setResult({
        ...predictionResult,
        recentForm: {
          [match.team1]: getTeamForm(match.team1),
          [match.team2]: getTeamForm(match.team2)
        }
      });
    } catch (error) {
      console.error("Prediction failed:", error);
      setError(error.message || "Failed to fetch prediction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.cardContent}>
        <div style={styles.teamSection}>
          <img src={teamInfo[match.team1].logo} alt={match.team1} style={styles.logo} />
          <h3 style={styles.teamName}>{match.team1}</h3>
        </div>
        
        <div style={styles.matchInfo}>
          <div style={styles.score}>
            <span>VS</span>
          </div>
          <div style={styles.matchDetails}>
            <div style={styles.date}>{match.date}</div>
            <div style={styles.time}>{match.time}</div>
            <div style={styles.venue}>{match.venue}</div>
            <Countdown 
              date={matchDateTime}
              renderer={countdownRenderer}
            />
          </div>
        </div>

        <div style={styles.teamSection}>
          <img src={teamInfo[match.team2].logo} alt={match.team2} style={styles.logo} />
          <h3 style={styles.teamName}>{match.team2}</h3>
        </div>
      </div>

      {!isMatchCompleted() && (
        <button 
          style={styles.predictButton} 
          onClick={handlePredict} 
          disabled={loading}
        >
          {loading ? "PREDICTING..." : "PREDICTION"}
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={styles.modalStyles}
      >
        {error ? (
          <div style={styles.error}>
            <p>{error}</p>
            <button style={styles.retryButton} onClick={handlePredict}>
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div style={styles.loading}>
            <p>Analyzing match data...</p>
          </div>
        ) : result && (
          <div style={styles.resultContainer}>
            <button style={styles.closeButton} onClick={() => setModalIsOpen(false)}>×</button>
            
            <div style={styles.countdownSection}>
              <h4>Time until match:</h4>
              <Countdown date={matchDateTime} renderer={countdownRenderer} />
            </div>

            <div style={styles.modalHeader}>
              <div style={styles.teamSection}>
                <img src={teamInfo[match.team1].logo} alt={match.team1} style={styles.modalLogo} />
                <h3>{match.team1}</h3>
                <p style={styles.captain}>Captain: {teamInfo[match.team1].captain}</p>
              </div>
              <div style={styles.vs}>VS</div>
              <div style={styles.teamSection}>
                <img src={teamInfo[match.team2].logo} alt={match.team2} style={styles.modalLogo} />
                <h3>{match.team2}</h3>
                <p style={styles.captain}>Captain: {teamInfo[match.team2].captain}</p>
              </div>
            </div>

            <div style={styles.predictionSection}>
              <h4>Win Probability</h4>
              <div style={styles.probabilityBar}>
                <div 
                  style={{
                    ...styles.probabilityFill,
                    width: `${result.winProbability[match.team1]}%`
                  }}
                >
                  {match.team1}: {result.winProbability[match.team1]}%
                </div>
                <div 
                  style={{
                    ...styles.probabilityFillSecond,
                    width: `${result.winProbability[match.team2]}%`
                  }}
                >
                  {match.team2}: {result.winProbability[match.team2]}%
                </div>
              </div>
            </div>

            <div style={styles.predictionSection}>
              <h4>Key Players</h4>
              <div style={styles.keyPlayers}>
                <div>
                  <strong>{match.team1}:</strong> {result.keyPlayers[match.team1]}
                </div>
                <div>
                  <strong>{match.team2}:</strong> {result.keyPlayers[match.team2]}
                </div>
              </div>
            </div>

            <div style={styles.predictionSection}>
              <h4>Recent Form</h4>
              <div style={styles.formContainer}>
                <div>
                  <strong>{match.team1}:</strong>
                  <div style={styles.formBadges}>
                    {result.recentForm[match.team1].map((result, index) => (
                      <span 
                        key={index} 
                        style={{
                          ...styles.formBadge,
                          backgroundColor: result === 'W' ? '#4CAF50' : 
                                         result === 'L' ? '#f44336' : '#9e9e9e'
                        }}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <strong>{match.team2}:</strong>
                  <div style={styles.formBadges}>
                    {result.recentForm[match.team2].map((result, index) => (
                      <span 
                        key={index} 
                        style={{
                          ...styles.formBadge,
                          backgroundColor: result === 'W' ? '#4CAF50' : 
                                         result === 'L' ? '#f44336' : '#9e9e9e'
                        }}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.predictionSection}>
              <h4>Head to Head</h4>
              <p>{result.headToHead.rate}</p>
              <p>Last Match: {result.headToHead.lastMatch}</p>
            </div>

            <div style={styles.predictionSection}>
              <h4>Venue Performance</h4>
              <div>
                <div>
                  <strong>{match.team1}:</strong> {result.venuePerformance[match.team1]}%
                </div>
                <div>
                  <strong>{match.team2}:</strong> {result.venuePerformance[match.team2]}%
                </div>
              </div>
            </div>

            <div style={styles.predictionSection}>
              <h4>Team Players</h4>
              <div style={styles.teamsContainer}>
                <div style={styles.teamPlayers}>
                  <h5>{match.team1}</h5>
                  <div style={styles.playersList}>
                    {teamInfo[match.team1].team.map((player, index) => (
                      <div key={index} style={styles.player}>{player}</div>
                    ))}
                  </div>
                </div>
                <div style={styles.teamPlayers}>
                  <h5>{match.team2}</h5>
                  <div style={styles.playersList}>
                    {teamInfo[match.team2].team.map((player, index) => (
                      <div key={index} style={styles.player}>{player}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

const matches = [
  { team1: "Multan Sultans", team2: "Peshawar Zalmi", date: "05-05-2025", venue: "Multan Cricket Stadium" , time:"20:00"},
  { team1: "Islamabad United", team2: "Quetta Gladiators", date: "07-05-2025", venue: "Gaddafi Stadium",time:"20:00"},
  { team1: "Karachi Kings", team2: "Peshawar Zalmi", date: "08-05-2025", venue: "National Stadium Karachi" ,time:"20:00"},
  { team1: "Peshawar Zalmi", team2: "Lahore Qalandars", date: "09-05-2025", venue: "Rawalpindi Cricket Stadium" ,time:"20:00"},
  { team1: "Islamabad United", team2: "Karachi Kings", date: "10-05-2025", venue: "Gaddafi Stadium" ,time:"20:00"},
  { team1: "Multan Sultans", team2: "Quetta Gladiators", date: "11-05-2025", venue: "Multan Cricket Stadium" ,time:"20:00"}  
];

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color:"#FFD700",
    background: "rgb(156, 39, 176)",
    borderRadius: "10px",
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  teamSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    marginBottom: '10px',
  },
  teamName: {
    fontSize: '14px',
    textAlign: 'center',
    margin: '0',
  },
  matchInfo: {
    flex: 1,
    textAlign: 'center',
  },
  score: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  matchDetails: {
    fontSize: '12px',
  },
  date: {
    color: '#666',
    marginBottom: '5px',
  },
  time: {
    color: '#666',
    marginBottom: '5px',
  },
  venue: {
    color: '#666',
    fontSize: '11px',
  },
  predictButton: {
    width: "100%",
    padding: "15px",
    border: "none",
    backgroundColor: "rgb(156, 39, 176)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  modalStyles: {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '800px',
      width: '90%',
      maxHeight: '90vh',
      overflow: 'auto',
      borderRadius: '10px',
      padding: '20px',
      color: 'black'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  },
  error: {
    color: 'red',
    textAlign: 'center',
    padding: '20px',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
  },
  resultContainer: {
    position: 'relative',
    padding: '20px',
  },
  closeButton: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    border: 'none',
    background: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'black',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  modalLogo: {
    width: '80px',
    height: '80px',
    objectFit: 'contain',
  },
  vs: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  captain: {
    fontSize: '14px',
    color: '#666',
    marginTop: '5px',
  },
  stats: {
    fontSize: '12px',
    color: '#888',
    marginTop: '5px',
  },
  predictionSection: {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
  },
  probabilityBar: {
    display: 'flex',
    height: '30px',
    borderRadius: '15px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  probabilityFill: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'rgb(156, 39, 176)',
    transition: 'width 0.3s ease',
  },
  probabilityFillSecond: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'rgb(255, 215, 0)',
    transition: 'width 0.3s ease',
  },
  keyPlayers: {
    display: 'grid',
    gap: '10px',
  },
  formContainer: {
    display: 'grid',
    gap: '15px',
  },
  formBadges: {
    display: 'flex',
    gap: '5px',
    marginTop: '5px',
  },
  formBadge: {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    color: 'white',
    fontSize: '12px',
  },
  teamsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  },
  teamPlayers: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
  },
  playersList: {
    display: 'grid',
    gap: '5px',
  },
  player: {
    fontSize: '12px',
    padding: '5px',
    backgroundColor: '#f0f0f0',
    borderRadius: '3px',
  },
  countdown: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  countdownSection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
  },
};

const PredictionPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏏 PSL 2025 Match Predictor</h1>
      <div style={styles.grid}>
        {matches.map((match, idx) => (
          <MatchCard 
            key={idx} 
            match={match} 
            teamInfo={teamInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default PredictionPage;