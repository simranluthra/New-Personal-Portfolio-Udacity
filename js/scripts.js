
  


  fetch('./data/aboutMeData.json').then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    const aboutMe = document.getElementById('aboutMe');
    aboutMe.innerHTML = `
    <p>${data.aboutMe}</p>
    <div class="headshotContainer">
    <img src=${data.headshot} />
    </div>
    `
  }).catch(err => {
    console.log(err, "failed to fetch");
  })


