import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box/index';
import './BoxList.scss';

BoxList.propTypes = {
  boxList: PropTypes.array,
  onBoxClick: PropTypes.func,
};

BoxList.defaultProps = {
  boxList: [],
  onBoxClick: null,
};

function BoxList({ boxList, onBoxClick }) {
  return (
    <div className="box-list">
      {boxList.map((box, idx) => (
        <li key={boxList.luckyNumber}>
          <Box box={box} onClick={(box) => onBoxClick && onBoxClick(box, idx)}>
            Box {box.luckyNumber}
          </Box>
        </li>
      ))}
    </div>
  );
}

export default BoxList;
