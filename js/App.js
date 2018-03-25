var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeader = {
    'X-Client-Id': '3046',
    'X-Auth-Token': '7d85e8648ed3b7f5f9819f88d8b8482d'
};

$.ajaxSetup({
    headers: myHeader
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
        setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function(column) {
        var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });
}

function setupCards(col, cards) {
    cards.forEach(function(card) {
        var cardObj =
            new Card(card.id, card.name, card.bootcamp_kanban_column_id);
        col.createCard(cardObj);
    });
}
