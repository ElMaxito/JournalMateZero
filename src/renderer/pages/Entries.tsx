import React, { useEffect, useState } from 'react';
import AudioPlayer from '../components/AudioPlayer';

interface Recording {
  name: string;
  date: Date;
  path: string;
}

const Entries: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const result = await window.electron.ipcRenderer.invoke('get-recordings');
        setRecordings(result);
      } catch (error) {
        console.error('Error fetching recordings:', error);
      }
    };

    fetchRecordings();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h1>Entries</h1>
      <div>
        <h2>Recordings</h2>
        {recordings.length === 0 ? (
          <p>No recordings found.</p>
        ) : (
          <ul>
            {recordings.map((recording) => (
              <li key={recording.name}>
                {recording.name} - {formatDate(recording.date)}
                <AudioPlayer src={`safe-local-file://${recording.path}`} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Entries;