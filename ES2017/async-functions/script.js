const githubUrl = 'https://api.github.com/users/';
const swUrl = 'https://swapi.co/api/';

async function hasMostFollowers (...args) {
  const requests = args.map( cur =>  {
    return $.getJSON(githubUrl + cur);
  });

  const results = await Promise.all(requests);
  const mostFollowed = results.reduce ( (acc, next) => {
                                        if (next.followers > acc.followers)
                                          acc = next.login;
                                        return acc;
                                      });

  return `The most followed is ${mostFollowed}` //Return a promise with data as the return
}

hasMostFollowers('elie', 'colt', 'tigarcia').then( data => {
  console.log(data);
});

async function starWarsString (num) {

  const character = await $.getJSON(`${swUrl}people/${num}`);
  const movie = await $.getJSON(character.films[0]);
  const planet = await $.getJSON(movie.planets[0]);

  return `${character.name} is featured in ${movie.title} directed by ${movie.director} featuring planet ${planet.name}.`;
}

starWarsString(1).then( data => {
  console.log(data);
});

