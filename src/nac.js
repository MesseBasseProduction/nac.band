import './nac.scss';


class NAC {


	constructor(lang) {
		console.log('Hello, fellow geek! Stay in touch with us at messe-basse-production.com if you have any project that needs a hand.');
		this._lang = lang || 'fr';
		this._activeTrack = 'Dystopie';
		this._audio = new Audio(`/assets/audio/${this._activeTrack}Extract.mp3`);
		this._handlePlayback();
		this._handleClick();
	}


	_handlePlayback() {
		const button = document.getElementById('play-pause');
		button.src = '/assets/img/play.svg';

		const progressTrack = document.getElementById('progress-bar');
		const progress = document.getElementById('current-progress');
		let playing = false;

		button.addEventListener('click', () => {
			if (playing === true) {
				playing = false;
				button.src = '/assets/img/play.svg';
				this._audio.pause();
			} else {
				playing = true;
				button.src = '/assets/img/pause.svg';
				this._audio.play();
			}
		});

		this._audio.addEventListener('timeupdate', () => {
			progress.style.width = `${(this._audio.currentTime / this._audio.duration) * 100}%`;
		});

		this._audio.addEventListener('ended', () => {
			this._audio.currentTime = 0;
			progress.style.width = '0';
			button.src = '/assets/img/play.svg';
			playing = false;
		});

		progressTrack.addEventListener('click', event => {
			if (playing === true) {
				const box = progressTrack.getBoundingClientRect();
				this._audio.currentTime = ((event.clientX - box.left) / box.width) * this._audio.duration;
				progress.style.width = `${(this._audio.currentTime / this._audio.duration) * 100}%`;
			}
		});
	}


	_handleClick() {
		const composer = { fr: 'Compositeur', en: 'Composer' };
		const author = { fr: 'Auteur', en: 'Author' };
		const tracks = ['Dystopie', 'Crad', 'Tramp'];
		const times = ['46:30', '6:48', '6:43'];
		const tracklist = [
			`<h3>1. Crad' Bar Boogie – 6:48</h3><p><i>${composer[this._lang]}</i> : Pierre Toïgo<br><i>${author[this._lang]}</i> : David Béché</p><h3>2. Bad Dreams – 6:08</h3><p><i>${composer[this._lang]}</i> : Pierre Toïgo<br><i>${author[this._lang]}</i> : David Béché, Philippe Dromard</p><h3>3. Dystopie – 6:12</h3><p><i>${composer[this._lang]}</i> : Philippe Dromard, Pierre Toïgo<br><i>${author[this._lang]}</i> : Arthur Beaulieu</p><h3>4. Nature Humaine – 6:03</h3><p><i>${composer[this._lang]}</i> : Lionel Baudet, Pierre Toïgo<br><i>${author[this._lang]}</i> : Arthur Beaulieu, Lionel Baudet</p><h3>5. Amor Ciego – 6:23</h3><p><i>${composer[this._lang]}</i> : Lionel Baudet, Pierre Toïgo<br><i>${author[this._lang]}</i> : David Béché</p><h3>6. Tramp – 6:43</h3><p><i>${composer[this._lang]}</i> : Arthur Beaulieu, Pierre Toïgo<br><i>${author[this._lang]}</i> : David Béché</p><h3>7. Résilience (feat. Tom) – 8:09</h3><p><i>${composer[this._lang]}</i> : Pierre Toïgo<br><i>${author[this._lang]}</i> : David Béché</p> `,
			`<h3>1. Crad' Bar Boogie – 6:48</h3><p><i>${composer[this._lang]}</i> : Pierre Toïgo<br><i>${author[this._lang]}</i> : David Béché</p><h3>`,
			`<h3>1. Tramp – 6:43</h3><p><i>${composer[this._lang]}</i> : Arthur Beaulieu, Pierre Toïgo<br><i>${author[this._lang]}</i> : David Béché</p>`
		];
		const titles = ['Dystopie', 'Crad\' Bar Boogie', 'Tramp'];
		const spotify = ['44p4oWCfMZKX9HJt64ncoj', '4zeFpm6v6E2nuCBMSCFL8d', '4DCYfTa2gWMaBvP6qNBEti'];
		const apple = ['dystopie/1588780184', 'crad-bar-boogie/1588777286?i=1588777287', 'tramp-single/1588181001'];
		const amazon = ['B09HRC1LJS', 'B09HRB5D81', 'B09HJTR29N'];
		//const pandora = ['', '', ''];
		const tidal = ['200014684', '200014704', '199407447'];
		const deezer = ['263543602', '263542232', '262556472'];
		const youtube = ['v=c8WVsM9SDgc&list=PLp5D05IpZHwLKjS1HYOAMvtdc3rFaLFze', 'v=c8WVsM9SDgc', 'v=CsxhdwfJVyk'];
		const discogs = ['20399056-NAC-Dystopie', '20398864-NAC-Crad-Bar-Boogie', '20398474-NAC-Tramp'];
		const musicbrainz = ['39049941-c348-4aeb-b86b-a5af7093d3ea', '3921323e-d906-47fe-bc17-e5d359cc4ea3', '0c82ec60-852a-4c23-bc7b-2a4377f82702'];
		const genius = ['Dystopie', 'Crad-bar-boogie-single', 'Tramp-single'];
		const bandcamp = ['dystopie', 'crad-bar-boogie-single', 'tramp-single-2'];
		const dates = {
			fr: ['9 Novembre 2021', '31 Octobre 2021', '15 Octobre 2021'],
			en: ['November 9, 2021', 'October 31, 2021', 'October 15, 2021']
		};

		const updateUI = arrayIndex => {
			document.getElementById('release-background').classList.remove(this._activeTrack.toLowerCase());
			document.getElementById('release-background-bottom').classList.remove(this._activeTrack.toLowerCase());
			this._audio.pause();
			this._audio.currentTime = 0;
			this._activeTrack = tracks[arrayIndex];
			document.getElementById('release-background').classList.add(this._activeTrack.toLowerCase());
			document.getElementById('release-background-bottom').classList.add(this._activeTrack.toLowerCase());
			document.getElementById('release-cover').src = `/assets/img/${this._activeTrack}.webp`;
			document.getElementById('release-duration').innerHTML = times[arrayIndex];
			document.getElementById('release-title').innerHTML = titles[arrayIndex];
			document.getElementById('release-date').innerHTML = dates[this._lang][arrayIndex];
			document.getElementById('release-tracklist').innerHTML = tracklist[arrayIndex];
			document.getElementById('spotify').href = `https://open.spotify.com/album/${spotify[arrayIndex]}`;
			document.getElementById('apple').href = `https://music.apple.com/us/album/${apple[arrayIndex]}`;
			document.getElementById('amazon').href = `https://music.amazon.fr/albums/${amazon[arrayIndex]}`;
			document.getElementById('deezer').href = `https://www.deezer.com/fr/album/${deezer[arrayIndex]}`;
			document.getElementById('youtube').href = `https://www.youtube.com/watch?${youtube[arrayIndex]}`;
			document.getElementById('bandcamp').href = `https://nacband.bandcamp.com/album/${bandcamp[arrayIndex]}`;
			this._audio = new Audio(`/assets/audio/${this._activeTrack}Extract.mp3`);
			this._handlePlayback();
		};

		let index = 0;
		document.getElementById('release-previous').addEventListener('click', e => {
			e.target.blur();
			index = (3 + index - 1) % 3;
			updateUI(index);
		});

		document.getElementById('release-next').addEventListener('click', e => {
			e.target.blur();
			index = (index + 1) % 3;
			updateUI(index);
		});
		// Modal handling
		const overlay = document.getElementById('modal-overlay');
		document.getElementById('modal-overlay').addEventListener('click', () => {
			overlay.style.opacity = 0;
			setTimeout(() => {
				overlay.innerHTML = '';
				overlay.style.display = 'none';
			}, 400);
		});

		document.getElementById('see-more-links').addEventListener('click', () => {
			fetch('/assets/html/seemoremodal.html').then(data => {
				overlay.style.display = 'flex';
				data.text().then(htmlString => {
					overlay.appendChild(document.createRange().createContextualFragment(htmlString));
					document.getElementById('tidal').href = `https://listen.tidal.com/album/${tidal[index]}`;
					//document.getElementById('pandora').href = `https://nacband.bandcamp.com/album/${pandora[index]}`;
					document.getElementById('discogs').href = `https://www.discogs.com/release/${discogs[index]}`;
					document.getElementById('musicbrainz').href = `https://musicbrainz.org/release/${musicbrainz[index]}`;
					document.getElementById('genius').href = `https://genius.com/albums/Nac-fra/${genius[index]}`;
					requestAnimationFrame(() => overlay.style.opacity = 1);
				});
			}).catch(e => console.error(e) );
		});
	}


}


export default NAC;
