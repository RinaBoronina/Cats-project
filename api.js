// 1 GET https://cats.petiteweb.dev/api/single/:user/show - отобразить всех котиков
// 1 GET https://cats.petiteweb.dev/api/single/:user/ids - отобразить все возможные айди котиков
// 1 GET https://cats.petiteweb.dev/api/single/:user/show/:id  - отобразить конкретного котика
// 1 POST https://cats.petiteweb.dev/api/single/:user/add - добавить котика
// 1 PUT https://cats.petiteweb.dev/api/single/:user/update/:id - изменить информацию о котике
// 0 DELETE  https://cats.petiteweb.dev/api/single/:user/delete/:id - удалить котика из базы данных

const config = {
	baseUrl: 'https://cats.petiteweb.dev/api/single/kalliacto/',
};

class Api {
	constructor(config) {
		this.baseUrl = config.baseUrl;
	}

	getAllCats = () => {
		return fetch(`${this.baseUrl}show`).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
	};

	addCat = (cat) => {
		return fetch(`${this.baseUrl}add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cat),
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
	};

	updateCat = (newCat) => {
		return fetch(`${this.baseUrl}update/${newCat.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCat),
		}).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
	};

    getAllCatsId = (cat) => {
		return fetch(`${this.baseUrl}ids`).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
	};
    

    getCatById = (id) => {
        return fetch(`${this.baseUrl}show/${id}`).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
    }

    deleteCat = (id) => {
        return fetch(`${this.baseUrl}delete/${id}`, {
            method: 'DELETE'
        }).then((res) => {
			return res.ok ? res.json() : Promise.reject('У меня лапки');
		});
    }
}

let api = new Api({
	baseUrl: 'https://cats.petiteweb.dev/api/single/kalliacto/',
});

// api
// 	.addCat({
// 		id: 4,
// 		name: 'Кот в сапогах 4',
// 		favorite: false,
// 		rate: 9,
// 		age: 10,
// 		description: 'Не тикой славный малый',
// 		image:
// 			'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.playground.ru%2Fmisc%2Fnews%2Fmultfilm_kot_v_sapogah_2_zarabotal_v_prokate_pochti_300_millionov_dollarov-1259784&psig=AOvVaw0oMYhSLv6IuPC4jPEsa_qf&ust=1679679358513000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCIDMu63L8v0CFQAAAAAdAAAAABAE',
// 	})
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((error) => {
// 		console.log(error);
// 	});

// 	getAllCatsId = (cat) => {
// 		return fetch(`${this.baseUrl}ids`).then((res) => {
// 			return res.ok ? res.json() : Promise.reject('У меня лапки');
// 		}).then((res) => console.log(res));
// 	};



