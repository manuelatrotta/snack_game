alert('play with snake');
//variabili in canvas
var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var grid = 16;
var count = 0;

var snake = {
  x: 160,
  y: 160,

  //la velocità del serpente sarà di un'unità della griglia considerando la direzione sugli assi x e y
  dx: grid,
  dy: 0,

  // variabile che tiene conteggio di tutte le griglie occupate dal serpente
  cells: [],

  // lunghezza del serpente che poi aumenta mangiando le mele
  maxCells: 4
};
//variabile mela
var apple = {
  x: 320,
  y: 320
};

////////////////////FUNCTIONS

// funzione che prende un numero random nel range min max richiesto
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// game loop
function loop() {
  requestAnimationFrame(loop);

  // modalità gioco velocità ridotta di un quarto
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);

  // movimento serpente lungo x o y // posizione del momento snack.x + una griglia su x o y
  snake.x += snake.dx;
  snake.y += snake.dy;

  // movimento orizzontale sullo schermo
  // se la posizione su x è minore di 0 allora la posizione sarà larghezza dell'area di gioco - una griglia. Idem su y
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  // identico ragionamento lungo asse y quindi movimento in verticale
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // si tiene in considerazione la posizione del serpente e la testa è sempre il punto di partenza inizio array
  //unshift aggiunge uno o più elementi all'inizio di un array e restitusce la nuova lunghezza dell'array stesso.
  snake.cells.unshift({x: snake.x, y: snake.y});

  // se la lunghezza delle celle è maggiore alla lunghezza massima del serpente allora elimino pop l'ultimo elemento dell'array
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // impostazione mela mediante context
  //fillRect disegna un rettangolo "riempito". Il colore predefinito del riempimento è nero, con fillstyle modifico colore
    context.fillStyle = 'red';
    context.fillRect(apple.x, apple.y, grid-1, grid-1);

  // impostazione per il serpente la cui lunghezza aumenta di una cella
    context.fillStyle = 'green';
    snake.cells.forEach(function(cell, index) {

    // imposto che ci sia 1 pixel tra una cella e l'altra del serpente
    context.fillRect(cell.x, cell.y, grid-1, grid-1);

    // se il serpente mangia una cella ovvero se la la testa e la coda sono identiche alla mela allora aumenta la lunghezza del serpente con incremento di una cella
    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;

      // la mela può essere posizionata randomicamente tra 0 e 30 numero di celle presenti in un canvas di 480*480 con dimensione 16
      apple.x = getRandomInt(0, 30) * grid;
      apple.y = getRandomInt(0, 30) * grid;
    }

    // bisogna controllare la lunghezza del serpente
    for (var i = index + 1; i < snake.cells.length; i++) {

      // se il serpente occupa lo stesso spazio della sua lunghezza il gioco ricomincia. Si resettano le impostazioni iniziali del serpente:
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;
        //si resetta posizione della mela
        apple.x = getRandomInt(0, 30) * grid;
        apple.y = getRandomInt(0, 30) * grid;
      }
    }
  });
}

      // movimento del serpente avviene tramite tastiera con e.which corrispondente alle freccie
      //37 freccia sinistra, 38 freccia verso l'alto, 39 freccia verso destra, 40 freccia verso il basso
document.addEventListener('keydown', function(e) {
//eventi in keydown ovvero al press delle freccie

  // freccia sinistra movimento su x di - 1 griglia
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // freccia verso l'alto movimento su y di meno una cella
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // freccia verso destra movimento avanti di una griglia lungo asse x
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // se viene usata la freccia verso giù movimento di una griglia su asse y
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});
