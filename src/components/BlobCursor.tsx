
import React from 'react';
import { Cursor } from 'react-bits';

const BlobCursor = () => {
  return (
    <Cursor
      fillColor="rgba(139, 92, 246, 0.3)" 
      borderColor="rgba(59, 130, 246, 0.5)"
      size={40}
      speed={0.8}
    />
  );
};

export default BlobCursor;
