import axios from 'axios';
import { useRequest } from 'ahooks';

const isX64 = () => {
  return navigator.userAgent.includes('WOW64') || navigator.userAgent.includes('Win64');
};

const getDownloadUrl = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_OSS_URL}/client/update.json`);
  const versionInfo = await axios.get(`${import.meta.env.VITE_OSS_URL}/client/${data.version}/update.json`);
  const { x86, x64 } = versionInfo.data;
  return `${import.meta.env.VITE_OSS_URL}/${isX64() ? x64 : x86}`;
};

const useDownload = () => {
  const { data } = useRequest(getDownloadUrl);
  return data;
};

export default useDownload;
