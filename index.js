document.getElementById('homepage');
const content = document.querySelector('.content');
const modalOverlay = document.querySelector('.overlay');
const modalForm = document.querySelector('form'); //находим форму
const modalBtn = modalForm.querySelector('button'); //находим кнопку отправки формы
const modalCloseBtn = document.querySelector('.close__modal'); //Кнопка закрытия модалки

// // -------------Добавление одного кота------------------
const btnAddCat = document.querySelector('.add__cat');

btnAddCat.addEventListener('click', () => {
	modalOverlay.classList.add('active');
		modalBtn.addEventListener('click', (e) => {
			modalForm.addEventListener('submit', (event) => { // вешаем обработчик на кнопку формы 
				e.preventDefault();
				const formData = new FormData(modalForm); //получаем данные формы 
				const cat = Object.fromEntries(formData); //вытаскиваем объект с данными для отправки 
				api.addCat(cat).then((res) => { 
				refreshCatsAndContent();
				modalForm.reset(); //очистка полей формы 
				modalOverlay.classList.remove('active'); //делаем модалку неактивной 
			}); 
		});
	});
})

// Отрисовка и обновление карточек
const refreshCatsAndContent = () => {
    content.innerHTML = '';
    api.getAllCats().then(res => {
		console.log(res);
        // const cards = res.reduce((acc, el) => (acc += generateCard(el)), '');
        // content.insertAdjacentHTML('afterbegin', cards);
        res.forEach(element => {
			console.log(element);
			console.log(element.image);
            content.insertAdjacentHTML('afterbegin', generateCard(element));
        });
    });
};
refreshCatsAndContent();
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
		if (event.target.tagName === 'BUTTON') {
			
			switch (event.target.className) {
				case 'cat-card-view':
					api.getCatById(event.target.value).then((res) => {
						openCatCardPopup(res);
					});
				break;
				case 'cat-card-update': 
				modalOverlay.classList.add('active');
					const idCat = event.target.value; //находим id 
					console.log(idCat);
					// modalForm = document.querySelector('form'); 
					// modalBtn = modalForm.querySelector('button'); 
					// modalBtn.addEventListener('click', (idCat) => {
					// 	const forms = document.forms[0]; 
					// 	forms.addEventListener('submit', (event) => { 
					// 		e.preventDefault();
					// 		const formData = new FormData(forms); 
					// 		const cat = Object.fromEntries(formData); 
					// 		api.updateCat(cat).then((res) => { 
					// 			// console.log(res);
					// 			refreshCatsAndContent();
					// 			modalOverlay.classList.toggle('active'); 
					// 			forms.reset();
					// 		}); 
					// });
				// });
					break;
				case 'cat-card-delete': 
						api.deleteCat(event.target.value).then((res) => {
							// console.log(res);
							refreshCatsAndContent();
						});
					break;
				default: break;
			}
			// // переписать на switch
			// if (event.target.className === 'cat-card-view') {
			// } else if (event.target.className === 'cat-card-update') {
            //     document.querySelector('.overlay').classList.add('overlay_active');
			// } else if (event.target.className === 'cat-card-delete') {
			// 	api.deleteCat(event.target.value).then((res) => {
			// 		console.log(res);
			// 		refreshCatsAndContent();
			// 	});
			// }
		}
	});
// -------------------------------
// Закрытие модалки на кпоку
modalCloseBtn.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
})

// -------------------------------
// -------------Отправка формы------------------
const form = document.querySelector('.modal_form');
form.addEventListener('submit', (event) => {
	event.preventDefault();
	//console.log(event.target);

	const formData = new FormData(form);
	const data = Object.fromEntries(formData);
	// console.log(data);
	//api.updateCat('[{"id": 3,"name": "Кот в сапогах 34"}]');
    // api.addCat() с использованием getNewIdOfCat
    api.updateCat(data); //с использованием getNewIdOfCat
	refreshCatsAndContent();
});

const getNewIdOfCat = () => {
	return api.getIdsOfCat().then((res) => {
		return Math.max(...res) + 1;
	});
};

getNewIdOfCat().then((res) => {
	// console.log(res);
});





