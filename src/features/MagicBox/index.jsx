import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import BoxList from './components/BoxList';

MagicBoxFeature.propTypes = {
  
};

const FAKE_DATA = [
  {
    color: 'goldenrod',
    luckyNumber: 1,
    size: 'small',
  },
  {
    color: 'deeppink',
    luckyNumber: 2,
    size: 'medium',
  },
  {
    color: 'green',
    luckyNumber: 3,
    size: 'large',
  },
  {
    color: 'yellow',
    luckyNumber: 4,
    size: 'medium',
  },
  {
    color: 'tomato',
    luckyNumber: 5,
    size: 'small',
  },
]

function MagicBoxFeature(props) {
  const [boxList, setBoxList] = useState(FAKE_DATA);

  const handleBoxClick = (idx, box) => {
    // Remove box from list
    console.log(box, idx);
    const newBoxList = [...boxList];
    newBoxList.splice(idx, 1);

    setBoxList(newBoxList);
  }
  return (
    <div>
      <h2>Magic Box Feature</h2>

      <BoxList boxList={boxList} onBoxClick={handleBoxClick} />
    </div>
  );
}

export default MagicBoxFeature;