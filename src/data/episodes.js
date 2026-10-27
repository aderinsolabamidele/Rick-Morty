// Interdimensional transmissions — every entry links to a real, verified
// official Adult Swim YouTube video (IDs confirmed via YouTube oEmbed).
// `kind` distinguishes trailers/clips from full episodes; full episodes are
// not legally on YouTube, so the archive points to the official destination.
export const EPISODES = [
  {
    id: 'trailer-s9', kind: 'TRAILER', season: 9, episode: 0,
    title: 'SEASON 9 TRAILER #2', youtubeId: 'wEEIUYnmXBM',
    dimension: 'C-137', status: 'OFFICIAL', color: '#BEF264', accent: '#22D3EE',
    desc: 'The multiverse is opening again. Official Season 9 trailer from Adult Swim.',
  },
  {
    id: 'sneak-s9', kind: 'SNEAK PEEK', season: 9, episode: 0,
    title: 'SEASON 9 SNEAK PEEK', youtubeId: 'ljZb-ZO2WFs',
    dimension: 'C-137', status: 'OFFICIAL', color: '#BEF264', accent: '#22D3EE',
    desc: 'First-look footage from the new season, straight from Adult Swim.',
  },
  {
    id: 'opening-s9', kind: 'OPENING', season: 9, episode: 0,
    title: 'SEASON 9 OPENING SEQUENCE', youtubeId: 'xrBXqLVgAD0',
    dimension: 'C-137', status: 'OFFICIAL', color: '#22D3EE', accent: '#BEF264',
    desc: 'The brand-new title sequence, officially released.',
  },
  {
    id: 'bad-memories', kind: 'CLIP', season: 2, episode: 5,
    title: 'BAD MEMORIES WITH RICK', youtubeId: 'SZGcvfHaTyg',
    dimension: 'C-137', status: 'OFFICIAL', color: '#BEF264', accent: '#84CC16',
    desc: 'Morty suspects Rick is a parasite. Trust the bad memories.',
  },
  {
    id: 'keep-summer-safe', kind: 'CLIP', season: 2, episode: 6,
    title: 'KEEP SUMMER SAFE', youtubeId: '4tpYFen3fJM',
    dimension: 'MICROVERSE', status: 'OFFICIAL', color: '#22D3EE', accent: '#7C3AED',
    desc: "Rick's car takes 'keep Summer safe' very literally.",
  },
  {
    id: 'rickshank', kind: 'FEATURETTE', season: 3, episode: 1,
    title: 'INSIDE THE RICKSHANK REDEMPTION', youtubeId: 'RecdrgB-Odc',
    dimension: 'C-137', status: 'OFFICIAL', color: '#7C3AED', accent: '#22D3EE',
    desc: "Inside the Season 3 premiere's prison break.",
  },
  {
    id: 'sober-rick', kind: 'CLIP', season: 3, episode: 6,
    title: 'MORTY MEETS SOBER RICK', youtubeId: 'OwCt5skZqWU',
    dimension: 'C-137', status: 'OFFICIAL', color: '#BEF264', accent: '#22D3EE',
    desc: 'Morty meets a very different Rick.',
  },
];

// Verified official destination for full episodes (not legally on YouTube).
export const EPISODES_OFFICIAL_DEST = 'https://www.adultswim.com/videos/rick-and-morty';