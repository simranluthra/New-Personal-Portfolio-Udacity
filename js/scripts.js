
  


  fetch('./data/aboutMeData.json').then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
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

  }).catch(err => {
    console.log(err, "failed to fetch");
  })


  fetch('./data/projectsData.json').then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    const projectList = document.getElementById('projectList');
    const leftArrow = document.querySelector('.arrow-left');
    const rightArrow = document.querySelector('.arrow-right');
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
    
      projectList.appendChild(projectCard);

      leftArrow.addEventListener('click', () => scrollList('left'));
      rightArrow.addEventListener('click', () => scrollList('right'));

      projectCard.addEventListener('click', () => showSpotlight(project));

      showSpotlight(data[0]);
    });
    
    
    function scrollList(d) {
      const projectList = document.getElementById('projectList');
      const scroll = window.innerWidth < 768 ? projectList.clientWidth / 2 : projectList.clientHeight / 2;
      
      if (window.innerWidth < 768) { 
        if (d === 'left') {
          projectList.scrollLeft -= scroll;
        } else if (d === 'right') {
          projectList.scrollLeft += scroll;
        }
      } else { 
        if (d === 'left') {
          projectList.scrollTop -= scroll;
        } else if (d === 'right') {
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
        const charCountDisplay = document.getElementById('charactersLeft'); 
        charCountDisplay.textContent = `Characters: ${messageLength}/300`; 
      });

    
  
    
  }).catch(err => {
    console.log(err, "failed to fetch");
  })


  
