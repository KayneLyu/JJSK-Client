import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
