
import React from 'react';
import { BlobCursor as ReactBitsBlobCursor } from 'react-bits';

const BlobCursor = () => {
  return (
    <ReactBitsBlobCursor
      fillColor="rgba(139, 92, 246, 0.3)"
      borderColor="rgba(59, 130, 246, 0.5)"
      size={40}
      speed={0.8}
    />
  );
};

export default BlobCursor;
