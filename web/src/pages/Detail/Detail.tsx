import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Detail.module.css';

export function Detail() {
  const { state } = useLocation();
  const [readme, setReadme] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReadme = async () => {
      const response = await fetch(
        `https://raw.githubusercontent.com/${state.repo.full_name}/master/README.md`
      );
      if (response.ok) {
        const data = await response.text();
        setReadme(data);
        setLoading(false);
      }
    };
    fetchReadme();
  }, [state.repo.full_name]);

  function renderLatestCommit() {
    return (
      <div className={styles.commit}>
        <h1>Latest Commit</h1>
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{state.latestCommit.author}</td>
              <td>{state.latestCommit.message}</td>
              <td>{state.latestCommit.date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <section>
      {renderLatestCommit()}
      {loading ? <p>Loading...</p> : readme}
      <Link to="/">
        <button>Back</button>
      </Link>
    </section>
  );
}
