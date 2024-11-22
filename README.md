
# Recipe App Documentation

This Recipe App is a web-based platform where users can add new recipes, view a list of recipes, rate other users' recipes, and add comments to recipes. The application is built using React and Axios for handling API requests.

## Features

### 1. **Add Recipes**
   - Users can add new recipes by filling in the recipe details (title, ingredients, steps, etc.).
   - The recipe is sent to the backend using an API call (`POST /recipes`).
   - Upon success, the new recipe will be stored in the database and listed in the recipe list.

### 2. **View List of Recipes**
   - Users can view a paginated list of all recipes with details such as title, description, and rating.
   - Each recipe is fetched from the backend API (`GET /recipes`) and displayed in a grid or list format.

### 3. **Rate Other Users' Recipes**
   - Logged-in users can rate recipes created by other users.
   - The rating is stored as a numerical value (e.g., 1-5 stars) and sent to the backend (`POST /recipes/{recipeId}/rate`).
   - The recipe's overall rating is recalculated and updated based on new user ratings.

### 4. **Add Comments to Recipes**
   - Users can add comments to any recipe.
   - The comment is sent to the backend (`POST /comments`), associated with the recipe, and displayed under the recipe.
   - Users can view all comments under a recipe in the recipe detail page.

## Process to Run the App

### Prerequisites
Ensure you have the following installed:
- Node.js (v18 or above)
- npm (Node package manager)

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install Dependencies**
   Run the following command to install all the required npm packages:
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   This will start the app in development mode. Open [http://localhost:3001](http://localhost:3001) to view the app in your browser.

4. **Build for Production**
   If you want to create a production build, run the following command:
   ```bash
   npm run build
   ```
   This will bundle your app for production and optimize the build for best performance.

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode. Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run test`
Launches the test runner in interactive watch mode.

### Error Handling
If any error occurs during API calls (such as adding a recipe, rating a recipe, or fetching data), an error message is displayed to the user with feedback on what went wrong.


## Tools and Configuration

### ESLint

[ESLint](https://eslint.org/) is a static code analysis tool used to identify problematic patterns in JavaScript code. This project uses ESLint to enforce consistent code styles and prevent common bugs.

#### How it Works:
- The ESLint configuration file (`.eslintrc.json`) is set up to enforce various JavaScript and TypeScript best practices.
- Custom linting rules have been added for naming conventions, indentation, and code structure.
- The project uses the `eslint-plugin-react` and `eslint-plugin-jsx-a11y` for React-specific linting.

#### How to Run ESLint:
```bash
npm run lint
```

### CommitLint

[CommitLint](https://commitlint.js.org/) is used to enforce commit message conventions. It helps maintain a clean, readable, and structured commit history by ensuring commit messages follow a specific pattern.

#### How it Works:
- Commit messages must follow the **Conventional Commits** standard, such as:
  - `feat: add new feature`
  - `fix: correct bug in feature`
  - `chore: update dependencies`
  
- The `commitlint.config.js` file contains the configuration for enforcing this pattern.

#### How to Run CommitLint:
CommitLint runs automatically on commits with the help of [Husky](https://github.com/typicode/husky) and `lint-staged`. The pre-commit hook ensures that commit messages are valid.

To manually check commit messages:
```bash
npm run commitlint
```

### Prettier

[Prettier](https://prettier.io/) is a code formatter that ensures consistent code style throughout the project. It automatically formats code to meet specific style guidelines such as spacing, indentation, and line length.

#### How it Works:
- The Prettier configuration file (`.prettierrc`) defines the rules for formatting code.
- This project is integrated with `lint-staged` and Husky to automatically format files before they are committed.

#### How to Run Prettier:
```bash
npm run format
```

### Setting Up ESLint, CommitLint, and Prettier Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run ESLint:
   ```bash
   npm run lint
   ```

3. Run Prettier:
   ```bash
   npm run format
   ```

4. Commit changes (ensures CommitLint runs):
   ```bash
   git add .
   git commit -m "feat: new feature added"
   ```

---

## CI/CD Implementation

### GitHub Actions

GitHub Actions is used to automate the build, test, and deployment processes for the project. The following workflows are set up:

#### Workflow: `release.yml`
This workflow ensures that the code is linted, tested, and built on every push to the repository.

```yaml
name: Deploy to Vercel

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  push:
    branches:
      - main  # Trigger deployment and semantic release on pushes to the main branch

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      # Step 1: Checkout the repository
      - name: Checkout code
        uses: actions/checkout@v2

      # Step 2: Set up Node.js
      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20.8.1'
          cache: 'npm'

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm install

      # install jest
      - name: Install Jest
        run: npm install --save-dev jest
        
      # Step 4: Run tests
      - name: Run Tests
        run: npm run test  # Make sure `npm test` is configured to run tests

      # Step 5: Install Semantic Release
      - name: Install Semantic Release
        run: npm install semantic-release @semantic-release/changelog @semantic-release/git @semantic-release/github --save-dev

      # Step 6: Run Semantic Release
      - name: Run Semantic Release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: npx semantic-release

      # Step 7: Install Vercel CLI
      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      # Step 8: Pull Vercel environment information
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      # Step 9: Build project artifacts
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      # Step 10: Deploy project artifacts to Vercel
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}

```

#### How it Works:
- This CI pipeline is triggered on every push and pull request to the `main` branch.
- It installs dependencies, runs ESLint to check code quality, runs Prettier to check code formatting, and executes unit tests.
- If any step fails (e.g., linting or tests), the pipeline will stop, ensuring that only valid code is merged into the `main` branch.

### Vercel Deployment

[Vercel](https://vercel.com/) is used for continuous deployment. Every time a new commit is pushed to the `main` branch, the application is automatically deployed to Vercel.

#### How it Works:
- Vercel automatically detects the framework and deploys the app.
- A `.vercel` configuration file ensures that the deployment pipeline is set up with the correct build and environment settings.

### Deployment Steps:
1. Connect your GitHub repository to Vercel.
2. Configure Vercel to deploy on every push to the `main` branch.
3. Vercel automatically runs a build step and deploys the app to the production environment.

---

### App is live on this URL
### https://foods-app-next-js.vercel.app/
---

For further information, refer to the [React Documentation](https://reactjs.org/).