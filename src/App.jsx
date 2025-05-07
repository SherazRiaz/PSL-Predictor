import React, { useState } from "react";
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

  // Convert date and time to a Date object
  const [day, month, year] = match.date.split('-');
  const [hours, minutes] = match.time.split(':');
  const matchDateTime = new Date(year, month - 1, day, hours, minutes);


  const countdownRenderer = ({ days, hours, minutes, seconds, completed, formatted, props }) => {
  const matchStartTime = new Date(props.date).getTime(); // props.date is the target countdown date
  const now = Date.now();
  const matchEndTime = matchStartTime + 4 * 60 * 60 * 1000; // 4 hours after match starts

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
  const matchEndTime = matchStartTime + 4 * 60 * 60 * 1000; // 4 hours after match starts
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

    const coordinates = venueCoordinates[match.venue];
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.lat}&longitude=${coordinates.long}&current=temperature_2m,wind_speed_10m`
      );
      const weatherData = await weatherResponse.json();

    const processedMatches = matchesData[2].matches.map(match => ({
      date: match.date,
      teams: match.teams || [match.home_team, match.away_team],
      result: match.result,
      venue: match.venue,
      winner: match.result && typeof match.result === 'string' && match.teams ? 
        (match.result.includes(match.teams[0]) ? match.teams[0] : 
         match.result.includes(match.teams[1]) ? match.teams[1] : null) : null
    })).concat(
      matchesData[3].matches.map(match => {
        const teams = [];
        if (match.score?.peshawar_zalmi) teams.push("Peshawar Zalmi");
        if (match.score?.multan_sultans) teams.push("Multan Sultans");
        if (match.score?.karachi_kings) teams.push("Karachi Kings");
        if (match.score?.islamabad_united) teams.push("Islamabad United");
        if (match.score?.lahore_qalandars) teams.push("Lahore Qalandars");
        if (match.score?.quetta_gladiators) teams.push("Quetta Gladiators");
        
        const resultStr = String(match.result || '');
        return {
          date: match.date,
          teams: teams,
          result: resultStr,
          venue: match.venue,
          winner: resultStr.includes("won") ? resultStr.split(" won")[0] : null
        };
      })
    ).concat(
      matchesData[4].matches.map(match => {
        const teams = [];
        if (match.score?.peshawar_zalmi) teams.push("Peshawar Zalmi");
        if (match.score?.multan_sultans) teams.push("Multan Sultans");
        if (match.score?.karachi_kings) teams.push("Karachi Kings");
        if (match.score?.islamabad_united) teams.push("Islamabad United");
        if (match.score?.lahore_qalandars) teams.push("Lahore Qalandars");
        if (match.score?.quetta_gladiators) teams.push("Quetta Gladiators");
        
        const resultStr = String(match.result || '');
        return {
          date: match.date,
          teams: teams,
          result: resultStr,
          venue: match.venue,
          winner: resultStr.includes("won") ? resultStr.split(" won")[0] : null
        };
      })
    );

    const teamMatches = processedMatches.filter(m => 
      m.teams.includes(match.team1) || m.teams.includes(match.team2)
    );

    const team1Standing = matchesData[0].find(t => t.Team === match.team1);
    const team2Standing = matchesData[0].find(t => t.Team === match.team2);

    const relevantData = {
      standings: {
        [match.team1]: team1Standing,
        [match.team2]: team2Standing
      },
      recentMatches: teamMatches,
      teams: {
        [match.team1]: teamInfo[match.team1],
        [match.team2]: teamInfo[match.team2]
      },
      venue: match.venue
    };

    const prompt = `Analyze the following match between ${match.team1} and ${match.team2} using this data:

${JSON.stringify(relevantData, null, 2)} and waether data for venue ${weatherData.current.temperature_2m} , ${weatherData.current.wind_speed_10m}

Please provide a prediction analysis with the following criteria:

1. Key players:
   - Most impactful player from each team based on team composition
   - Consider team roles and experience

2. Win probability based on:
   - Team composition and balance
   - Recent team performance
   - Head-to-head potential

3. Recent form:
   - ${match.team1}: ${getTeamForm(match.team1).join(", ")}
   - ${match.team2}: ${getTeamForm(match.team2).join(", ")}
   - Team strength analysis

4. Head-to-head analysis:
   - Team composition comparison
   - Strategic matchups

5. Venue performance:
   - Team adaptability to ${match.venue}
   - Historical venue statistics

Format response as JSON:
{
  "keyPlayers": {
    "${match.team1}": "Player Name (role)",
    "${match.team2}": "Player Name (role)"
  },
  "winProbability": {
    "${match.team1}": number,
    "${match.team2}": number
  },
  "recentForm": {
    "${match.team1}": ${JSON.stringify(getTeamForm(match.team1))},
    "${match.team2}": ${JSON.stringify(getTeamForm(match.team2))}
  },
  "headToHead": {
    "rate": "Predicted matchup analysis",
    "lastMatch": "First meeting this season"
  },
  "venuePerformance": {
    "${match.team1}": number,
    "${match.team2}": number
  }
}`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "PSL Predictor App"
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini-2024-07-18",
          messages: [
            {
              role: "system",
              content: "You are a cricket prediction assistant that provides analysis in JSON format only. Do not include any additional text or formatting in your response."
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

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        console.error('Invalid API response structure:', data);
        throw new Error('Invalid response format from API');
      }

      const content = data.choices[0].message.content;
      
      if (!content) {
        console.error('Empty content from API:', data);
        throw new Error('Empty content received from API');
      }

      try {
        const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
        const parsedResult = JSON.parse(cleanedContent);
        
        if (!parsedResult.keyPlayers || !parsedResult.winProbability || 
            !parsedResult.recentForm || !parsedResult.headToHead || 
            !parsedResult.venuePerformance) {
          throw new Error('Invalid prediction data structure');
        }
        
        setResult(parsedResult);
      } catch (parseError) {
        console.error('Parse error:', parseError);
        console.error('Content that failed to parse:', content);
        throw new Error('Failed to fetch prediction');
      }
    } catch (error) {
      console.error("Prediction failed:", error);
      setError(error.message || "Failed to fetch prediction");
    } finally {
      setLoading(false);
    }
  }

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

const matchesData = [
  [
    {
      "Position": 2,
      "Team": "Lahore Qalandars",
      "Played": 8,
      "Win": 5,
      "Lost": 2,
      "NoResult": 1,
      "Points": 11,
      "NRR": 0.906
    },
    {
      "Position": 6,
      "Team": "Multan Sultans",
      "Played": 9 ,
      "Win": 1,
      "Lost": 8,
      "NoResult": 0,
      "Points": 2,
      "NRR": -2.708
    },
    {
      "Position": 5,
      "Team": "Peshawar Zalmi",
      "Played": 8,
      "Win": 4,
      "Lost": 4,
      "NoResult": 0,
      "Points": 8,
      "NRR": -0.082
    },
    {
      "Position": 2,
      "Team": "Islamabad United",
      "Played": 8,
      "Win": 5,
      "Lost": 3,
      "NoResult": 0,
      "Points": 10,
      "NRR": 0.650
    },
    {
      "Position": 1,
      "Team": "Quetta Gladiators",
      "Played": 8,
      "Win": 5,
      "Lost": 2,
      "NoResult": 1,
      "Points": 11,
      "NRR": 0.906
    },
    {
      "Position": 3,
      "Team": "Karachi Kings",
      "Played": 8,
      "Win": 5,
      "Lost": 3,
      "NoResult": 0,
      "Points": 10,
      "NRR": 0.433
    }
  ],
  [],
  {
    "matches": [
      {
        "match_number": 1,
        "date": "11 April 2025",
        "time": "20:30 (N)",
        "teams": [
          "Lahore Qalandars",
          "Islamabad United"
        ],
        "scorecard": {
          "Lahore Qalandars": "139 (19.2 overs)",
          "Islamabad United": "143/2 (17.4 overs)"
        },
        "key_players": {
          "Lahore Qalandars": "Abdullah Shafique 66 (38)",
          "Islamabad United": "Jason Holder 4/26 (4 overs)"
        },
        "result": "Islamabad United won by 8 wickets",
        "venue": "Rawalpindi Cricket Stadium, Rawalpindi",
        "umpires": [
          "Chris Brown (NZ)",
          "Ahsan Raza (Pak)"
        ],
        "player_of_the_match": "Jason Holder (Islamabad United)",
        "toss_winner": "Islamabad United",
        "toss_decision": "field"
      },
      {
        "match_number": 2,
        "date": "12 April 2025",
        "time": "15:30",
        "teams": [
          "Quetta Gladiators",
          "Peshawar Zalmi"
        ],
        "scorecard": {
          "Quetta Gladiators": "216/3 (20 overs)",
          "Peshawar Zalmi": "136 (15.1 overs)"
        },
        "key_players": {
          "Quetta Gladiators": "Saud Shakeel 59 (42)",
          "Peshawar Zalmi": "Ali Raza 1/31 (4 overs)"
        },
        "result": "Quetta Gladiators won by 80 runs",
        "venue": "Rawalpindi Cricket Stadium, Rawalpindi",
        "umpires": [
          "Ahsan Raza (Pak)",
          "Rashid Riaz (Pak)"
        ],
        "player_of_the_match": "Abrar Ahmed (Quetta Gladiators)",
        "toss_winner": "Peshawar Zalmi",
        "toss_decision": "field"
      },
      {
        "match_number": 4,
        "date": "13 April 2025",
        "time": "20:00 (N)",
        "teams": [
          "Lahore Qalandars",
          "Quetta Gladiators"
        ],
        "scorecard": {
          "Lahore Qalandars": "219/6 (20 overs)",
          "Quetta Gladiators": "140 (16.2 overs)"
        },
        "key_players": {
          "Lahore Qalandars": "Fakhar Zaman 67 (39)",
          "Quetta Gladiators": "Abrar Ahmed 2/33 (4 overs)"
        },
        "result": "Lahore Qalandars won by 79 runs",
        "venue": "Rawalpindi Cricket Stadium, Rawalpindi",
        "umpires": [
          "Chris Brown (NZ)",
          "Ahsan Raza (Pak)"
        ],
        "player_of_the_match": "Fakhar Zaman (Lahore Qalandars)",
        "toss_winner": "Quetta Gladiators",
        "toss_decision": "field"
      },
      {
        "match_number": 5,
        "date": "14 April 2025",
        "time": "20:00 (N)",
        "teams": [
          "Islamabad United",
          "Peshawar Zalmi"
        ],
        "scorecard": {
          "Islamabad United": "243/5 (20 overs)",
          "Peshawar Zalmi": "141 (18.2 overs)"
        },
        "key_players": {
          "Islamabad United": "Sahibzada Farhan 106 (52)",
          "Peshawar Zalmi": "Alzarri Joseph 2/39 (4 overs)"
        },
        "result": "Islamabad United won by 102 runs",
        "venue": "Rawalpindi Cricket Stadium, Rawalpindi",
        "umpires": [
          "Aleem Dar (Pak)",
          "Nasir Hussain (Pak)"
        ],
        "player_of_the_match": "Sahibzada Farhan (Islamabad United)",
        "toss_winner": "Islamabad United",
        "toss_decision": "bat"
      },
      {
        "match_number": 7,
        "date": "16 April 2025",
        "time": "20:00 (N)",
        "teams": [
          "Islamabad United",
          "Multan Sultans"
        ],
        "scorecard": {
          "Islamabad United": "202/6 (20 overs)",
          "Multan Sultans": "155 (18.4 overs)"
        },
        "key_players": {
          "Islamabad United": "Sahibzada Farhan 53 (35)",
          "Multan Sultans": "Chris Jordan 2/41 (4 overs)"
        },
        "result": "Islamabad United won by 47 runs",
        "venue": "Rawalpindi Cricket Stadium, Rawalpindi",
        "umpires": [
          "Chris Brown (NZ)",
          "Ahsan Raza (Pak)"
        ],
        "player_of_the_match": "Jason Holder (Islamabad United)",
        "toss_winner": "Multan Sultans",
        "toss_decision": "field"
      }
    ]
  },
  {
    "matches": [
      {
        "match": 9,
        "date": "19 April 2025",
        "time": "20:00 (N)",
        "home_team": "Peshawar Zalmi",
        "score": {
          "peshawar_zalmi": "227/7 (20 overs)",
          "multan_sultans": "107 (15.5 overs)"
        },
        "top_performers": {
          "peshawar_zalmi": {
            "player": "Tom Kohler-Cadmore",
            "score": "52 (30)"
          },
          "multan_sultans": {
            "player": "Ali Raza",
            "performance": "4/21 (4 overs)"
          }
        
        },
        "result": "Peshawar Zalmi won by 120 runs",
        "venue": "Rawalpindi Cricket Stadium, Rawalpindi",
        "umpires": [
          "Chris Brown (NZ)",
          "Aleem Dar (Pak)"
        ],
        "player_of_the_match": "Abdul Samad (Peshawar Zalmi)",
        "toss": "Peshawar Zalmi won the toss and elected to bat"
      },
      {
        "match": 10,
        "date": "20 April 2025",
        "time": "20:00 (N)",
        "home_team": "Karachi Kings",
        "score": {
          "karachi_kings": "128/7 (20 overs)",
          "islamabad_united": "129/4 (17.1 overs)"
        },
        "top_performers": {
          "karachi_kings": {
            "player": "Tim Seifert",
            "score": "30 (37)"
          },
          "islamabad_united": {
            "player": "Shadab Khan",
            "performance": "2/17 (4 overs)"
          }
        },
        "result": "Islamabad United won by 6 wickets",
        "venue": "National Stadium, Karachi",
        "umpires": [
          "Alex Wharf (Eng)",
          "Asif Yaqoob (Pak)"
        ],
        "player_of_the_match": "Shadab Khan (Islamabad United)",
        "toss": "Islamabad United won the toss and elected to field"
      },
      {
        "match": 11,
        "date": "21 April 2025",
        "time": "20:00 (N)",
        "home_team": "Karachi Kings",
        "score": {
          "peshawar_zalmi": "147/8 (20 overs)",
          "karachi_kings": "148/8 (19.3 overs)"
        },
        "top_performers": {
          "peshawar_zalmi": {
            "player": "Babar Azam",
            "score": "46 (41)"
          },
          "karachi_kings": {
            "player": "David Warner",
            "score": "60 (47)"
          }
        },
        "result": "Karachi Kings won by 2 wickets",
        "venue": "National Stadium, Karachi",
        "umpires": [
          "Faisal Afridi (Pak)",
          "Paul Reiffel (Aus)"
        ],
        "player_of_the_match": "Khushdil Shah (Karachi Kings)",
        "toss": "Karachi Kings won the toss and elected to field"
      },
      {
        "match": 12,
        "date": "22 April 2025",
        "time": "20:00 (N)",
        "home_team": "Multan Sultans",
        "score": {
          "multan_sultans": "228/5 (20 overs)",
          "lahore_qalandars": "195/9 (20 overs)"
        },
        "top_performers": {
          "multan_sultans": {
            "player": "Yasir Khan",
            "score": "87 (44)"
          },
          "lahore_qalandars": {
            "player": "Sikandar Raza",
            "score": "50* (27)"
          }
        },
        "result": "Multan Sultans won by 33 runs",
        "venue": "Multan Cricket Stadium, Multan",
        "umpires": [
          "Chris Brown (NZ)",
          "Rashid Riaz (Pak)"
        ],
        "player_of_the_match": "Yasir Khan (Multan Sultans)",
        "toss": "Multan Sultans won the toss and elected to bat"
      },
      {
        "match": 13,
        "date": "23 April 2025",
        "time": "20:00 (N)",
        "home_team": "Multan Sultans",
        "score": {
          "multan_sultans": "168/5 (20 overs)",
          "islamabad_united": "171/3 (17.1 overs)"
        },
        "top_performers": {
          "multan_sultans": {
            "player": "Usman Khan",
            "score": "61 (40)"
          },
          "islamabad_united": {
            "player": "Andries Gous",
            
            "score": "80* (45)"
          }
        },
        "result": "Islamabad United won by 7 wickets",
        "venue": "Multan Cricket Stadium, Multan",
        "umpires": [
          "Chris Brown (NZ)",
          "Ahsan Raza (Pak)"
        ],
        "player_of_the_match": "Andries Gous (Islamabad United)",
        "toss": "Multan Sultans won the toss and elected to bat"
      },
      {
        "match": 14,
        "date": "24 April 2025",
        "time": "20:00 (N)",
        "home_team": "Lahore Qalandars",
        "score": {
          "lahore_qalandars": "129 (19.2 overs)",
          "peshawar_zalmi": "133/3 (16.4 overs)"
        },
        "top_performers": {
          "lahore_qalandars": {
            "player": "Sikandar Raza",
            "score": "52 (37)"
          },
          "peshawar_zalmi": {
            "player": "Babar Azam",
            "score": "56* (42)"
          }
        },
        "result": "Peshawar Zalmi won by 7 wickets",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Paul Reiffel (Aus)",
          "Asif Yaqoob (Pak)"
        ],
        "player_of_the_match": "Alzarri Joseph (Peshawar Zalmi)",
        "toss": "Peshawar Zalmi won the toss and elected to field"
      }
    ]
  },
  {
    "matches": [
      {
        "match": 15,
        "date": "25 April 2025",
        "time": "20:00 (N)",
        "home_team": "Quetta Gladiators",
        "score": {
          "quetta_gladiators": "142 (19.3 overs)",
          "karachi_kings": "137/8 (20 overs)"
        },
        "top_performers": {
          "quetta_gladiators": {
            "player": "Hasan Ali",
            "performance": "3/33 (3.3 overs)"
          },
          "karachi_kings": {
            "player": "Tim Seifert",
            "score": "47 (26)"
          }
        },
        "result": "Quetta Gladiators won by 5 runs",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Nasir Hussain (Pak)",
          "Paul Reiffel (Aus)"
        ],
        "player_of_the_match": "Abrar Ahmed (Quetta Gladiators)",
        "toss": "Peshawar Zalmi won the toss and elected to field"
      },
      {
        "match": 16,
        "date": "26 April 2025",
        "time": "20:00 (N)",
        "scorecard": {
          "multan_sultans": "185/3 (20 overs)",
          "lahore_qalandars": "186/5 (19 overs)"
        },
        "top_performers": {
          "multan_sultans": {
            "player": "Mohammad Rizwan",
            "score": "76* (48)"
          },
          "lahore_qalandars": {
            "player": "Daryl Mitchell",
            "score": "64 (38)"
          }
        },
        "result": "Lahore Qalandars won by 5 wickets",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Ahsan Raza (Pak)",
          "Alex Wharf (Eng)"
        ],
        "player_of_the_match": "Daryl Mitchell (Lahore Qalandars)",
        "toss": "Lahore Qalandars won the toss and elected to field"
      },
      {
        "match": 17,
        "date": "27 April 2025",
        "time": "20:00 (N)",
        "home_team": "Quetta Gladiators",
        "score": {
          "quetta_gladiators": "178/7 (20 overs)",
          "peshawar_zalmi": "114 (15.2 overs)"
        },
        "top_performers": {
          "quetta_gladiators": {
            "player": "Faheem Ashraf",
            "performance": "5/33 (3.2 overs)"
          },
          "peshawar_zalmi": {
            "player": "Hussain Talat",
            "score": "39 (34)"
          }
        },
        "result": "Quetta Gladiators won by 64 runs",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Rashid Riaz (Pak)",
          "Alex Wharf (Eng)"
        ],
        "player_of_the_match": "Faheem Ashraf (Quetta Gladiators)",
        "toss": "Peshawar Zalmi won the toss and elected to field"
      },
      {
        "match": 18,
        "date": "29 April 2025",
        "time": "20:00 (N)",
        "score": {
          "multan_sultans": "89 (17 overs)",
          "quetta_gladiators": "90/0 (6.5 overs)"
        },
        "top_performers": {
          "multan_sultans": {
            "player": "Khurram Shahzad",
            "performance": "4/23 (4 overs)"
          },
          "quetta_gladiators": {
            "player": "Mohammad Rizwan",
            "score": "44* (44)"
          }
        },
        "result": "Quetta Gladiators won by 10 wickets",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Faisal Afridi (Pak)",
          "Ahsan Raza (Pak)"
        ],
        "player_of_the_match": "Khurram Shahzad (Quetta Gladiators)",
        "toss": "Quetta Gladiators won the toss and elected to field"
      },
      {
        "match": 19,
        "date": "30 April 2025",
        "time": "20:00 (N)",
        "scorecard": {
          "lahore_qalandars": "209/6 (20 overs)",
          "islamabad_united": "121 (16.5 overs)"
        },
        "top_performers": {
          "lahore_qalandars": {
            "player": "Fakhar Zaman",
            "score": "44 (30)"
          },
          "islamabad_united": {
            "player": "Andries Gous",
            "score": "41 (27)"
          }
        },
        "result": "Lahore Qalandars won by 88 runs",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Paul Reiffel (Aus)",
          "Asif Yaqoob (Pak)"
        ],
        "player_of_the_match": "Sikandar Raza (Lahore Qalandars)",
        "toss": "Islamabad United won the toss and elected to field"
      },
      {
        "match": 20,
        "date": "1 May 2025",
        "time": "15:00",
        "score": {
          "karachi_kings": "204/4 (20 overs)",
          "multan_sultans": "117 (16.1 overs)"
        },
        "top_performers": {
          "karachi_kings": {
            "player": "James Vince",
            "score": "65* (45)"
          },
          "multan_sultans": {
            "player": "Mohammad Nabi",
            "performance": "3/14 (4 overs)"
          }
        },
        "result": "Karachi Kings won by 87 runs",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Rashid Riaz (Pak)",
          "Alex Wharf (Eng)"
        ],
        "player_of_the_match": "James Vince (Karachi Kings)",
        "toss": "Karachi Kings won the toss and elected to bat",
        "note": "Originally scheduled in Multan Cricket Stadium, the venue was later changed to Gaddafi Stadium due to hot weather in Multan and logistics issue for the crew."
      },
      {
        "match": 21,
        "date": "1 May 2025",
        "time": "20:00 (N)",
        "score": {
          "lahore_qalandars": "111/3 (11.3 overs)",
          "quetta_gladiators": "Abdullah Shafique 53* (32)"
        },
        "result": "No result",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Faisal Afridi (Pak)",
          "Paul Reiffel (Aus)"
        ],
        "toss": "Quetta Gladiators won the toss and elected to field",
        "note": "No further play was possible due to rain"
      },
      {
        "match": 22,
        "date": "2 May 2025",
        "time": "20:00 (N)",
        "score": {
          "islamabad_united": "143/9 (20 overs)",
          "peshawar_zalmi": "147/4 (16.4 overs)"
        },
        "top_performers": {
          "islamabad_united": {
            "player": "Sahibzada Farhan",
            "score": "36 (35)"
          },
          "peshawar_zalmi": {
            "player": "Maaz Sadaqat",
            "score": "55 (33)"
          }
        },
        "result": "Peshawar Zalmi won by 6 wickets",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Faisal Afridi (Pak)",
          "Alex Wharf (Eng)"
        ],
        "player_of_the_match": "Maaz Sadaqat (Peshawar Zalmi)",
        "toss": "Islamabad United won the toss and elected to bat"
      },
      {
        "match": 23,
        "date": "3 May 2025",
        "time": "20:00 (N)",
        "score": {
          "islamabad_united": "157/9 (20 overs)",
          "quetta_gladiators": "159/8 (19.5 overs)"
        },
        "top_performers": {
          "islamabad_united": {
            "player": "Mohammad Nawaz",
            "score": "49 (34)"
          },
          "quetta_gladiators": {
            "player": "Hassan Nawaz",
            "score": "64* (41)"
          }
        },
        "result": "Quetta Gladiators won by 2 wickets",
        "venue": "Gaddafi Stadium, Lahore",
        "umpires": [
          "Rashid Riaz (Pak)",
          "Alex Wharf (Eng)"
        ],
        "player_of_the_match": "Hassan Nawaz (Quetta Gladiators)"
      },
      {
        "match_number": 24,
        "date": "2025-05-04",
        "time": "20:00",
        "venue": "Gaddafi Stadium, Lahore",
        "match_type": "Night",
        "teams": {
          "home": "Lahore Qalandars",
          "away": "Karachi Kings"
        },
        "score": {
          "Lahore Qalandars": {
            "runs": 160,
            "wickets": 8,
            "overs": 15
          },
          "Karachi Kings": {
            "runs": 168,
            "wickets": 6,
            "overs": 14.3
          }
        },
        "result": {
          "winner": "Karachi Kings",
          "margin": "4 wickets",
          "method": "DLS"
        },
        "top_performers": {
          "batting": [
            {
              "player": "Muhammad Naeem",
              "team": "Lahore Qalandars",
              "runs": 65,
              "balls": 29
            },
            {
              "player": "Irfan Khan Niazi",
              "team": "Karachi Kings",
              "runs": 48,
              "balls": 21,
              "not_out": true
            }
          ],
          "bowling": [
            {
              "player": "Abbas Afridi",
              "team": "Karachi Kings",
              "figures": "4/27",
              "overs": "3"
            },
            {
              "player": "Daryl Mitchell",
              "team": "Karachi Kings",
              "figures": "2/9",
              "overs": "1.3"
            }
          ]
        },
        "player_of_the_match": {
          "name": "Irfan Khan Niazi",
          "team": "Karachi Kings"
        },
        "umpires": [
          {
            "name": "Ahsan Raza",
            "country": "Pakistan"
          },
          {
            "name": "Alex Wharf",
            "country": "England"
          }
        ]
      }
    ]
  }
];

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