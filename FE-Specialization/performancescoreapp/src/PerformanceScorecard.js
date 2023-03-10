import React, { useState } from 'react';
import { Chartcomp } from './Chartcomp';
import './PerformanceScorecard.css';


const values = [
  'Exceed Client Expectations',
  'Pursue Excellance' ,
  'Build For LongTerm',
  'Embrace Change And Innovation',
  'Work As One Global Team',
  'Be A Caring Meritocracy',
  'Drive Commercial Rigor',
  'Always Act With Integrity'
];

const PerformanceScorecard = () => {
  
  const [pmeeting, setpmeeting] = useState([]);
  const [ppartiallymeeting, setppartiallymeeting] = useState([]);
  const [pnotmeeting, setpnotmeeting] = useState([]);
  const [pexceeding, setpexceeding] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [scores, setScores] = useState({});
  const [comments, setComments] = useState({});
  const [displayChart, setdisplayChart] = useState(false);

  const handleScoreChange = (value, index) => {
    const newScores = { ...scores };
    newScores[index] = value;
    setScores(newScores);
  };

  const handleCommentChange = (value, index) => {
    const newComments = { ...comments };
    newComments[index] = value;
    setComments(newComments);
  };

  const calculateAverageScore = () => {
    const totalScore = Object.values(scores).reduce((sum, score) => parseInt(sum) + parseInt(score), 0);
    console.log(totalScore)
    console.log(scores)
    return Object.values(scores).length > 0 ? (totalScore / Object.values(scores).length).toFixed(2) : 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Employee Name:', employeeName);
    console.log('Scores:', scores);
    console.log('Comments:', comments);
    const performanceScorecard = {
      Name:employeeName,
    
    };
    var arrayLength = values.length;
    for (var i = 0; i < arrayLength; i++) {
        console.log(values[i])
        performanceScorecard[values[i]]=scores[i]
      
    }
    try {
      // Submit the performance scorecard data to the backend API
      const response = await fetch ('http://localhost:3001/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(performanceScorecard),
      });
 
      // Handle the response from the backend API
      const data = await response.json();
      console.log(data);
      var Meeting=[],Not_Meeting=[],Partially_Meeting=[],Exceeding=[];
      for(var j=0;j<=values.length; j++){
      var count_Meeting =0,count_Not_Meeting =0,count_Partially_Meeting =0,count_Exceeding =0;
      for(var i=0;i<data['data'].length; i++)
      {
        console.log(data['data'][i])
        console.log(values[j])
        console.log(data['data'][i][values[j]])

        if(data['data'][i][values[j]] == "1" ){
            count_Not_Meeting =count_Not_Meeting +1
        }
        if(data['data'][i][values[j]] == "2" ){
            count_Partially_Meeting =count_Partially_Meeting +1
        }
        if(data['data'][i][values[j]] == "3" ){
            count_Meeting =count_Meeting +1
        }
        if(data['data'][i][values[j]] == "4" ){
            count_Exceeding =count_Exceeding +1
        }
        
      }
      Not_Meeting.push(count_Not_Meeting);
      Partially_Meeting.push(count_Partially_Meeting);
      Meeting.push(count_Meeting);
      Exceeding.push(count_Exceeding);

    }
    setpmeeting(Meeting);
    setpnotmeeting(Not_Meeting);
    setppartiallymeeting(Partially_Meeting);
    setpexceeding(Exceeding)
    console.log(Not_Meeting);
    console.log(Partially_Meeting);
    console.log(Meeting);
    console.log(Exceeding);
    setdisplayChart(true)
     
    } catch (error) {
      console.error(error);
    }


  };

  return (
    <div className='background'>
    <div className="performance-scorecard">
      <h1 style={{fontWeight: 'bold',color: '#008080'}}>Performance Scorecard</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employee-name">Employee Name:</label>
          <input type="text" id="employee-name" value={employeeName} onChange={event => setEmployeeName(event.target.value)} required />
        </div>

        {values.map((value, index) => (
          <div className="form-group" key={index}>
            <label htmlFor={`score-${index}`}>{value}:</label>
            <select id={`score-${index}`} value={scores[index]} onChange={event => handleScoreChange(event.target.value, index)} required>
              <option value="">Select One</option>
              <option value="4">Exceeding</option>
              <option value="3">Meeting</option>
              <option value="2">Partially Meeting</option>
              <option value="1">Not Meeting</option>
            </select>

            {(scores[index] === '4' || scores[index] === '1') && (
              <div className="form-group">
                <label htmlFor={`comment-${index}`}>Comment:</label>
                <textarea id={`comment-${index}`} value={comments[index]} onChange={event => handleCommentChange(event.target.value, index)} />
              </div>
            )}
          </div>
        ))}

        <div className="form-group">
          <p style={{fontWeight: 'bold',color: 'red'}}>Average Score: {calculateAverageScore()}</p>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
      {displayChart && <Chartcomp Meeting={pmeeting} Not_Meeting={pnotmeeting} Partially_Meeting={ppartiallymeeting} Exceeding={pexceeding}/>}
    </div>
    </div>
  );
};

export default PerformanceScorecard;