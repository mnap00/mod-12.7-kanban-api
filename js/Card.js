// KLASA KANBAN CARD
function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || "Bez nazwy";
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card"></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardRename = $('<button class="btn-rename">e</button>');
		var cardDescription = $('<p class="card-description"></p>');

		cardDeleteBtn.click(function() {
			self.removeCard();
		});

        cardRename.click(function() {
            var newDescription = prompt("Wpisz nową nazwę");
            if (newDescription == '') {
                return alert("Karta nie może być pusta");
            }
            event.preventDefault();
            console.log(newDescription);
            $.ajax({
                url: baseUrl + '/card/' + self.id,
                method: 'PUT',
                data: {
                    name: newDescription
                },
                success: function() {
                    console.log('done');
                    self.name = newDescription;
                    cardDescription.text(self.name);
                }
            });
        });

		card.append(cardDeleteBtn);
		card.append(cardRename);
		cardDescription.text(self.name);
		card.append(cardDescription);
		return card;
	}
}
Card.prototype = {
	removeCard: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/card/' + self.id,
            method: 'DELETE',
            success: function() {
                self.element.remove();
            }
        });
	}
};
