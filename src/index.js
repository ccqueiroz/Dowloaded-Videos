import fs from 'fs';
import axios from 'axios';
import { main } from './server/index.js';
import path from 'path';
import {fileURLToPath} from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
let jsonDataBase = fs.readFileSync(`${__dirName}/dataBase/data.json`, "utf8");
let data = JSON.parse(jsonDataBase);

main({ data, fs, axios });

