import ReactDOM from 'react-dom/client';
import './index.css';
import './fonts/fonts.css';
import './components/ui/common.css';
import './components/ui/box.css';
import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App />);
