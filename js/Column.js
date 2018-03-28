function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || "Bez nazwy";
	this.element = createColumn();

	function createColumn() {
		// TWORZENIE NOWYCH WĘZŁÓW
		var column = $('<div class="column"></div>').attr('id', self.id);
		var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
		var columnCardList = $('<ul class="card-list"></ul>');
		var columnDelete = $('<button class="btn-delete">x</button>');
        var columnRename = $('<button class="btn-rename">e</button>');
		var columnAddCard =
            $('<button class="column-add-card">Dodaj kartę</button>');

		// PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
		columnDelete.click(function() {
			self.deleteColumn();
		});

        columnRename.click(function() {
            var newName = prompt("Wpisz nową nazwę");
            if (newName == '') {
                return alert("Nazwa kolumny nie może być pusta");
            }
            event.preventDefault();
            $.ajax({
                url: baseUrl + '/column/' + self.id,
                method: 'PUT',
                data: {
                    name: newName
                },
                success: function() {
                    self.name = newName;
                    columnTitle.text(self.name);
                }
            });
        });

		columnAddCard.click(function(event) {
            var cardName = prompt("Wpisz nazwę karty");
			event.preventDefault();
            $.ajax({
                url: baseUrl + '/card',
                method: 'POST',
                data: {
                    name: cardName,
                    bootcamp_kanban_column_id: self.id
                },
                success: function(response) {
                    var card = new Card(response.id, cardName, self.id);
                    self.createCard(card);
                }
            });
		});

			// KONSTRUOWANIE ELEMENTU KOLUMNY
		column.append(columnTitle)
			.append(columnDelete)
			.append(columnAddCard)
            .append(columnRename)
			.append(columnCardList);
			return column;
		}
	}
Column.prototype = {
	createCard: function(card) {
	  this.element.children('ul').append(card.element);
	},
	deleteColumn: function() {
        var self = this;
        $.ajax({
            url: baseUrl + '/column/' + self.id,
            method: 'DELETE',
            success: function(response) {
                self.element.remove();
            }
        });
	}
};
