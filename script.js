const quiz = [
  {q:"Capital of India?",o:["Mumbai","Delhi","Kolkata","Chennai"],a:1},
  {q:"Red planet?",o:["Earth","Mars","Venus","Jupiter"],a:1},
  {q:"Gas we breathe?",o:["Oxygen","CO2","Nitrogen","Hydrogen"],a:0},
  {q:"5+3?",o:["6","7","8","9"],a:2},
  {q:"Water freezes at?",o:["0","10","50","100"],a:0},
  {q:"King of jungle?",o:["Tiger","Lion","Elephant","Bear"],a:1},
  {q:"Festival of lights?",o:["Holi","Diwali","Eid","Christmas"],a:1},
  {q:"Ram's wife?",o:["Radha","Sita","Lakshmi","Parvati"],a:1},
  {q:"Monkey god?",o:["Hanuman","Shiva","Krishna","Brahma"],a:0},
  {q:"Earth is?",o:["Star","Planet","Moon","Comet"],a:1},

  {q:"10-4?",o:["5","6","7","8"],a:1},
  {q:"2x3?",o:["5","6","7","8"],a:1},
  {q:"Vowel?",o:["B","C","A","D"],a:2},
  {q:"Opposite of hot?",o:["Cold","Warm","Cool","Heat"],a:0},
  {q:"Plural of cat?",o:["Cats","Catss","Cates","Catz"],a:0},

  {q:"Sun rises from?",o:["West","East","North","South"],a:1},
  {q:"Days in week?",o:["5","6","7","8"],a:2},
  {q:"Liquid metal?",o:["Iron","Mercury","Gold","Silver"],a:1},
  {q:"Photosynthesis done by?",o:["Plants","Animals","Humans","None"],a:0},
  {q:"Heart pumps?",o:["Air","Blood","Water","Food"],a:1},

  {q:"Who killed Ravana?",o:["Krishna","Rama","Shiva","Hanuman"],a:1},
  {q:"Krishna born in?",o:["Mathura","Delhi","Ayodhya","Kashi"],a:0},
  {q:"Triangle sides?",o:["2","3","4","5"],a:1},
  {q:"Largest planet?",o:["Earth","Mars","Jupiter","Venus"],a:2},
  {q:"Smallest number?",o:["10","2","5","7"],a:1},

  {q:"Leaf color?",o:["Red","Blue","Green","Yellow"],a:2},
  {q:"Milk animal?",o:["Dog","Cat","Cow","Lion"],a:2},
  {q:"Flying bird?",o:["Dog","Elephant","Sparrow","Tiger"],a:2},
  {q:"Independence year?",o:["1945","1947","1950","1960"],a:1},
  {q:"National animal?",o:["Lion","Tiger","Elephant","Cow"],a:1},

  {q:"National bird?",o:["Parrot","Peacock","Crow","Eagle"],a:1},
  {q:"Hours in day?",o:["12","24","36","48"],a:1},
  {q:"7+2?",o:["8","9","10","11"],a:1},
  {q:"Color of sky?",o:["Green","Blue","Red","Yellow"],a:1},
  {q:"Dog sound?",o:["Meow","Bark","Roar","Moo"],a:1},

  {q:"Shape with 4 sides?",o:["Triangle","Square","Circle","Oval"],a:1},
  {q:"Opposite of big?",o:["Small","Large","Huge","Tall"],a:0},
  {q:"Fast animal?",o:["Turtle","Cheetah","Snail","Cow"],a:1},
  {q:"Rain comes from?",o:["Clouds","Ground","Trees","Sun"],a:0},
  {q:"Fire is?",o:["Cold","Hot","Wet","Dry"],a:1}
];

// shuffle
quiz.sort(() => Math.random() - 0.5);

let i = 0, score = 0, time = 60, timer;

const startBtn = document.getElementById("startBtn");
const quizBox = document.querySelector(".quiz-box");
const startScreen = document.getElementById("startScreen");
const music = document.getElementById("bgMusic");

const qEl = document.getElementById("question");
const oEl = document.getElementById("options");
const tEl = document.getElementById("timer");
const nextBtn = document.getElementById("nextBtn");

// START
startBtn.onclick = () => {
  startScreen.style.display = "none";
  quizBox.style.display = "block";
  music.play();
  loadQ();
};

// TIMER
function startTimer(){
  time = 60;
  tEl.innerText = "Time: " + time;

  timer = setInterval(()=>{
    time--;
    tEl.innerText = "Time: " + time;

    if(time <= 0){
      clearInterval(timer);
      nextQ();
    }
  },1000);
}

// LOAD QUESTION
function loadQ(){
  clearInterval(timer);
  startTimer();

  const q = quiz[i];
  qEl.innerText = q.q;
  oEl.innerHTML = "";

  q.o.forEach((opt,idx)=>{
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;

    div.onclick = () => check(div, idx);
    oEl.appendChild(div);
  });
}

// CHECK
function check(el, idx){
  clearInterval(timer);

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
}

// NEXT
nextBtn.onclick = nextQ;

function nextQ(){
  i++;

  if(i < quiz.length){
    loadQ();
  } else {
    document.body.innerHTML = `<h1>🎉 Score: ${score}/40</h1>`;
  }
}
