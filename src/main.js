import './app.css'
import App from './App.svelte'
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
const app = new App({
  target: document.getElementById('app')
})

export default app
