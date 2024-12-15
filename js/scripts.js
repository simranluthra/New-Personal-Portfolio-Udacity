
  

async function fetchAboutMeData() {
  try {
    const response = await fetch('./data/aboutMeData.json');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const aboutMe = document.getElementById('aboutMe');
    const aboutMeParagraph = document.createElement('p');
    aboutMeParagraph.textContent = data.aboutMe;
    const headshotContainer = document.createElement('div');
    headshotContainer.classList.add('headshotContainer');

    const headshotImage = document.createElement('img');
    headshotImage.src = data.headshot;

    headshotContainer.appendChild(headshotImage);

    aboutMe.appendChild(aboutMeParagraph);
    aboutMe.appendChild(headshotContainer);

  } catch (err) {
    console.error('Failed to fetch data:', err);

    const aboutMe = document.getElementById('aboutMe');
    
    const errorMessage = document.createElement('p');
    errorMessage.textContent = "Sorry, we couldn't load your information at this time.";
    aboutMe.appendChild(errorMessage);
  }
}

fetchAboutMeData();



async function fetchProjectsData() {
  try {
    const response = await fetch('./data/projectsData.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);

    const projectList = document.getElementById('projectList');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');

    leftArrow.addEventListener('click', () => scrollList('left'));
    rightArrow.addEventListener('click', () => scrollList('right'));

    const fragment = document.createDocumentFragment();

    data.forEach((project) => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('projectCard');
      projectCard.id = project.project_id;
    
      const backgroundImage = project.card_image;
      projectCard.style.backgroundImage = `url('${backgroundImage}')`;
    
      const title = document.createElement('h3');
      title.textContent = project.project_name;
    
      const description = document.createElement('p');
      description.textContent = project.short_description;
    
      projectCard.appendChild(title);
      projectCard.appendChild(description);
    
      fragment.appendChild(projectCard);

    });

    projectList.appendChild(fragment);

    if (data.length > 0) {
      showSpotlight(data[0]);
    }

    function scrollList(direction) {
      const projectList = document.getElementById('projectList');
      const scroll = window.innerWidth < 768 ? projectList.clientWidth / 2 : projectList.clientHeight / 2;
      
      if (window.innerWidth < 768) { 
        if (direction === 'left') {
          projectList.scrollLeft -= scroll;
        } else if (direction === 'right') {
          projectList.scrollLeft += scroll;
        }
      } else { 
        if (direction === 'left') {
          projectList.scrollTop -= scroll;
        } else if (direction === 'right') {
          projectList.scrollTop += scroll;
        }
      }
    }

    function showSpotlight(project) {
      const projectSpotlight = document.getElementById('spotlightTitles');
      projectSpotlight.innerHTML = '';
    
      const projectName = document.createElement('h3');
      projectName.textContent = project.project_name;
      projectSpotlight.appendChild(projectName);
    
      const projectDescription = document.createElement('p');
      projectDescription.textContent = project.long_description;
      projectSpotlight.appendChild(projectDescription);
    
      const learnMoreLink = document.createElement('a');
      learnMoreLink.textContent = 'Learn more';
      learnMoreLink.href = project.url;
      learnMoreLink.target = '_blank'; 
      learnMoreLink.setAttribute('aria-label', `Learn more about ${project.project_name}`);
    
      projectSpotlight.appendChild(learnMoreLink);
    }

    projectList.addEventListener('click', (event) => {
      if (event.target.closest('.projectCard')) {
        const projectCard = event.target.closest('.projectCard');
        const projectId = projectCard.id;
        const selectedProject = data.find(project => project.project_id === projectId);
        showSpotlight(selectedProject);
      }
    });

    document.getElementById('formSection').addEventListener('submit', function(event) {
      event.preventDefault();

      const emailErrorMessages = document.getElementById('emailError');
      emailErrorMessages.innerHTML = '';
      const messageError = document.getElementById('messageError');
      messageError.innerHTML = '';

      const email = document.getElementById('contactEmail').value;
      const message = document.getElementById('contactMessage').value;

      let isValid = true;

      if (email === '') {
        isValid = false;
        const errorMessage = document.createElement('p');
        emailErrorMessages.textContent = 'Email is required.';
        emailErrorMessages.appendChild(errorMessage);
      } else if (!isValidEmail(email)) {
        isValid = false;
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Please enter a valid email address.';
        emailErrorMessages.appendChild(errorMessage);
      }

      function isValidEmail(email) {
        const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return pattern.test(email);
      };

      if (message === '') {
        isValid = false;
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Message is required.';
        messageError.appendChild(errorMessage);
      } else if (message.length > 300) {
        isValid = false;
        const errorMessage = document.createElement('p');
        errorMessage.textContent = 'Message must be less than 300 characters.';
        messageError.appendChild(errorMessage);
      };

      if (isValid) {
        alert('Thank you for your message!');
        document.getElementById('formSection').reset();
      }
    });

    document.getElementById('contactMessage').addEventListener('input', function() {
      const messageLength = this.value.length;
      const messageData = document.getElementById('messageData');
      const charCountDisplay = document.getElementById('charactersLeft');
      charCountDisplay.textContent = `Characters: ${messageLength}/300`;

      if (messageLength > 300) {
        charCountDisplay.classList.add('error'); 
      } else {
        charCountDisplay.classList.remove('error'); 
      }

      const validPart = this.value.slice(0, 300);
      const exceedingPart = this.value.slice(300);

      if (messageLength > 300) {
        messageData.innerHTML = `${validPart}<span class="error">${exceedingPart}</span>`;
      } else {
        message.innerHTML = this.value;
      }

    });

  } catch (err) {
    console.error('Failed to fetch data:', err);
    const projectList = document.getElementById('projectList');
    const errorMessage = document.createElement('p');
    projectList.appendChild(errorMessage);
  }
}

fetchProjectsData();


  
