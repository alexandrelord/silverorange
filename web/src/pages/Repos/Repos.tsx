import { useState, useEffect } from 'react';
import { IRepo } from '../../types/Repos';

export function Repos() {
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      const response = await fetch('http://localhost:4000/repos');
      if (response.ok) {
        const result = await response.json();
        setRepos(
          result.data.sort(function (a: IRepo, b: IRepo) {
            return (
              // sort in reverse chronological order by creation date
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          })
        );
      }
      setLoading(false);
    };
    fetchRepos();
  }, []);

  return (
    <div>
      <h1>Repos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
