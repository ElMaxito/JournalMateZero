import React, { useState } from 'react';

const RecordButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Actual recording logic will be implemented later
  };

  return (
    <button 
      className={`record-button ${isRecording ? 'recording' : ''}`} 
      onClick={toggleRecording}
      aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
    />
  );
};

export default RecordButton;