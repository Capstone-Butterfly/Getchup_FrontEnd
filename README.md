# Getchup_FrontEnd

## Installing
git clone 'https://github.com/Capstone-Butterfly/Getchup_FrontEnd.git'
cd Getchup_FrontEnd
npm install

## Start the server
npx expo start

## Using Expo Go
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
    - icons/
    - images/
- components/ --> UI components
    - CalendarMonth.jsx
    - CalendarWeek.jsx
    - Header.jsx
    - TaskControlBar.jsx
    - TaskItem.jsx
    - TaskList.jsx
    - ProgressChart.jsx
    - ProfileForm.jsx
    - ModalSetDate.jsx
    - ModalSetTime.jsx
    - ProfileForm.jsx
    - SurveyQuestion.jsx
- config/ --> configuration variables to use for API connections
    - apiConfig.js
- styles/ --> centralize styling of the application and related variables
    - colors.js
    - theme.js
- hooks/
    - useTasks.js
- navigation/
    - MainNavigator.js
    - HomeNavigator.js
    - AuthNavigator.js
    - ProfileNavigator.js
    - ProgressNavigator.js
- screens/
    - home/
        - HomeScreen.jsx
        - HomeWeeklyViewScreen.jsx
        - HomeMonthlyViewScreen.jsx
    - existingTask/
        - TaskScreen.jsx
        - TaskEditScreen.jsx
        - FocusModeScreen.jsx
    - newTask/
        - TaskCreateScreen.jsx
        - TaskTitleSuggestionScreen.jsx
    - profile/
        - ProfileScreen.jsx
        - SignInScreen.jsx
        - SignUpScreen.jsx
        - ForgotPasswordScreen.jsx
        - ResetPasswordScreen.jsx
    - progress/
        - ProgressScreen.jsx
        - MovementTrackingScreen.jsx
        - SurveyScreen.jsx
- services/ --> logic to query APIs for information
    - notification.js
    - profile.js
    - tasks.js
- state/  --> State management
    - store_notification.js
    - store_profile.js
    - store_tasks.js
    - types.js
- .gitignore
- App.js
- app.json
- babel.config.js
- package-lock.json
- package.json
- README.md
