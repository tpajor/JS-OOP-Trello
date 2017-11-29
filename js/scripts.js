$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }
    $('.create-board').click(function(event) {
        kanban.addBoard(new Board(prompt("Enter the name of the board")));
    });
    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();
    
        function createColumn() {
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function(event) {
                self.addCard(new Card(prompt("Enter the name of the card")));
            });
            $column.append($columnTitle)
                .append($columnDelete)
                .append($columnAddCard)
                .append($columnCardList);
            return $column;
        }
    }
    Column.prototype = {
        addCard: function(card) {
          this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
          this.$element.remove();
        }
    };
    
    function Card(description) {
        var self = this;
        this.id = randomString();
        this.description = description;
        this.$element = createCard();
        function createCard() {
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete').text('x');
            $cardDelete.click(function(){
                self.removeCard();
            });
            $card.append($cardDelete)
            .append($cardDescription);
            return $card;
        }
    }
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    };
    
    function Board(boardName) {
        var self = this;
        this.id = randomString();
        this.name = boardName;
        this.$element = createBoard();
        function createBoard() {
            var $board = $('<div>').addClass('board');
            var $boardTitle = $('<h1>').addClass('board-title').text(self.name);
            var $boardAddColumn = $('<button>').addClass('create-column').text('Create a column');
            var $boardDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnContainer = $('<div>').addClass('column-container');
            $boardDelete.click(function() {
                self.removeBoard();
            });
            $boardAddColumn.click(function(event) {
                self.addColumn(new Column(prompt("Enter the name of the column")));
            });
            $board.append($boardTitle)
                .append($boardAddColumn)
                .append($boardDelete)
                .append($columnContainer);
            return $board;
        }
    }
    Board.prototype = {
        addColumn: function(column) {
            this.$element.append(column.$element);
            initSortable();
        },
        removeBoard: function() {
          this.$element.remove();
        }
    };

    var kanban = {
        name: 'kanban container',
        addBoard: function(board) {
            this.$element.append(board.$element);
        },
        $element: $('#kanban .board-container')
    };

    function initSortable() {
        $('.column-card-list').sortable({
          connectWith: '.column-card-list',
          placeholder: 'card-placeholder'
        }).disableSelection();
      }
})

