var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
	.click(function() {
        var columnName = prompt('Wpisz nazwę kolumny');
        $.ajax({
            url: baseUrl + '/column',
            method: 'POST',
            data: {
                name: columnName
            },
            success: function(response) {
                var column = new Column(response.id, columnName);
                board.createColumn(column);
            }
        });
	});

//$('.column-container').on('DOMSubtreeModified', '.card', function() {
//    console.log('modified');
//});

function initSortable() {
    $('.card-list').sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder',
        // get col_id here ?
        stop: function(event, ui) {
            var id = ui.item[0].id;
            var name = ui.item[0].lastChild.innerText;
            var col_id = ui.item[0].offsetParent.id;
            moveCard(id, name, col_id);
        }
    }).disableSelection();
}

function moveCard(id, name, col_id) {
    var newColumnId = col_id;
    $.ajax({
        url: baseUrl + '/card/' + id,
        method: 'PUT',
        data: {
            name: name,
            bootcamp_kanban_column_id: newColumnId
        }
    });
}
