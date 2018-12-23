const githubUrl = 'https://api.github.com/users/';
const swUrl = 'https://swapi.co/api/';

function getMostFollowers (...args) {
  const requests = args.map( cur =>  {
    return $.getJSON(githubUrl + cur);
  });

  return Promise.all(requests)
        .then(values => {
          const mostFollowed = values.reduce ( (acc, next) => {
            if (next.followers > acc.followers)
              acc = next.login;
            return acc;
          })

          return mostFollowed;
        });
}

getMostFollowers('elie', 'colt', 'tigarcia').then( data => {
  console.log(`The most followed is ${data}`);
});

function getMovie (charInfo) {
  return $.getJSON(charInfo.films[0])
         .then ( movieInfo => {
            return {character: charInfo, movie: movieInfo};
         });
}

function getPlanet (info) {
  return $.getJSON(info.movie.planets[0])
         .then (planetInfo => {
            info['planet'] = planetInfo;
            return `${info.character.name} is featured in ${info.movie.title} directed by ${info.movie.director} featuring planet ${info.planet.name}.`
         });
}

function starWarsString (num) {
  return $.getJSON(`${swUrl}people/${num}`)
         .then (getMovie)
         .then (getPlanet)
}

starWarsString(1).then( data => {
  console.log(data);
});

