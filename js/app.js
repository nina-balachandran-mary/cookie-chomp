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

  const cookieArena = document.getElementById('cookie-arena');
  const cookieMonsterImage = document.getElementById('cookie-monster');
  const scoreCard = document.getElementById('score');
  const difficultyCard = document.getElementById('difficulty');
  let score = 0;

  scoreCard.innerHTML = score;
  difficultyCard.innerHTML = 'Easy';

  /* Initialize cookie images, attach animation event listener and append cookie to DOM */
  const cookieInit = () => {
    // create a new image of cookie and append to DOM
    let cookie = document.createElement('img');
    cookie.src = './img/cookie.svg'
    cookie.className = 'cookie';
    cookie.style.left = Math.round((Math.random() * (1500 - 32) + 32)) + 'px'

    cookie.addEventListener('animationend',(e) => {
      e.preventDefault();
      if(cookie.style.left >= cookieMonsterImage.style.left && cookie.style.right <= cookieMonsterImage.style.right) {
        // score condition
        score += 1
        scoreCard.innerHTML = score;
        // console.log(cookieMonsterImage.width, cookieMonsterImage.height)
      }
      cookieArena.removeChild(cookie)
    })

    cookieArena.appendChild(cookie);
    return cookie;
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
    if (cookiesLaunched.length < difficulty['easy'] ?? 3) {
      cookieInit()
    }
  }, time['easy'])

  const gameReset = () => {
    score = 0;
    scoreCard.innerHTML = score;
  }

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') {
      clearInterval(interval);
      alert('Game has ended')
      gameReset()
      document.querySelectorAll('.cookie').forEach((cookie) => {
        cookieArena.removeChild(cookie)
      })
    }
  });
});
