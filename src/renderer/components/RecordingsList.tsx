import React, { useEffect, useState } from 'react';

interface Recording {
  name: string;
  date: string;
}

const RecordingsList: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      const result = await window.electron.ipcRenderer.invoke('get-recordings');
      setRecordings(result);
    };

    fetchRecordings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()} (${date.toLocaleString('en-US', { weekday: 'long' })})`;
  };

  return (
    <div className="recordings-list">
      <h2>Recordings</h2>
      {recordings.map((recording) => (
        <div key={recording.name} className="recording-card">
          <div className="recording-name">{recording.name}</div>
          <div className="recording-date">{formatDate(recording.date)}</div>
        </div>
      ))}
    </div>
  );
};

export default RecordingsList;