import styles from './listarcanciones.css';
export enum datacosas {
	'image' = 'image',
	'titulo' = 'titulo',
	'autor' = 'autor',
	'album' = 'album',
	'date' = 'date',
	'duration' = 'duration',
}

class Listarcancion extends HTMLElement {
	image?: string;
	titulo?: string;
	autor?: string;
	album?: string;
	date?: string;
	duration?: string;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	static get observedAttributes() {
		const fijateEn: Record<datacosas, null> = {
			image: null,
			titulo: null,
			autor: null,
			album: null,
			date: null,
			duration: null,
		};
		return Object.keys(fijateEn);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(attrName: datacosas, oldVal: any, newVal: any) {
		switch (attrName) {
			default:
				this[attrName] = newVal;
				break;
		}
	}

	render() {
		if (this.shadowRoot) {
			const wrapper = this.ownerDocument.createElement('div');
			wrapper.className = 'wrapper';

			const imagenCancion = this.ownerDocument.createElement('img');
			imagenCancion.setAttribute('src', `${this.image}`);
			wrapper.appendChild(imagenCancion);

			const tituloCancion = this.ownerDocument.createElement('h3');
			tituloCancion.innerText = this.titulo!;
			wrapper.appendChild(tituloCancion);

			const autorCancion = this.ownerDocument.createElement('h3');
			autorCancion.innerText = this.autor!;
			wrapper.appendChild(autorCancion);

			const albumCancion = this.ownerDocument.createElement('h3');
			albumCancion.innerText = this.album!;
			wrapper.appendChild(albumCancion);

			const dateCancion = this.ownerDocument.createElement('h3');
			dateCancion.innerText = this.date!;
			wrapper.appendChild(dateCancion);

			const duracionCancion = this.ownerDocument.createElement('h3');
			duracionCancion.innerText = this.duration!;
			wrapper.appendChild(duracionCancion);

			this.shadowRoot.appendChild(wrapper);
		}
		const cssprofile = this.ownerDocument.createElement('style');
		cssprofile.innerHTML = styles;
		this.shadowRoot?.appendChild(cssprofile);
	}
}

window.customElements.define('listar-cancion', Listarcancion);

export default Listarcancion;
