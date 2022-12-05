import { useState, useEffect } from 'react';
import { IRepo } from '../../types/Repos';
import styles from './Repos.module.css';

export function Repos() {
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [language, setLanguage] = useState('All');
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

  async function handleClick(url: string) {
    const commitsUrl = url.replace('{/sha}', '');

    const fetchCommits = async () => {
      const response = await fetch(commitsUrl);
      if (response.ok) {
        const result = await response.json();
        const author = result[0].commit.author.name;
        const message = result[0].commit.message;
        const date = result[0].commit.author.date;
        console.log(author, message, date);
      }
    };
    fetchCommits();
  }

  function renderReposTable() {
    return (
      <table className={styles.reposTbl}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Language</th>
            <th>Forks Count</th>
          </tr>
        </thead>
        <tbody>
          {language === 'All' &&
            repos.map((repo) => (
              <tr key={repo.id} onClick={() => handleClick(repo.commits_url)}>
                <td>{repo.name}</td>
                <td>{repo.description}</td>
                <td>{repo.language}</td>
                <td>{repo.forks_count}</td>
              </tr>
            ))}
          {language &&
            repos
              .filter((repo) => repo.language === language)
              .map((repo) => (
                <tr key={repo.id} onClick={() => handleClick(repo.commits_url)}>
                  <td>{repo.name}</td>
                  <td>{repo.description}</td>
                  <td>{repo.language}</td>
                  <td>{repo.forks_count}</td>
                </tr>
              ))}
        </tbody>
      </table>
    );
  }

  function renderLanguageButtons() {
    const languages: string[] = ['All'];
    repos.forEach((repo) => {
      if (!languages.includes(repo.language)) {
        languages.push(repo.language);
      }
    });

    return (
      <div className={styles.btnContainer}>
        {languages.map((lang, id) => (
          <button
            key={id}
            onClick={() => {
              setLanguage(lang);
              renderReposTable();
            }}
          >
            {lang}
          </button>
        ))}
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <h1>Repos</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {renderReposTable()} {renderLanguageButtons()}
        </>
      )}
    </section>
  );
}
