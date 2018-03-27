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

$('.column-container').on('DOMSubtreeModified', '.card', function() {
    console.log('modified');
});

function initSortable() {
    $('.card-list').sortable({
        connectWith: '.card-list',
        placeholder: 'card-placeholder',
        // get col_id here ?
        //change: function(event, ui) {
        //    console.log(event);
        //    console.log(ui.item);
        //    console.log(event.target.parentNode);
        //}
    }).disableSelection();
}
