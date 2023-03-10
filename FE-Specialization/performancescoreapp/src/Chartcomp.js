import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
const Chance = require('chance');
const chance = new Chance();

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export var Chart_Meeting=[] ;
export var Chart_NotMeeting=[] ;
export var Chart_PartiallyMeeting=[] ;
export var Chart_Exceeding=[] ;


export const options = {
  plugins: {
    title: {
      display: true,
      text: 'Performance Chart',
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

             
const labels = ['Exceed Client Expectations','Pursue Excellance','Build For LongTerm','Embrace Change And Innovation','Work As One Global Team','Be A Caring Meritocracy','Drive Commercial Rigor','Always Act With Integrity'];


export function Chartcomp(props) {
  var {Meeting,Not_Meeting,Partially_Meeting,Exceeding} = props
  // Chart_Meeting= Meeting;
  // Chart_NotMeeting=Not_Meeting;
  // Chart_PartiallyMeeting=Partially_Meeting;
  // Chart_Exceeding=Exceeding
  console.log(Meeting);
  console.log(Not_Meeting);
  console.log(Partially_Meeting);
  console.log(Exceeding);
  // console.log(Chart_Meeting);
  // console.log(Chart_NotMeeting);
  // console.log(Chart_PartiallyMeeting);
  // console.log(Chart_Exceeding);
  const data = {
    labels,
    datasets: [
      {
        label: 'Exceeding',
        data: Exceeding,
        backgroundColor: 'rgb(255, 99, 132)',
        stack: 'Stack 0',
      },
      {
        label: 'Meeting',
        data: Meeting,
        backgroundColor: 'rgb(75, 192, 192)',
        stack: 'Stack 0',
      },
      {
        label: 'Partially_Meeting',
        data: Partially_Meeting,
        backgroundColor: 'rgb(100, 0, 100)',
        stack: 'Stack 1',
      },
      {
        label: 'Not_Meeting',
        data: Not_Meeting,
        backgroundColor: 'rgb(50, 164, 239)',
        stack: 'Stack 1',
      },
    ],
  };
  
  return <Bar options={options} data={data} />;
}


