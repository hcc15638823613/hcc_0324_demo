import { message } from 'antd';

export const copyToClip = (content: string, tipString = '复制成功') => {
  const input = document.createElement('input');
  input.setAttribute('value', content);
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
  message.success(tipString);
};
