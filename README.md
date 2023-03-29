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

## How to create docker images

1. Make sure you have docker installed on your computer, either CLI version or Desktop version --> [Docker](https://www.docker.com/)

2. cd into ./mern from the root directory and enter `docker-compose up --build` to build all required images, which is made possible with the Dockerfiles in each subfolder.

3. Cool new line
