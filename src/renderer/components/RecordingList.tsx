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
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>Recordings</h2>
      <ul>
        {recordings.map((recording) => (
          <li key={recording.name}>
            {recording.name} - {formatDate(recording.date)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecordingsList;