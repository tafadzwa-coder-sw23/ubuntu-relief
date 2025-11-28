import { Need, Stat } from './types';

export const DUMMY_NEEDS: Need[] = [
  {
    id: '1',
    title: 'Oxygen Concentrators for Mutare General',
    organization: 'Mutare Health Fund',
    location: 'Mutare, Manicaland',
    category: 'Medical',
    urgency: 'High',
    description: 'Urgent request for 50 oxygen concentrators to support the isolation ward due to rising respiratory cases.',
    raised: 12500,
    target: 25000,
    donations: [
      { id: 'd101', donorName: 'Econet Global', amount: 5000, date: '2023-11-15', anonymous: false },
      { id: 'd102', donorName: 'Sarah Moyo', amount: 200, date: '2023-11-18', anonymous: false },
      { id: 'd103', donorName: 'Anonymous', amount: 500, date: '2023-11-20', anonymous: true },
      { id: 'd104', donorName: 'Diaspora Relief UK', amount: 2000, date: '2023-11-22', anonymous: false },
    ]
  },
  {
    id: '2',
    title: 'Food Parcels for Mbare High-Density',
    organization: 'Mbare Community Trust',
    location: 'Mbare, Harare',
    category: 'Food',
    urgency: 'High',
    description: 'Providing maize meal, cooking oil, and beans to 500 vulnerable families affected by lockdown restrictions.',
    raised: 3000,
    target: 5000,
    donations: [
      { id: 'd201', donorName: 'Tinashe K.', amount: 50, date: '2023-11-25', anonymous: false },
      { id: 'd202', donorName: 'Anonymous', amount: 1000, date: '2023-11-26', anonymous: true },
      { id: 'd203', donorName: 'Local Spar Market', amount: 1500, date: '2023-11-27', anonymous: false },
    ]
  },
  {
    id: '3',
    title: 'Remote Learning Tablets for Rural Schools',
    organization: 'Educate Zimbabwe',
    location: 'Gokwe, Midlands',
    category: 'Education',
    urgency: 'Medium',
    description: 'Distributing solar-powered tablets pre-loaded with syllabus content for children in Gokwe North.',
    raised: 8000,
    target: 40000,
    donations: [
      { id: 'd301', donorName: 'Tech for Africa', amount: 5000, date: '2023-10-10', anonymous: false },
      { id: 'd302', donorName: 'James & Linda', amount: 200, date: '2023-10-15', anonymous: false },
    ]
  },
  {
    id: '4',
    title: 'PPE Kits for Frontline Workers',
    organization: 'Bulawayo Medical Response',
    location: 'Bulawayo, Matabeleland',
    category: 'Medical',
    urgency: 'High',
    description: 'N95 masks, gloves, and gowns for Mpilo Central Hospital staff.',
    raised: 15000,
    target: 15000,
    donations: [
      { id: 'd401', donorName: 'Health Min Grant', amount: 10000, date: '2023-11-01', anonymous: false },
      { id: 'd402', donorName: 'Corporate Sponsor', amount: 5000, date: '2023-11-05', anonymous: true },
    ]
  },
  {
    id: '5',
    title: 'Clean Water Borehole Drilling',
    organization: 'Water for Life Africa',
    location: 'Chitungwiza, Harare Province',
    category: 'Hygiene',
    urgency: 'High',
    description: 'Drilling 3 new boreholes to ensure sanitation and handwashing capabilities in high-density zones.',
    raised: 4500,
    target: 12000,
    donations: [
      { id: 'd501', donorName: 'Rotary Club Harare', amount: 3000, date: '2023-12-01', anonymous: false },
      { id: 'd502', donorName: 'Tendai Biti', amount: 100, date: '2023-12-02', anonymous: false },
      { id: 'd503', donorName: 'Anonymous', amount: 50, date: '2023-12-05', anonymous: true },
    ]
  }
];

export const DASHBOARD_STATS: Stat[] = [
  { label: 'Active NGOs', value: '142', change: '+12%', positive: true },
  { label: 'Total Donations (USD)', value: '$1.2M', change: '+8.5%', positive: true },
  { label: 'Critical Zones', value: '4', change: '-2', positive: true },
  { label: 'Volunteers Mobilized', value: '3,450', change: '+24%', positive: true },
];

export const CHART_DATA = [
  { name: 'Harare', active: 400, recovered: 240, resources: 80 },
  { name: 'Bulawayo', active: 300, recovered: 139, resources: 60 },
  { name: 'Mutare', active: 200, recovered: 580, resources: 50 },
  { name: 'Gweru', active: 278, recovered: 390, resources: 70 },
  { name: 'Masvingo', active: 189, recovered: 480, resources: 40 },
  { name: 'Vic Falls', active: 100, recovered: 200, resources: 90 },
];