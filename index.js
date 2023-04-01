let store = window.localStorage; 
const content = document.querySelector('.content');
const modalOverlay = document.querySelector('.overlay');
const modalForm = document.querySelector('form'); 
const modalBtn = modalForm.querySelector('button'); 
const modalCloseBtn = document.querySelector('.close__modal'); 
const btnAddCat = document.querySelector('.add__cat');
let addEventCat = 0;

//---------- Отрисовка и обновление карточек
const refreshCatsAndContent = () => {
    content.innerHTML = '';
    api.getAllCats().then(res => {
		store.setItem('cats', JSON.stringify(res));
		const cards = JSON.parse(store.getItem('cats'));
        // const cards = res.reduce((acc, el) => (acc += generateCard(el)), '');
        // content.insertAdjacentHTML('afterbegin', cards);
        res.forEach(element => {
        content.insertAdjacentHTML('afterbegin', generateCard(element));
        });
    });
};

refreshCatsAndContent();

const refreshCardsLocalStorage = () => {
	content.innerHTML = '';
	const cards = JSON.parse(store.getItem('cats'));
	cards.forEach(element => {
        content.insertAdjacentHTML('afterbegin', generateCard(element));
    });
};

//-------------Добавление одного кота------------------
btnAddCat.addEventListener('click', () => {
	addEventCat = 1;
	document.querySelector('.disabled').readOnly = false;
	modalOverlay.classList.add('active');
	if (addEventCat === 1) {
		modalForm.addEventListener('submit', (event) => { 
			
				event.preventDefault();
				const formData = new FormData(modalForm); 
				const cat = Object.fromEntries(formData); 
				api.addCat(cat).then(() => { 
				modalOverlay.classList.remove('active');
				addCatLocalStorage(cat);
				refreshCardsLocalStorage(); 
				})
			modalForm.reset();
			addEventCat = 0;		
						
		});
	}
})

// ----------------Просмотр одного кота---------------
const openCatCardPopup = (cat) => {
	content.insertAdjacentHTML('afterbegin', generateCatCardPopup(cat));
	let catPopup = document.querySelector('.popup-wrapper-cat-card');
	let closeCatPopup = document.querySelector('.popup-close-cat-card');
	closeCatPopup.addEventListener('click', () => {
		catPopup.remove();
	});
};

// --------------Обработка кликов на кнопоки карточек-----------------
content.addEventListener('click', (event) => {
	const idCat = event.target.value;
	console.log(idCat);
		if (event.target.tagName === 'BUTTON') {
			switch (event.target.className) {
				case 'cat-card-view':
					api.getCatById(idCat).then((res) => {
						openCatCardPopup(res);
					});
				break;
				case 'cat-card-update': 
					modalOverlay.classList.add('active');
					api.getCatById(idCat).then((res) => {
						document.querySelector('.disabled').readOnly = true;
						let form_elem = modalForm.getElementsByTagName("input");
						for (let index = 0; index < form_elem.length; index++) {
							Object.entries(res).forEach(([key, value]) => {
								if (form_elem[index].name == key) {
									form_elem[index].value = value;
								}
							})
						}
					});					
					modalForm.addEventListener('submit', (event) => {
						console.log('cat-card-update');
						event.preventDefault();
						const formData = new FormData(modalForm); 
						const cat = Object.fromEntries(formData); 
						api.updateCat(cat).then((res) => { 							
							deleteCatLocalStorage(idCat);
							addCatLocalStorage(cat);
							refreshCardsLocalStorage();
							console.log('updateCat');							
						}); 
						modalOverlay.classList.remove('active');
						modalForm.reset();
					});
				break;
				case 'cat-card-delete': 
						api.deleteCat(idCat).then((res) => {
							deleteCatLocalStorage(idCat);
							refreshCardsLocalStorage();
						});
				break;
				default: break;
			}
		}
	});
// -------------------------------
// Закрытие модалки на кпоку
modalCloseBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
	modalForm.reset();	
	addEventCat = 0;
})
// ------------------------------------------------

const addCatLocalStorage = (cat) => {
	store.setItem('cats', JSON.stringify([...JSON.parse(store.getItem('cats')), cat]));
};

const deleteCatLocalStorage = (catId) => {
	store.setItem('cats',JSON.stringify(JSON.parse(store.getItem('cats')).filter((el) => el.id != catId)));
};





