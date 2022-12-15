
// $('button').click(function(){
//     console.log($(this).closest('td').index())
// })
// function to return row index number after clicking
// var gameOn = true;
var playerOneName = prompt("Enter player One Name.");
var playerTwoName = prompt("Enter player Two Name.");
var playerOneColor = 'rgb(86, 151, 255)';
var playerTwoColor = 'rgb(237, 45, 73)';

// function to return row index number after clicking
function returnRowIndex(){
    $('tr').click(function(){
    rowIndex = $(this).index()
})
  return rowIndex
}
// function to return col index number after clicking
function returnColIndex(){
    $('td').click(function(){
    colIndex = $(this).index()
})
  return colIndex
}

// This is the path to reach CLICKED BUTTON'S COLOR.
// $('table').find('tr').eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color'))

// We can use this to both change and check the button's color.

function changeColor(rowIndex,colIndex,playerColor){
  return $('table').find('tr').eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',playerColor)
}

function checkColor(rowIndex,colIndex){
  var color = $('table').find('tr').eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
  return color
}

// Now the rowIndex feeded to changeColor must be a row index after checking filled rows.
// Now we need to check filled buttons Note that here color returning as "rgb(128, 128, 128)" and not simply gray.
function checkFilledRow(colIndex){
for (var i = 5; i > -1; i--) {
  if (checkColor(i,colIndex) === 'rgb(128, 128, 128)') {
    return i
    }
  }
}

function gameWinCheck(one,two,three,four){
  return (one === two && two === three && three === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

function horizontalWinCheck(){
  for (var row = 0; row < 6; row++) {
    for (var col = 0; col < 3; col++) {
        if (gameWinCheck(checkColor(row,col),checkColor(row,col+1),checkColor(row,col+2),checkColor(row,col+3))) {
          return true;
        }else {
          continue;
        }
           }
        }
    }

function verticalWinCheck(){
  for (var col = 0; col < 6; col++) {
    for (var row = 0; row < 3; row++){
      if (gameWinCheck(checkColor(row,col),checkColor(row+1,col),checkColor(row+2,col),checkColor(row+3,col))){
      return true;
    }else {
      continue;
    }
    }
  }
}

function diagonalWinCheck(){
  for (var col = 0; col < 4; col++) {
    for (var row = 0; row < 7; row++) {
      if (gameWinCheck(checkColor(row,col),checkColor(row+1,col+1),checkColor(row+2,col+2),checkColor(row+3,col+3))) {
          return true
      }else if (gameWinCheck(checkColor(row,col), checkColor(row-1,col+1) ,checkColor(row-2,col+2), checkColor(row-3,col+3))) {
          return true
      }else {
        continue;
      }
    }
  }
}

function gameWon(){
  for (var col = 0; col < 7; col++) {
    for (var row = 0; row < 7; row++) {
  $('h3').fadeOut('fast');
  $('h2').text(currentPlayer + " has Won!").css("fontSize", "50px")
  $('h1').text('Refresh Page to start again.')
      }
    }
}
// function gameEnd(winningPlayer) {
//   for (var col = 0; col < 7; col++) {
//     for (var row = 0; row < 7; row++) {
//       $('h3').fadeOut('fast');
//       $('h2').fadeOut('fast');
//       $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
//     }
//   }
// }

// Actual Game Logic :
// take input for name and (colors in future) colors must be in rgb(x, y, z) format.
var currentState = 1;
var currentPlayer = playerOneName;
var color = playerOneColor;

  $('h3').text(currentPlayer + " please put your chip.")

  $('button').click(function(){
    // var rowIndex = $(this).closest('tr').index()

    var colIndex = $(this).closest('td').index()

    var rowIndex = checkFilledRow(colIndex)
    changeColor(rowIndex,colIndex,color)

    // Now, here winning conditions will be checked. Vertical, Horizontal and Diagonal.
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
      gameWon(currentPlayer);
      // $('h2').text('');
      // $('h3').text('');
      // $('h1').text(currentPlayer+" has Won!")
    }

    currentState *= -1;

    if (currentState === 1) {
      currentPlayer = playerOneName;
       color = playerOneColor;
       $('h3').text(currentPlayer + " please put your chip.");
    }else {
      currentPlayer = playerTwoName;
      color = playerTwoColor;
      $('h3').text(currentPlayer+" please put your chip.")
    }
  })
