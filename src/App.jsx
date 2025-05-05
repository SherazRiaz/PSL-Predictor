import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import Countdown from 'react-countdown';

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
      "name": "Quetta Gladiators",
      "abbreviation": "QG",
      "matches": 8,
      "wins": 5,
      "losses": 2,
      "nrr": "+0.906",
      "points": 11,
      "last_5": ["W", "W", "W", "D", "W"]
    },
    {
      "name": "Islamabad United",
      "abbreviation": "ISL",
      "matches": 8,
      "wins": 5,
      "losses": 3,
      "nrr": "+0.650",
      "points": 10,
      "last_5": ["W", "W", "L", "L", "L"]
    },
    {
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
      "name": "Peshawar Zalmi",
      "abbreviation": "PES",
      "matches": 7,
      "wins": 3,
      "losses": 4,
      "nrr": "-0.507",
      "points": 6,
      "last_5": ["W", "L", "W", "L", "W"]
    },
    {
      "name": "Multan Sultans",
      "abbreviation": "MS",
      "matches": 8,
      "wins": 1,
      "losses": 7,
      "nrr": "-2.597",
      "points": 2,
      "last_5": ["W", "L", "L", "L", "L"]
    }
  ]
};

const MatchCard = ({ match, teamInfo }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        // Generate all possible file IDs
        const fileIds = [
          ...Array.from({ length: 24 }, (_, i) => `141647${i + 7}`),  // 1416477-1416500
          ...Array.from({ length: 14 }, (_, i) => `147523${i + 8}`),  // 1475238-1475251
        ];

        // Try to load all JSON files in parallel
        const responses = await Promise.all(
          fileIds.map(id => 
            fetch(`/${id}.json`)
              .then(response => response.ok ? response.json() : null)
              .catch(() => null)
          )
        );

        // Filter out null responses and combine the data
        const validData = responses.filter(Boolean);
        
        if (validData.length === 0) {
          console.log('No match data files found');
          setMatchData({
            teams: {
              [match.team1]: {
                batting_average: 0,
                bowling_average: 0,
                powerplay_score: 0,
                death_overs_economy: 0
              },
              [match.team2]: {
                batting_average: 0,
                bowling_average: 0,
                powerplay_score: 0,
                death_overs_economy: 0
              }
            },
            conditions: {},
            head_to_head: {}
          });
          return;
        }

        // Combine all the data
        const combinedData = {
          teams: {
            [match.team1]: {
              batting_average: validData.reduce((avg, data) => 
                avg + (data.teams?.[match.team1]?.batting_average || 0), 0) / validData.length,
              bowling_average: validData.reduce((avg, data) => 
                avg + (data.teams?.[match.team1]?.bowling_average || 0), 0) / validData.length,
              powerplay_score: validData.reduce((avg, data) => 
                avg + (data.teams?.[match.team1]?.powerplay_score || 0), 0) / validData.length,
              death_overs_economy: validData.reduce((avg, data) => 
                avg + (data.teams?.[match.team1]?.death_overs_economy || 0), 0) / validData.length
            },
            [match.team2]: {
              batting_average: validData.reduce((avg, data) => 
                avg + (data.teams?.[match.team2]?.batting_average || 0), 0) / validData.length,
              bowling_average: validData.reduce((avg, data) => 
                avg + (data.teams?.[match.team2]?.bowling_average || 0), 0) / validData.length,
              powerplay_score: validData.reduce((avg, data) => 
                avg + (data.teams?.[match.team2]?.powerplay_score || 0), 0) / validData.length,
              death_overs_economy: validData.reduce((avg, data) => 
                avg + (data.teams?.[match.team2]?.death_overs_economy || 0), 0) / validData.length
            }
          },
          conditions: validData.reduce((cond, data) => ({
            ...cond,
            ...data.conditions
          }), {}),
          head_to_head: validData.reduce((h2h, data) => ({
            ...h2h,
            ...data.head_to_head
          }), {})
        };

        setMatchData(combinedData);
      } catch (err) {
        console.error('Error fetching match data:', err);
        setMatchData({
          teams: {
            [match.team1]: {
              batting_average: 0,
              bowling_average: 0,
              powerplay_score: 0,
              death_overs_economy: 0
            },
            [match.team2]: {
              batting_average: 0,
              bowling_average: 0,
              powerplay_score: 0,
              death_overs_economy: 0
            }
          },
          conditions: {},
          head_to_head: {}
        });
      }
    };
    fetchMatchData();
  }, [match.team1, match.team2]);

  const getTeamForm = (teamName) => {
    const team = teamData.teams.find(t => t.name === teamName);
    return team ? team.last_5 : ["-", "-", "-", "-", "-"];
  };

  const handlePredict = async () => {
    setModalIsOpen(true);
    setLoading(true);
    setError(null);

    const teamStats = {
      [match.team1]: {
        recentForm: getTeamForm(match.team1),
        stats: matchData ? {
          battingAvg: matchData.teams[match.team1]?.batting_average || 0,
          bowlingAvg: matchData.teams[match.team1]?.bowling_average || 0,
          powerplayScore: matchData.teams[match.team1]?.powerplay_score || 0,
          deathOversEconomy: matchData.teams[match.team1]?.death_overs_economy || 0
        } : null
      },
      [match.team2]: {
        recentForm: getTeamForm(match.team2),
        stats: matchData ? {
          battingAvg: matchData.teams[match.team2]?.batting_average || 0,
          bowlingAvg: matchData.teams[match.team2]?.bowling_average || 0,
          powerplayScore: matchData.teams[match.team2]?.powerplay_score || 0,
          deathOversEconomy: matchData.teams[match.team2]?.death_overs_economy || 0
        } : null
      }
    };

    const prompt = `Analyze the cricket match between ${match.team1} and ${match.team2} and provide a prediction in the following EXACT JSON format:
{
  "keyPlayers": {
    "${match.team1}": "Player name and reason",
    "${match.team2}": "Player name and reason"
  },
  "winProbability": {
    "${match.team1}": number,
    "${match.team2}": number
  },
  "recentForm": {
    "${match.team1}": ["W","L","W","L","W"],
    "${match.team2}": ["W","L","W","L","W"]
  },
  "headToHead": {
    "rate": "Historical win rate description",
    "lastMatch": "Result of last match"
  },
  "venuePerformance": {
    "${match.team1}": number,
    "${match.team2}": number
  }
}

Use this match data for analysis: ${JSON.stringify(teamStats)}
Venue: ${match.venue}
Consider team composition, recent performance, and head-to-head record.
IMPORTANT: Ensure the response is ONLY the JSON object with the exact structure shown above.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer `,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "PSL Predictor App"
        },
        body: JSON.stringify({
          model: "openai/gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a cricket prediction assistant that provides analysis in JSON format only. Do not include any additional text or formatting in your response. Always return data in the exact format specified in the prompt."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const responseData = await response.json();
      
      if (!responseData.choices?.[0]?.message?.content) {
        console.error('Invalid API response structure:', responseData);
        throw new Error('Invalid response format from API');
      }

      const content = responseData.choices[0].message.content;
      console.log('Raw API response content:', content);
      
      try {
        const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
        console.log('Cleaned content before parsing:', cleanedContent);
        
        const parsedResult = JSON.parse(cleanedContent);
        
        const requiredKeys = ['keyPlayers', 'winProbability', 'recentForm', 'headToHead', 'venuePerformance'];
        const missingKeys = requiredKeys.filter(key => !parsedResult[key]);
        
        if (missingKeys.length > 0) {
          console.error('Missing required keys in prediction data:', missingKeys);
          throw new Error(`Missing required keys: ${missingKeys.join(', ')}`);
        }
        
        setResult(parsedResult);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        console.error('Failed content:', content);
        throw new Error('Failed to parse prediction data: ' + parseError.message);
      }
    } catch (error) {
      console.error("Prediction failed:", error);
      setError(error.message || "Failed to fetch prediction");
    } finally {
      setLoading(false);
    }
  };

  const [day, month, year] = match.date.split('-');
  const [hours, minutes] = match.time.split(':');
  const matchDateTime = new Date(year, month - 1, day, hours, minutes);

  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span style={styles.countdown}>Match in progress!</span>;
    } else {
      return (
        <span style={styles.countdown}>
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      );
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

      <button 
        style={styles.predictButton} 
        onClick={handlePredict} 
        disabled={loading}
      >
        {loading ? "PREDICTING..." : "PREDICTION"}
      </button>

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
                    ...styles.probabilityFill,
                    backgroundColor: '#ddd',
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
