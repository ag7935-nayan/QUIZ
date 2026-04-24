document.addEventListener("DOMContentLoaded", () => {

const quiz = [
  {q:"Capital of India?",o:["Mumbai","Delhi","Kolkata","Chennai"],a:1},
  {q:"Largest planet?",o:["Earth","Mars","Jupiter","Venus"],a:2},
  {q:"Gas plants use for photosynthesis?",o:["Oxygen","CO2","Nitrogen","Hydrogen"],a:1},
  {q:"7 + 8 = ?",o:["14","15","16","17"],a:1},

  {q:"Which day comes after Monday?",o:["Sunday","Tuesday","Friday","Saturday"],a:1},
  {q:"How many legs does a dog have?",o:["2","3","4","5"],a:2},
  {q:"Which is a fruit?",o:["Carrot","Potato","Apple","Onion"],a:2},

  {q:"Water boils at?",o:["90°C","100°C","120°C","80°C"],a:1},
  {q:"Currency of India?",o:["Dollar","Rupee","Euro","Yen"],a:1},
  {q:"Which is a mammal?",o:["Shark","Frog","Whale","Lizard"],a:2},

  {q:"Sun is a?",o:["Planet","Star","Moon","Asteroid"],a:1},
  {q:"12 ÷ 3 = ?",o:["3","4","5","6"],a:1},
  {q:"Which organ pumps blood?",o:["Lungs","Brain","Heart","Kidney"],a:2},
  {q:"National bird of India?",o:["Parrot","Crow","Peacock","Eagle"],a:2},
  {q:"Which is not a solid?",o:["Ice","Water","Stone","Wood"],a:1},

  {q:"Largest ocean?",o:["Atlantic","Indian","Pacific","Arctic"],a:2},
  {q:"Which festival uses colors?",o:["Diwali","Holi","Eid","Christmas"],a:1},
  {q:"9 × 6 = ?",o:["54","56","52","50"],a:0},
  {q:"Which is a primary color?",o:["Green","Purple","Red","Pink"],a:2},
  {q:"Which animal is herbivore?",o:["Lion","Cow","Tiger","Wolf"],a:1},

  {q:"Speed of light unit?",o:["m/s","km","kg","cm"],a:0},
  {q:"India independence year?",o:["1945","1946","1947","1950"],a:2},
  {q:"Which is a continent?",o:["Asia","India","USA","Delhi"],a:0},
  {q:"Triangle angles sum?",o:["90°","180°","360°","270°"],a:1},
  {q:"Which is largest mammal?",o:["Elephant","Whale","Tiger","Horse"],a:1},

  {q:"Which planet has rings?",o:["Mars","Earth","Saturn","Venus"],a:2},
  {q:"15 + 10 = ?",o:["20","25","30","35"],a:1},
  {q:"Which gas do humans exhale?",o:["Oxygen","CO2","Nitrogen","Hydrogen"],a:1},
  {q:"Which is a programming language?",o:["HTML","Python","HTTP","WWW"],a:1},
  {q:"Which is not a fruit?",o:["Apple","Carrot","Banana","Mango"],a:1}
];

quiz.sort(() => Math.random() - 0.5);

let i = 0, score = 0, time = 60, timer;

const easyBtn = document.getElementById("easyBtn");
const hardBtn = document.getElementById("hardBtn");

const quizBox = document.getElementById("quizBox");
const startScreen = document.getElementById("startScreen");

const tickSound = document.getElementById("tickSound");

const qEl = document.getElementById("question");
const oEl = document.getElementById("options");
const tEl = document.getElementById("timer");
const pEl = document.getElementById("progress");

// EASY MODE
easyBtn.onclick = () => {
  startScreen.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQ(); // no bg music
};

// HARD MODE REDIRECT
hardBtn.onclick = () => {
  window.location.href = "https://ag7935-nayan.github.io/QUIZ-hard/";
};

// TIMER
function startTimer(){
  time = 60;
  tEl.innerText = time + "s";

  tickSound.currentTime = 0;
  tickSound.play();

  timer = setInterval(()=>{
    time--;
    tEl.innerText = time + "s";

    if(time <= 10){
      tickSound.playbackRate = 1.7;
    }

    if(time <= 0){
      clearInterval(timer);
      tickSound.pause();
      nextQ();
    }
  },1000);
}

// LOAD
function loadQ(){
  clearInterval(timer);
  startTimer();

  const q = quiz[i];
  qEl.innerText = q.q;
  pEl.innerText = (i+1) + " / " + quiz.length;

  oEl.innerHTML = "";

  q.o.forEach((opt,idx)=>{
    let div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => check(div, idx);
    oEl.appendChild(div);
  });
}

// CHECK
function check(el, idx){
  clearInterval(timer);
  tickSound.pause();
  tickSound.playbackRate = 1;

  const correct = quiz[i].a;
  const options = document.querySelectorAll(".option");

  options.forEach(o => o.onclick = null);

  if(idx === correct){
    el.classList.add("correct");
    score++;
  } else {
    el.classList.add("wrong");
    options[correct].classList.add("correct");
  }

  setTimeout(nextQ, 1500);
}

// NEXT
function nextQ(){
  i++;

  if(i < quiz.length){
    loadQ();
  } else {
    quizBox.innerHTML = `
      <h1>🎉 Quiz Finished!</h1>
      <h2>Your Score: ${score} / ${quiz.length}</h2>
      <p class="credit">Presented by Gurukul</p>
      <button onclick="location.reload()">Play Again</button>
    `;
  }
}

});
