const generateCard = (cat) => {
	return `
        <div class="cat-card">
        <i class="fa-heart card__like ${cat.favorite ? 'fa-solid' : 'fa-regular'}"></i>
            <div class="image_card" >
                <img src=${cat.image !== '' ? cat.image : defaultImg} /> 
            </div>
            <div class="card_title">Меня зовут: ${cat.name}</div>
            <div class="card_rate">Возраст: ${cat.age} </div>
            <div class="cat-card-btns">
                <button class="cat-card-view" value=${cat.id}>Посмотреть</button>
                <button class="cat-card-update" value=${cat.id}>Изменить</button> 
                <button class="cat-card-delete" value=${cat.id}>Удалить</button>
            </div>
        </div>
    `;
};

