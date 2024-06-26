import './components/mainPage/mainPagePadre';
import './components/profilePage/profilePadre';
import './screens/exportscreens';
import dashboard from './screens/dashboard';
import styles from './abuelo.css';
import { AppState } from './types/store';
import { addObserver, appState } from './store/index';
import './components/LoginPage/LoginPadre';


class appContainer extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = '';
			const csscardfollow = this.ownerDocument.createElement('style');
			csscardfollow.innerHTML = styles;
			this.shadowRoot?.appendChild(csscardfollow);

			switch (appState.screen) {
				case PANTALLAS.DASHBOARD:
					const pantallaprincipal = this.ownerDocument.createElement('create-dashbard') as dashboard;

					this.shadowRoot.appendChild(pantallaprincipal);
					break;
			
				default:
					break;
			}
		}
	}
}

window.customElements.define('app-container', appContainer);
