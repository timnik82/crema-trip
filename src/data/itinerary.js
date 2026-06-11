export const activityPool = [
  {
    id: 'crema-walk',
    title: 'Crema first walk',
    duration: '2-3 hr',
    tags: ['Crema', 'Walk'],
    description: 'Piazza Duomo, Via Mazzini, Porta Serio, Santissima Trinita, and gelato.',
  },
  {
    id: 'museo-civico',
    title: 'Museo Civico',
    duration: '1 hr',
    tags: ['Crema', 'Culture'],
    description: 'Local history anchor in the former Sant Agostino convent.',
  },
  {
    id: 'santa-maria-croce',
    title: 'Santa Maria della Croce',
    duration: '1-2 hr',
    tags: ['Crema', 'Walk'],
    description: 'Walk out along the avenue to the sanctuary and pair with Muschirola or gelato.',
  },
  {
    id: 'cremona-day',
    title: 'Cremona by train',
    duration: 'Half/full day',
    tags: ['Train', 'City'],
    description: 'Direct train for cathedral square, Torrazzo, and violin culture.',
  },
  {
    id: 'bergamo-day',
    title: 'Bergamo Citta Alta',
    duration: 'Full day',
    tags: ['Bus', 'Train', 'City'],
    description: 'Hilltop old town by Linea M or train plus funicular.',
  },
  {
    id: 'pandino-gradella-loop',
    title: 'Pandino and Gradella',
    duration: 'Half day',
    tags: ['Car', 'Castle'],
    description: 'Visconti castle plus painted rural village.',
  },
  {
    id: 'soncino-day',
    title: 'Soncino',
    duration: 'Half/full day',
    tags: ['Car', 'Castle'],
    description: 'Rocca, walls, old-town atmosphere, and printing museum.',
  },
  {
    id: 'milan-day',
    title: 'Milan day',
    duration: 'Full day',
    tags: ['Bus', 'Train', 'City'],
    description: 'Big-city contrast by bus or train; do not drive into the center.',
  },
  {
    id: 'brescia-day',
    title: 'Brescia by train',
    duration: 'Full day',
    tags: ['Train', 'City'],
    description: 'Roman forum, Santa Giulia, castle, and less obvious Lombardy depth.',
  },
  {
    id: 'garda-day',
    title: 'Lake Garda or Sirmione',
    duration: 'Long full day',
    tags: ['Car', 'Lake'],
    description: 'Optional ambitious day; watch ZTL, parking, and summer crowds.',
  },
];

export const itineraryDays = [
  {
    id: 'wed-17',
    label: 'Wed 17',
    date: '17 June',
    weekday: 'Wednesday',
    slots: [
      {
        id: 'wed-17-morning',
        label: 'Morning',
        items: [
          {
            id: 'arrival-bgy',
            title: 'Arrive at BGY',
            description: 'Land at Milan Bergamo Airport and transfer to central Crema.',
            locked: true,
            warning: 'Build in buffer for airport bus, Linea M, or taxi/private transfer.',
          },
        ],
      },
      {
        id: 'wed-17-afternoon',
        label: 'Afternoon',
        items: [
          {
            id: 'check-in',
            title: 'Check in and settle',
            description: 'Stay central if possible, especially near the wedding bus pickup area.',
          },
        ],
      },
      {
        id: 'wed-17-evening',
        label: 'Evening',
        items: [
          {
            id: 'first-wander',
            title: 'First Crema wander',
            description: 'Piazza Duomo, Piazza Garibaldi, simple aperitivo, early night.',
          },
        ],
      },
    ],
  },
  {
    id: 'thu-18',
    label: 'Thu 18',
    date: '18 June',
    weekday: 'Thursday',
    slots: [
      {
        id: 'thu-18-morning',
        label: 'Morning',
        items: [
          {
            id: 'crema-walk',
            title: 'Slow Crema orientation',
            description: 'Duomo area, coffee, Santissima Trinita, and central streets.',
          },
        ],
      },
      {
        id: 'thu-18-afternoon',
        label: 'Afternoon',
        items: [
          {
            id: 'museo-civico',
            title: 'Museo Civico if timing works',
            description: 'Good Thursday anchor before resting for the evening.',
          },
        ],
      },
      {
        id: 'thu-18-evening',
        label: 'Evening',
        items: [
          {
            id: 'welcome-aperitivo',
            title: 'Welcome aperitivo in Cremosano',
            description: '19:00 fixed event. Arrange taxi, lift, train, or bus.',
            locked: true,
            warning: 'Confirm transport back to Crema before leaving.',
          },
        ],
      },
    ],
  },
  {
    id: 'fri-19',
    label: 'Fri 19',
    date: '19 June',
    weekday: 'Friday',
    slots: [
      {
        id: 'fri-19-morning',
        label: 'Morning',
        items: [
          {
            id: 'bergamo-day',
            title: 'Bergamo or Cremona flex day',
            description: 'First choice Bergamo by public transport; Cremona is lower effort.',
          },
        ],
      },
      { id: 'fri-19-afternoon', label: 'Afternoon', items: [] },
      {
        id: 'fri-19-evening',
        label: 'Evening',
        items: [
          {
            id: 'rest-before-wedding',
            title: 'Light dinner and rest',
            description: 'Keep Friday evening comfortable before the wedding weekend.',
          },
        ],
      },
    ],
  },
  {
    id: 'sat-20',
    label: 'Sat 20',
    date: '20 June',
    weekday: 'Saturday',
    slots: [
      {
        id: 'sat-20-morning',
        label: 'Morning',
        items: [
          {
            id: 'wedding-morning',
            title: 'Protected slow morning',
            description: 'Sleep in, coffee, optional gentle walk only.',
            locked: true,
          },
        ],
      },
      {
        id: 'sat-20-afternoon',
        label: 'Afternoon',
        items: [
          {
            id: 'wedding-day',
            title: 'Wedding at Villa San Michele',
            description: 'Ceremony at 17:00. Likely central Crema bus pickup around 16:15-16:30.',
            locked: true,
            warning: 'Exact bus pickup time and location must be confirmed with hosts.',
          },
        ],
      },
      {
        id: 'sat-20-evening',
        label: 'Evening',
        items: [
          {
            id: 'wedding-return',
            title: 'Late-night bus return',
            description: 'Private return to central Crema.',
            locked: true,
          },
        ],
      },
    ],
  },
  {
    id: 'sun-21',
    label: 'Sun 21',
    date: '21 June',
    weekday: 'Sunday',
    slots: [
      {
        id: 'sun-21-morning',
        label: 'Morning',
        items: [
          {
            id: 'recovery-morning',
            title: 'Recovery morning',
            description: 'Late breakfast, gelato, Santa Maria della Croce, or slow Crema.',
          },
        ],
      },
      {
        id: 'sun-21-afternoon',
        label: 'Afternoon',
        items: [
          {
            id: 'soncino-day',
            title: 'Optional Soncino',
            description: 'Only if energy is good; otherwise stay gentle.',
          },
        ],
      },
      {
        id: 'sun-21-evening',
        label: 'Evening',
        items: [
          {
            id: 'sunday-caveat',
            title: 'Sunday evening caveat',
            description: 'Restaurant and transport options can be patchier.',
            warning: 'Linea M does not run Sundays or holidays.',
          },
        ],
      },
    ],
  },
  {
    id: 'mon-22',
    label: 'Mon 22',
    date: '22 June',
    weekday: 'Monday',
    slots: [
      {
        id: 'mon-22-morning',
        label: 'Morning',
        items: [
          {
            id: 'milan-day',
            title: 'Milan or Cremona city day',
            description: 'Museums in Crema are closed, so choose a city day or car loop.',
          },
        ],
      },
      { id: 'mon-22-afternoon', label: 'Afternoon', items: [] },
      {
        id: 'mon-22-evening',
        label: 'Evening',
        items: [
          {
            id: 'booked-dinner',
            title: 'Booked dinner',
            description: 'Monday closures are common, so reserve rather than wing it.',
          },
        ],
      },
    ],
  },
  {
    id: 'tue-23',
    label: 'Tue 23',
    date: '23 June',
    weekday: 'Tuesday',
    slots: [
      {
        id: 'tue-23-morning',
        label: 'Morning',
        items: [
          {
            id: 'pandino-gradella-loop',
            title: 'Countryside loop or Brescia',
            description: 'Use a car for Pandino and Gradella, or take train for Brescia.',
            warning: 'Pandino Castle public openings are Friday-Sunday, so Tuesday is for exterior/countryside unless verified.',
          },
        ],
      },
      { id: 'tue-23-afternoon', label: 'Afternoon', items: [] },
      {
        id: 'tue-23-evening',
        label: 'Evening',
        items: [
          {
            id: 'final-dinner',
            title: 'Final dinner',
            description: 'Botero, Bosco, Muschirola, or another booked target.',
          },
        ],
      },
    ],
  },
  {
    id: 'wed-24',
    label: 'Wed 24',
    date: '24 June',
    weekday: 'Wednesday',
    slots: [
      {
        id: 'wed-24-morning',
        label: 'Morning',
        items: [
          {
            id: 'departure-bgy',
            title: 'Depart for BGY',
            description: 'Reverse the arrival transfer and allow extra buffer.',
            locked: true,
            warning: 'If flight timing is tight, prefer taxi/private transfer.',
          },
        ],
      },
      { id: 'wed-24-afternoon', label: 'Afternoon', items: [] },
      { id: 'wed-24-evening', label: 'Evening', items: [] },
    ],
  },
];
