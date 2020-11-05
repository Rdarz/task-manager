## Usage

### npm

```sh
npm install
```

### Absolute path setup

Create new file at root level with .env name. And add following line in that.

```
 NODE_PATH=src/
```

## Config

- Base url config added in following file - 'src/common/utils/apiConfig/'
- Api constants config added in - 'src/common/constants/ApiConstants.js'
- Authentication key config added in - 'src/common/constants/ConfigConstants.js'

## Features

- Create task
- Assign a task to a user
- Update Task
- Delete task
- View task based on the date and priority (High medium-low)
- Being able to drag and drop a task two views are created which is List View and Board View. User can drag and drop a task from one priority to another priority using Board view.

## Includes

- [React CRA][cra]
- [axios][axios]
- [redux][redux]
- [react-router][react-router]
- [redux-thunk][redux-thunk]
- [node-sass][node-sass]
- [react-bootstrap][react-bootstrap]
- [react-date-picker][react-bootstrap]
- [react-select][react-bootstrap]
