// DOGAN CELIK Student ID: 000908936 //


document.addEventListener("DOMContentLoaded", function() {
    const image1 = document.getElementById("image1");
    const image2 = document.getElementById("image2");
    const image3 = document.getElementById("image3");
    const refreshTimeInput = document.getElementById("refreshTime");
    const randomizeBtn = document.getElementById("randomizeBtn");
    const countdownElement = document.getElementById("countdown");
    const changeCountElement = document.getElementById("changeCount");
    let countdownInterval;
    let countdownValue = 10;
    let changeCount = 0;
  
    // ASSIGNED ARRAYS FOR MY IMAGES
    const imageCategories = [
      ["images/apple.png ", "images/banana.png", "images/watermelon.png"],
      ["images/grape.png", "images/orange.png", "images/pineapple.png"],
      ["images/kiwi.png", "images/blueberry.png", "images/strawberry.png"]
    ];
  
    // SELECT AND DISPLAY FUNCTION
    function displayRandomImages() {
      const randomImages = [];
  
      for (let i = 0; i < imageCategories.length; i++) {
        const category = imageCategories[i];
        const randomIndex = Math.floor(Math.random() * category.length);
        const randomImage = category[randomIndex];
        randomImages.push(randomImage);
      }
  
      image1.src = randomImages[0];
      image2.src = randomImages[1];
      image3.src = randomImages[2];
    }
  
    // IMAGE CLICK EVENT
    function handleImageClick(event) {
      const target = event.target;
      const randomImage = getRandomImage();
      
      target.classList.remove("spin");
      setTimeout(() => {
        target.classList.add("spin");
        target.src = randomImage;
        resetTimer();
        increaseChangeCount();
      }, 0);
    }
  
    // FUNCTION TO PLAY A RANDOM IMAGE
    function getRandomImage() {
      const randomCategoryIndex = Math.floor(Math.random() * imageCategories.length);
      const randomCategory = imageCategories[randomCategoryIndex];
      const randomImageIndex = Math.floor(Math.random() * randomCategory.length);
      const randomImage = randomCategory[randomImageIndex];
      return randomImage;
    }
  
    // VALIDATE INPUT CHANGE
    function handleInput() {
      const inputValue = parseInt(refreshTimeInput.value);
      if (isNaN(inputValue) || inputValue < 500 || inputValue > 10000) {
        alert("Please enter a valid number between 500 and 10000.");
      } else {
        resetTimer();
        startTimer(inputValue);
      }
    }
  
    // COUNTDOWN TIMER FUNCTION
    function startTimer(time) {
      countdownValue = time / 100;
      countdownElement.textContent = countdownValue.toFixed(1);
  
      countdownInterval = setInterval(() => {
        countdownValue -= 0.1;
        countdownElement.textContent = countdownValue.toFixed(1);
        updateTimerColor();
  
        if (countdownValue <= 0) {
          clearInterval(countdownInterval);
          handleImageClick({ target: randomizeBtn });
        }
      }, 100);
    }
  
    // RESET THE TIMER
    function resetTimer() {
      clearInterval(countdownInterval);
      countdownValue = refreshTimeInput.value / 100;
      countdownElement.textContent = countdownValue.toFixed(1);
      updateTimerColor();
    }
  
    // COLOR THEAME FOR COUNTDOWN TIMER
    function updateTimerColor() {
      if (countdownValue > 5) {
        countdownElement.style.color = "white";
        countdownElement.style.backgroundColor = "green";
      } else if (countdownValue > 2.5) {
        countdownElement.style.color = "black";
        countdownElement.style.backgroundColor = "yellow";
      } else {
        countdownElement.style.color = "white";
        countdownElement.style.backgroundColor = "red";
      }
    }
  
    // Function to increase the image change counter
    function increaseChangeCount() {
      changeCount++;
      changeCountElement.textContent = changeCount;
    }
  
    // Event listeners
    image1.addEventListener("click", handleImageClick);
    image2.addEventListener("click", handleImageClick);
    image3.addEventListener("click", handleImageClick);
    refreshTimeInput.addEventListener("change", handleInput);
    randomizeBtn.addEventListener("click", displayRandomImages);
  
    // Initial setup
    displayRandomImages();
    startTimer(refreshTimeInput.value);
  });
  