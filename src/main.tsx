import React from 'react';
import { createRoot } from 'react-dom/client';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import App from './App';
import './samples/node-api';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
