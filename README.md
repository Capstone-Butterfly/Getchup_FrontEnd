# Getchup_FrontEnd

## Installing
git clone 'https://github.com/Capstone-Butterfly/Getchup_FrontEnd.git'
cd Getchup_FrontEnd
npm install

## Start the server
npx expo start
download Expo Go and scan the QR Code

## Using Expo Go with tunnel connection
npx expo start --tunnel
make sure your mobile device is connected to the same network
download Expo Go and scan the QR Code

## Best Practices
- Use the assigned Jira ID as your branch name and create the branch from Jira directly. For example, if your task ID is "P2S-142", it will create a branch named "P2S-142" at github
- Regularly pull the latest code and rebase with the remote branch.
- Write commit messages that are meaningful and in the present tense (git commit -m "feat: P2S-142 .....").
- Conduct thorough testing before merging changes into the develop branch.
- Request review from other developers and wait for the approval before merging with development branch.
- The developer assignee is responsible for merging the branch when it is approved.
- After the merge, the branch has to be auto deleted from the repository.
- After completing a task, remember to checkout to a new branch.
- Strive to write code that is free of bugs.
- Use .jsx extensions for components files and .js for logic files.

## Naming conventions
- PascalCase: components
- camelCase: variables, parameters, functions
- CONSTANT_CASE: global constants

## Components structure
const Component = () => {}
export default Component

# Folder structure (subject to change): folders, main files and folder's function listed below
Getchup_FrontEnd/
- expo/
- assets/
    - background/
    - icons/
    - illustrations/
    - logo/
    - splash-screen/
- src/
    - components/ --> UI components
    - config/ --> base url config
    - navigation/ --> bottom tabs files
    - screens/ --> organized majorly according to bottom tabs
    - services/ --> logic to query APIs for information
    - stacks/ --> tabs stacks organization
    - store/  --> state management
    - styles/ --> centralized styling of the application and related variables
    - utils/ --> configuration variables to use for API connections
