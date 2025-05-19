
// Import A-Frame first - it needs to be available globally before other imports
import 'aframe';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);
