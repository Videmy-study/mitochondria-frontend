
import React from 'react';
import { Cursor } from 'react-bits';

const BlobCursor = () => {
  return (
    <Cursor
      type="blob"
      color="#8b5cf6"
      size={40}
      style={{
        background: 'radial-gradient(circle, rgba(139, 92, 246, 1) 0%, rgba(59, 130, 246, 0.8) 70%, transparent 100%)',
        filter: 'blur(1px)',
      }}
    />
  );
};

export default BlobCursor;
