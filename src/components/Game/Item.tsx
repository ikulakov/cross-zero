import React from 'react'

const Item: React.FC<any> = ({value, ...props}) => {
    return (
      <div className='item' {...props}>{value}</div>
    );
  };

export default Item;