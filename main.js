// select all elements with class "collapsible"
const collapsibles = document.querySelectorAll(".collapsible");
// // loop through each "collapsible" element and add an event listener
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

// when the button is clicked, set the input value to an empty string
$("#reset--btn").click(function() {
  $("#textfield").val("");
});

const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const textarea = document.getElementById("textfield");
const resetBtn = document.getElementById("reset--btn");

// add event listener to the form's submit button
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    validateInputs();
  });
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success")
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

// check if an email address is valid
const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// validate all input fields
const validateInputs = () => {
    let allInputsValid = true;
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = textarea.value.trim();

    if(nameValue === "") {
        setError(name, "Name is required");
        allInputsValid = false;
    } else {
        setSuccess(name);
    }

    if(emailValue === "") {
        setError(email, "Email is required");
        allInputsValid = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Provide a valid email address");
        allInputsValid = false;
    } else {
        setSuccess(email);
    }

    if(messageValue === "") {
        setError(textarea, "Message is required");
        allInputsValid = false;
    } else {
        setSuccess(textarea);
    }

    // if all input fields are valid, show a pop-up message
    if (allInputsValid) {
      document.querySelector(".bg--popContainer").style.display = "flex";

      const popOutButton = document.getElementById("submit--btn");
      const exitcontainer = document.getElementById("bg__container");
      const bg__container = document.querySelector(".bg--popContainer");

      popOutButton.addEventListener("click", popOutNow);
    
      function popOutNow(e) {
          e.preventDefault();
          document.querySelector(".bg--popContainer").style.display = "flex";
      }
      
       // close pop-up when close button is clicked
      const cancelPop = document.getElementById("close");
    
      cancelPop.addEventListener("click", CancelPopOut);
    
      function CancelPopOut(e) {
          e.preventDefault(); 
          bg__container.style.display = "none";
          // reload the page in order to be able to submit again
          location.reload();
      }
      
      // to display exit container if mouse is near the top of the window
      function exitmouse(event) {
          if (event.clientY < 50 ){
              document.removeEventListener("mouseout", exitmouse);
              exitcontainer.style.display = "flex"
          }
      }

      // get the datetime element and set its inner text to the current date and time
      const datetimeElement = document.getElementById("datetime");
      const now = new Date();
      
      datetimeElement.innerText = "Submission date: " + now.toLocaleString();

    }
};


//Slide Data
const words = [
  {
    description: "A night scene taken when I was in Nanjing for my exam.",
    image: "Nanjing.d63be7de.jpg",
    word:`
    I am an introverted and independent person. I like studying and thinking on my own.
    I've been to a lot of places on my own for exams.
    I am a good time manager. I never delay my assignments and I have never been late in submitting them.`,
  },
  {
    description: "I just did Omikuji and was searching for the meaning of the characters written on the Omikuji.",
    image: "omikuji.e58a48bf.jpg",
    word:`
    I am a person who thinks about others and always put myself in their shoes before doing anything.
    My hobbies are watching anime and playing video games and stuff like that.
    Japanese is my favourite language and I have been teaching myself Japanese for over 3 years.`,
  },
  {
    description: "Me (in Hutao costume) and my friends in MCM Comic Con.",
    image: "mcm.639196f6.jpg",
    word:`
    My favourite game company is Spike Chunsoft. I especially like the plot design of the games under it.
    Sometimes I do cosplay. Some of the characters I have cosplayed are: Hutao (From Genshin Impact), Kaguya Shinomiya (From
    Kaguya-sama: Love Is War), Amiya (From Arknights)...`,
  },
];

//Current Slide
let i = 0;
//Total Slides
let j = words.length;

let wordContainer = document.getElementById("word-container");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

if (nextBtn && prevBtn) {
  // to display the word, image and description of the current slide
  let displayWord = () => {
    wordContainer.innerHTML = `
      <p>${words[i].word}</p>
      <img src=${words[i].image}>
      <h6>${words[i].description}</h6>
    `;
  };

  // display the first slide when the page loads
  window.onload = displayWord;
  
  // move to the next/previous slide by incrementing i and using the modulo operator to wrap around
  nextBtn.addEventListener("click", () => {
    i = (j + i + 1) % j;
    displayWord();
  });
  
  prevBtn.addEventListener("click", () => {
    i = (j + i - 1) % j;
    displayWord();
  });
}

// to conditionally display the section
const notLaptopSection = document.getElementById("not-laptop-section");
const slide = document.getElementById("wrapper");

if(notLaptopSection && slide){
  function checkWidth() {
    if (window.innerWidth < 1024) {
      slide.style.display = "none";
      notLaptopSection.style.display = "block";
    } else {
      slide.style.display = "block";
      notLaptopSection.style.display = "none";
    }
  }
  
  window.addEventListener("resize", checkWidth);
  checkWidth();
}

// theme change
const toggle = document.getElementById('mode');
const body = document.querySelector('body');
const modeToggle = document.querySelector('.modeToggle');
const isDarkMode = localStorage.getItem('darkMode') === 'true';

// Set initial theme based on stored value
if (isDarkMode) {
  body.classList.add('dark-mode');
  toggle.textContent = 'Light Mode';
}

toggle.addEventListener('click', function() {

  // change the style of the icon and the theme
  this.classList.toggle('bi-brightness-high-fill');
  if (this.classList.toggle('bi-moon-fill')) {
    toggle.textContent = 'Dark Mode';
    localStorage.setItem('darkMode', 'false'); 
    body.classList.remove('dark-mode'); 
    body.style.backgroundColor = 'var(--color-background)'; 
  } else {
    toggle.textContent = 'Light Mode';
    localStorage.setItem('darkMode', 'true'); 
    body.classList.add('dark-mode'); 
    body.style.backgroundColor = 'var(--color-background-dark)'; 
  }

  body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', body.classList.contains('dark-mode')); 
  
  // Update background color based on dark-mode class
  if (body.classList.contains('dark-mode')) {
    body.style.backgroundColor = 'var(--color-background-dark)';
  } else {
    body.style.backgroundColor = 'var(--color-background)';
  }
  
});

modeToggle.addEventListener('click', function() {
  body.classList.toggle('dark-mode');
  // Save user's choice
  localStorage.setItem('darkMode', body.classList.contains('dark-mode')); 

  if (body.classList.contains('dark-mode')) {
    body.style.backgroundColor = 'var(--color-background-dark)';
  } else {
    body.style.backgroundColor = 'var(--color-background)';
  }
  
});

if (toggle.textContent === 'Light Mode') {
  toggle.click();
}

let player = document.getElementById("player");
let progress = document.getElementById("progress");
let btnplay = document.getElementById("btn--play");

let playpause = function () {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
}

if(btnplay){
  btnplay.addEventListener("click", playpause);

  // change the play/pause button icon on play
  player.onplay = function () {
    btnplay.classList.remove("bi-play-fill");
    btnplay.classList.add("bi-pause-fill");
  }

  player.onpause = function () {
    btnplay.classList.add("bi-play-fill");
    btnplay.classList.remove("bi-pause-fill");
  }

  // update the current time and progress bar as the player plays
  player.ontimeupdate = function () {
    let ct = player.currentTime;
    current.innerHTML = timeFormat(ct);

    let duration = player.duration;
    prog = Math.floor((ct * 100) / duration);
    progress.style.setProperty("--progress", prog + "%");
  }

  // to format the time as minutes and seconds
  function timeFormat(ct) {
    minutes = Math.floor(ct / 60);
    seconds = Math.floor(ct % 60);

    if (seconds < 10) {
      seconds = "0"+seconds;
    }

    return minutes + ":" + seconds;
  }
}