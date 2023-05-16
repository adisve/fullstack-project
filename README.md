# Fitness Tracker

## How to setup format on save in VSCode

1. Install the [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extension
2. Open the Command Palette (Ctrl+Shift+P) and type "format on save" and select "Editor: Format On Save"

```json
{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

## Running the app locally

1. Make sure you have [Node.js](https://nodejs.org/en/) installed on your computer

2. From the client directory & server, run ```npm install```

3. To run the server, cd into server directory and run ```npm run build && npm run dev```

4. To run the client, cd into client directory and run ```npm run dev```

## How to create docker images

1. Make sure you have docker installed on your computer, either CLI version or Desktop version --> [Docker](https://www.docker.com/)

2. From the root directory and enter ```docker compose up```

## How to run the app in production mode

1. Run ```./run_dev.sh``` from the root directory (this only works on arch linux)
