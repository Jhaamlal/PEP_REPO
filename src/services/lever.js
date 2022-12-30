import Axios from 'axios';

const getAllLever = () => {
  const url = `http://localhost:8000/levers`;
  return Axios.get(url).then((res) => res.data);
};

const getSelectedLever = (selectedLever) => {
  const url = `http://localhost:8000/levers?sector=${selectedLever}`;
  return Axios.get(url).then((res) => res.data);
};

const Leversdata = {
  getAllLever,
  getSelectedLever,
};

export { Leversdata };
