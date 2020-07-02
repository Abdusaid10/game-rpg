let name = 'Name';

const setName = (newName) => {
  name = newName;
  return name;
};

const getName = () => name;

export { setName, getName };