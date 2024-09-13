import moment from 'moment';

const fileFormat = (url = '') => {
  const fileEx = url.split('.').pop();

  if (fileEx === 'mp4' || fileEx === 'webm' || fileEx === 'ogg') {
    return 'video';
  }
  if (fileEx === 'mp3' || fileEx === 'wav') {
    return 'audio';
  }
  if (
    fileEx === 'png' ||
    fileEx === 'jpg' ||
    fileEx === 'jpeg' ||
    fileEx === 'gif'
  ) {
    return 'image';
  }

  return 'file';
};

const transformImage = (url = '', width = 100) => {
  const newUrl = url.replace('upload/', `upload/dpr_auto/w_${width}/`);
  return newUrl;
};

export const getLast7Days = () => {
  const currentDate = moment();

  const last7Days = [];

  for (let i = 0; i < 7; i++) {
    const dayDate = currentDate.clone().subtract(i, 'days');
    const dayName = dayDate.format('dddd');
    last7Days.unshift(dayName);
  }
  return last7Days;
};

const getOrSaveFromStorage = ({ key, value, get }) => {
  const storage = localStorage.getItem(key);
  if (get) return storage ? JSON.parse(storage) : null;
  else localStorage.setItem(key, JSON.stringify(value));
};

export { fileFormat, transformImage, getOrSaveFromStorage };
