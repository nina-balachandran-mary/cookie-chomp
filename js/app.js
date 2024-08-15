document.addEventListener('DOMContentLoaded', () => {
  /* Difficulty determines max amount cookies spawned on screen concurrently */
  const difficulty = {
    easy: 3,
    medium: 5,
    hard: 8,
    chaos: 11,
  }

  /* Time in milliseconds before the next cookie spawns */
  const time = {
    easy: 2000,
    medium: 1500,
    hard: 1500,
    chaos: 1000,
  }

  const startScreen = document.getElementsByClassName('start-screen')[0]
  const cookieArena = document.getElementById('cookie-arena');
  const cookieMonsterImage = document.getElementById('cookie-monster');
  const scoreCard = document.getElementById('score');
  const difficultyCard = document.getElementById('difficulty');

  let score = 0;
  /* Default difficulty set to Easy */
  let difficultyLevel = 'easy'

  scoreCard.innerHTML = score;
  difficultyCard.innerHTML = 'Easy';


  /* Initialize game with chosen difficulty */
  const difficultySelect = document.getElementById('difficulty-select');
  difficultySelect.addEventListener('change', (e) => {
    e.preventDefault();
    difficultyLevel = difficultySelect.value
    difficultyCard.innerHTML = difficultyLevel.charAt(0).toUpperCase() + difficultyLevel.slice(1);
  })

  const button = document.getElementsByClassName('start-button')[0]
  button.addEventListener('click', (e) => {
    e.preventDefault();
    startScreen.classList.add('hidden')
    cookieArena.classList.remove('hidden')
  })



  /* Initialize cookie images, attach animation event listener and append cookie to DOM */
  const cookieInit = () => {
    // create a new image of cookie and append to DOM
    let cookie = document.createElement('img');
    cookie.src = './img/cookie.svg'
    cookie.className = 'cookie';
    cookie.style.left = Math.round((Math.random() * (1500 - 32) + 32)) + 'px'

    cookie.addEventListener('animationend',(e) => {
      e.preventDefault();
      const cookieBounds = cookie.getBoundingClientRect();
      const monsterBounds = cookieMonsterImage.getBoundingClientRect();
      if(cookieBounds.x >= monsterBounds.x - cookieMonsterImage.width
        && cookieBounds.x <= monsterBounds.x + cookieMonsterImage.width) {
        // score condition
        score += 1
        scoreCard.innerHTML = score;

      }
      cookieArena.removeChild(cookie)
    })

    cookieArena.appendChild(cookie);
    return cookie;
  }

  if(!cookieArena) {
    return;
  }

  cookieArena.addEventListener('mousemove', (e) => {
    e.preventDefault();
    let leftPos = e.clientX - (cookieMonsterImage.width / 4) - 32
    // TODO: Check the right limit
    let rightPos = cookieArena.width - (cookieMonsterImage.width / 4) - 32 // 2em border approx
    cookieMonsterImage.style.left = leftPos > 0 ? leftPos + 'px' : '0';
  })

  const interval = setInterval(() => {
    let cookiesLaunched = document.querySelectorAll('.cookie');
    if (cookiesLaunched.length < difficulty[difficultyLevel] ?? 3) {
      cookieInit()
    }
  }, time[difficultyLevel])

  const gameReset = () => {
    score = 0;
    scoreCard.innerHTML = score;
    cookieArena.classList.add('hidden')
    startScreen.classList.remove('hidden')
  }

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      clearInterval(interval);
      alert('Game has ended. Your score was ' + score)
      gameReset()
      document.querySelectorAll('.cookie').forEach((cookie) => {
        cookieArena.removeChild(cookie)
      })
    }
  });
});
