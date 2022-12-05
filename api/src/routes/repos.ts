import { Router, Request, Response } from 'express';
import fetch from 'node-fetch-commonjs';
import { IRepo } from '../types/Repos';
import { promises as fs } from 'fs';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  // Fetch repos from GitHub API
  const response = await fetch(
    'https://api.github.com/users/silverorange/repos'
  );

  const apiData = (await response.json()) as IRepo[];

  // Fetch repos from local JSON file
  const localData: IRepo[] = JSON.parse(
    await fs.readFile('./data/repos.json', 'utf8')
  );

  // Merge repos from both sources and remove duplicates
  const mergedData = apiData.concat(localData);

  // Filter out repos where fork property is false
  const filteredData = mergedData.filter((repo) => !repo.fork);

  res.json({ data: filteredData });
});
