import React, { useRef } from 'react';

const Copyid = ({ textToCopy }) => {
  const textRef = useRef(null);

  const handleCopyClick = () => {
    textRef.current.select();
    document.execCommand('copy');
  };

  return (
    <div>
      <input
        ref={textRef}
        type="text"
        value={textToCopy}
        readOnly
      />
      <button onClick={handleCopyClick}>Copy</button>
      <style jsx>{`
        .container {
          display flex;
          align-items: center;
        }
        
        input {
          margin-right: 10px;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        
        button {
          background-color: #007bff;
          color: #fff;
          padding: 5px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  )
 };

export default Copyid;
