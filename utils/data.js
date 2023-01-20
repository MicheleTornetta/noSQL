const names = [
    'Andrew',
    'Betty',
    'Catheryn',
    'Donald',
    'Erica',
    'Frances',
    'Gregory',
    'Harlan',
    'Isabell',
    ``,
  ];
  const users = [];
  const getNamePart = () => names[Math.floor(Math.random() * names.length)];
  const getRandomName = () => `${getNamePart()} ${getNamePart()}`;
  
  module.exports = getRandomName;
  