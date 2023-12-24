'use client'

import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [ activeIndex, setActiveIndex ] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const getArrowRotation = (index) => {
    return activeIndex === index ? 'rotate-180' : 'rotate-0';
  };

  return (
    <div className="max-w-md mx-auto">
      { items.map((item, index) => (
        <div key={ index } className="mb-2">
          <div
            onClick={ () => handleItemClick(index) }
            className={ `flex justify-between items-center bg-gray-200 p-2 cursor-pointer transition ${ activeIndex === index ? 'rounded-t-md' : 'rounded-md'
              }` }
          >
            <span>{ item.title }</span>
            <svg
              className={ `h-4 w-4 transition-transform transform ${ getArrowRotation(
                index
              ) }` }
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          { activeIndex === index && (
            <div
              className={ `bg-white p-2 overflow-hidden transition-max-height ${ activeIndex === index ? 'max-h-96' : 'max-h-0'
                }` }
            >
              <p>{ item.content }</p>
            </div>
          ) }
        </div>
      )) }
    </div>
  );
};

export default Accordion;
