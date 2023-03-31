const generateCard = (cat) => {
	return `
        <div class="cat-card">
        <i class="fa-solid fa-heart card__like"></i>
            <div class="image_card" >
                <img src=${cat.image} /> 
            </div>
            <div class="card_title">Меня зовут: ${cat.name}</div>
            <div class="card_rate">Возраст: ${cat.rate} </div>
            <div class="cat-card-btns">
                <button class="cat-card-view" value=${cat.id}>Посмотреть</button>
                <button class="cat-card-update" value=${cat.id}>Изменить</button> 
                <button class="cat-card-delete" value=${cat.id}>Удалить</button>
            </div>
        </div>
    `;
};
