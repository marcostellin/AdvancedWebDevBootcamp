document.addEventListener('DOMContentLoaded', function() {
  const wordCount = 10;
  let guessCount = 4;
  let password = '';

  const start = document.getElementById('start');
  start.addEventListener('click', () => {
    toggleClasses(document.getElementById('start-screen'), 'hide', 'show');
    toggleClasses(document.getElementById('game-screen'), 'hide', 'show');
    startGame();
  });

  function toggleClasses(element, ...classes) {
    classes.forEach( cur => element.classList.toggle(cur) );
  }

  function startGame() {
    // get random words and append them to the DOM
    const wordList = document.getElementById('word-list');
    // 'words' variable is from words.js
    const randomWords = getRandomValues(words, wordCount); // eslint-disable-line no-undef
    randomWords.forEach( word => {
      const li = document.createElement('li');
      li.innerText = word;
      wordList.appendChild(li);
    });

    // set a secret password and the guess count display
    [password] = getRandomValues(randomWords, 1);
    setGuessCount(guessCount);

    // add update listener for clicking on a word
    wordList.addEventListener('click', updateGame);
  }

  function getRandomValues(array, numberOfVals) {
    return shuffle(array).slice(0, numberOfVals);
  }

  function shuffle(array) {
    const arrayCopy = array.slice();

    array.reverse().forEach( (cur,idx1) => {
      const idx2 = Math.floor(Math.random() * (idx1 + 1));
      [arrayCopy[idx1], arrayCopy[idx2]] = [arrayCopy[idx2], arrayCopy[idx1]];
    });

    return arrayCopy;
  }

  function setGuessCount(newCount) {
    guessCount = newCount;
    document.getElementById('guesses-remaining').innerText =
      `Guesses remaining: ${guessCount}.`;
  }

  function updateGame(e) {
    if (e.target.tagName === 'LI' && !e.target.classList.contains('disabled')) {
      // grab guessed word, check it against password, update view
      var guess = e.target.innerText;
      var similarityScore = compareWords(guess, password);
      e.target.classList.add('disabled');
      e.target.innerText = `${guess} --> Matching Letters: ${similarityScore}`;
      setGuessCount(guessCount - 1);

      // check whether the game is over
      if (similarityScore === password.length) {
        toggleClasses(document.getElementById('winner'), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      } else if (guessCount === 0) {
        toggleClasses(document.getElementById('loser'), 'hide', 'show');
        this.removeEventListener('click', updateGame);
      }
    }
  }

  function compareWords(word1, word2) {
    if (word1.length !== word2.length) {
      throw 'Words must have the same length';
    }

    return [...word1].reduce( (acc, next, idx) => {
      if (next === word2[idx])
        acc++;
      return acc;
    }, 0);
  }
});
