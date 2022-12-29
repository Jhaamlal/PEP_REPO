import Axios from 'axios';

const getAllLever = () => {
  const url = 'http://localhost:8000/levers';
  return Axios.get(url).then((res) => res.data);
};

const Leversdata = {
  getAllLever,
};

export default Leversdata;
