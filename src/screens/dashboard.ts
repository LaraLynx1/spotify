import './components/export';
import { Cancion } from '../types/Cancion.type';
import { CancionForm } from '../types/CancionForm.type';
import { addCancion, deleteCancion, getCanciones } from '../utils/firebase';
import Crearcancion from '../components/cancion/cancion';
import { datacosas } from '../components/cancion/cancion';

const formData: CancionForm = {
	image: 'string',
	title: 'string',
	author: 'string',
	album: 'string',
	createdAt: 'string',
	duracion: 'string',
};

class dashboard extends HTMLElement {
	cancion!: Crearcancion;
	canciones: Cancion[] = [];

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	async render() {
		this.shadowRoot!.innerHTML = '';
		const title = this.ownerDocument.createElement('h1');
		title.innerText = 'Añade Cancion';
		this.shadowRoot?.appendChild(title);

		const imageSong = this.ownerDocument.createElement('input');
		imageSong.placeholder = 'portada de la cancion';
		imageSong.addEventListener('change', this.changeimage);
		this.shadowRoot?.appendChild(imageSong);

		const nameSong = this.ownerDocument.createElement('input');
		nameSong.placeholder = 'nombre de la cancion';
		nameSong.addEventListener('change', this.changeTitle);
		this.shadowRoot?.appendChild(nameSong);

		const author = this.ownerDocument.createElement('input');
		author.placeholder = 'Autor de la cancion';
		author.addEventListener('change', this.changeAuthor);
		this.shadowRoot?.appendChild(author);

		const album = this.ownerDocument.createElement('input');
		album.placeholder = 'Album de la cancion';
		album.addEventListener('change', this.changeAlbum);
		this.shadowRoot?.appendChild(album);

		const fecha = this.ownerDocument.createElement('input');
		fecha.placeholder = 'Fcha de agregado';
		fecha.addEventListener('change', this.changeFecha);
		this.shadowRoot?.appendChild(fecha);

		const duracion = this.ownerDocument.createElement('input');
		duracion.placeholder = 'Duracion de la cancion';
		duracion.addEventListener('change', this.changeDuracion);
		this.shadowRoot?.appendChild(duracion);

		const save = this.ownerDocument.createElement('button');
		save.innerText = 'Guardar';
		save.addEventListener('click', async () => {
			console.log('Datos Formulario', formData);
			await addCancion(formData);
			this.canciones = await getCanciones();
			this.render();
		});
		this.shadowRoot?.appendChild(save);

		const refresh = this.ownerDocument.createElement('button');
		refresh.innerText = 'refreash';
		refresh.addEventListener('click', async () => {
			this.canciones = await getCanciones();
			this.render();
		});
		this.shadowRoot?.appendChild(refresh);

		this.canciones.forEach((cancion: Cancion) => {
			console.log('aqui', cancion.title);
			const container = this.ownerDocument.createElement('section');

			this.cancion = this.ownerDocument.createElement('crear-cancion') as Crearcancion;
			this.cancion.setAttribute(datacosas.image, cancion.image);
			this.cancion.setAttribute(datacosas.titulo, cancion.title);
			this.cancion.setAttribute(datacosas.autor, cancion.author);
			this.cancion.setAttribute(datacosas.album, cancion.album);
			this.cancion.setAttribute(datacosas.date, cancion.createdAt);
			this.cancion.setAttribute(datacosas.duration, cancion.duracion);

			const eliminar = this.ownerDocument.createElement('button');
			eliminar.innerText = 'Eliminar';
			eliminar.setAttribute('data-id', cancion.id);

			eliminar.addEventListener('click', async (e: any) => {
				const id = e.target.getAttribute('data-id');
				console.log('eliminar', id);

				/* await this.canciones.splice(
					this.canciones.findIndex((cancion) => cancion.id === id),
					1
				); */

				await deleteCancion(id);
				this.canciones = await getCanciones();

				this.render();
			});

			const modificar = this.ownerDocument.createElement('button');
			modificar.innerText = 'Modificar';
			modificar.setAttribute('data-id', cancion.id);
			modificar.addEventListener('click', async (e: any) => {
				const id = e.target.getAttribute('data-id');
				console.log('modificar', id);
			});

			container.appendChild(this.cancion);
			container.appendChild(eliminar);
			container.appendChild(modificar);
			this.shadowRoot?.appendChild(container);
			console.log('xxx', container);
		});
	}

	submitForm(e: any) {}
	changeimage(e: any) {
		formData.image = e?.target?.value;
	}

	changeTitle(e: any) {
		formData.title = e?.target?.value;
	}

	changeAlbum(e: any) {
		formData.album = e?.target?.value;
	}

	changeAuthor(e: any) {
		formData.author = e?.target?.value;
	}

	changeFecha(e: any) {
		formData.createdAt = e?.target?.value;
	}

	changeDuracion(e: any) {
		formData.duracion = e?.target?.value;
	}
}

customElements.define('create-dashboard', dashboard);
export default dashboard;
