//CSS import
import './index.css';

//Library import
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';

// Component import
import App from './App.jsx';
import store from './Redux/store.js'

createRoot(document.getElementById('root')).render(
<Provider store={store}>

    <BrowserRouter >
        <Toaster />
        <App />

    </BrowserRouter>
</Provider>

)
