# PokéAPI Query Filter

This challenge involves extending the functionality of the [PokéAPI](https://pokeapi.co/).
This API lets us access an extensive list and description of all Pokémon that exist,
along with other Pokémon game related information.
The functionality of the API is limited to either querying a Pokémon by name or listing the whole database with pagination.

The purpose of the challenge is to create a tool that allows us to query the API and filter Pokémon that share a set of properties by utilizing the available API features, essentially creating a better querying tool for the API. To accomplish this we will use streams to efficiently handle the API data while providing results in real time.

## Description

The CLI tool receives the following parameters:
- `verbose`: a flag that tells that the response will be a complete JSON description. Returns only pokémon names otherwise.
- `is-starter`: a flag that tells if the pokéman can be picked as a starter.
- `ability`: a list of ability names.
- `moves`: a list of move names.
- `types`: a list of pokémon types.

The next parameters are integers, and they can be queried with a boolean expression (i.e. `--height >= 12`): `height`, `speed`, `weight`, `base-experience`, `hp`, `attack`, `defense`, `special-attack`, `special-defense`.

```bash
npm start --types electric --hp >25 --speed <100
```

## Getting started

- Make sure you have Node installed, preferably at least version `12.x.x`.
- Install the dependencies `npm i` or `yarn`.
- Run the project, you should see a description of the CLI inputs.
- Input is already parsed handled and parsed, you can find the code in `args-parser.js`.
