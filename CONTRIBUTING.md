# Contribution Rules and Regulations

## Welcome!

Thank you for your interest in the NYUAD Issue Resolution Platform. We appreciate your willingness to contribute and be a part of our project. This document provides guidelines to ensure smooth collaboration and productive contributions.

## Team Values and Process

### Team Norms:

#### Open Communication: 
- We prioritize open communication. All team members and contributors should feel free to express their ideas, concerns, and feedback.
  
#### Mutual Respect: 
- Every member and contributor, irrespective of their role, should be treated with respect and dignity.

#### Commitment: 
- We expect team members and contributors to be dedicated and meet their deadlines.

#### Continuous Learning: 
- We encourage everyone to learn continuously, ask questions, and help each other grow.

#### Working Together:
- We'll collaborate asynchronously on our codebase and convene at daily standups to sync up.

#### Seeking Help:
- If a member requires assistance, they should ask openly or tag the issue on GitHub with a "needhelp" label.

#### Conflict Resolution:
- Conflicts will be resolved through open dialogue in a dedicated meeting. Every voice counts.

#### Decision Making:
- In case of disagreements, each member can present their argument. The team will collectively decide the best option. If consensus can't be reached, we'll employ a democratic approach with a majority vote.

#### Accountability:
- If a team member is lagging in their commitments, the issue will be discussed in a daily standup or dedicated meeting. If a task isn't progressing, it may be reassigned after 24 hours, considering our deadlines. In case we're stuck, our manager or professor will be consulted.

#### Communication:
- Team members are expected to respond to direct messages within 24 hours.

#### Sprint Cadence:
- Our sprints will last for 2 weeks. While very short sprints can induce unnecessary stress and longer ones might lead to complacency, we find the 2-week sprint to strike a balance for our team.

#### Daily Standups:
- Standups will be conducted before class on Tuesdays and Thursdays at 12 pm, lasting 20-30 minutes.
- Members are expected to attend synchronously. No one should cover for absentees.
- If a member hasn't made progress on a task for two consecutive standups, it will be escalated to management.

#### Coding Standards:
- All team members will use VS Code as the code editor and ESLint for linting to ensure code uniformity.
- We will strive for simplicity. Initial efforts should focus on making functionalities work end-to-end, after which improvements can be iterated.
- Code for each task and spike will undergo peer review and must pass tests before merging into the main branch.
- Always push functional code. If something breaks, it's the pusher's responsibility to rectify it.
- Commit often, making sure each commit corresponds to a particular feature or bug fix.
- Use clear, descriptive commit messages.
- Prioritize clarity in your code. Use descriptive variable and function names. Abbreviations should be avoided.
- Do not leave behind redundant or commented-out code. If you encounter any, delete it.
- As we learn, we'll incorporate automated tests for crucial integrations and functions.

### Git Workflow:

We follow the Feature Branch Workflow. Here’s how it works:

1. **Fork the Repository**: If you're an external contributor, begin by forking the main repo.

2. **Clone Your Fork/Repo**: Once forked, clone your repository locally: `git clone [your-repo-link]`.

3. **Create a Feature Branch**: Before you begin making changes, create a new branch for your feature: `git checkout -b [branch-name]`.

4. **Make Your Changes**: Make and commit your changes locally.

5. **Push to Your Fork**: Once changes are committed, push them to your fork: `git push origin [branch-name]`.

6. **Open a Pull Request**: Go to the main repo and open a new pull request. Be detailed in your PR description. Link any related issues or user stories.

7. **Review & Merge**: Once reviewed and if there are no conflicts, the team will merge your changes.

## Rules of Contribution:

- Ensure that your code does not break any existing functionality.
  
- Use clear and descriptive commit messages.
  
- Always pull the latest changes from the main repository before starting work on a new feature.
  
- Always create a new branch for your feature. Do not commit to the main branch.
  
- If you find a bug or want to suggest an enhancement, please open an issue in the repository first.

## Setting Up Local Development Environment:

(Note: These instructions will be more detailed once the development environment setup is finalized)

1. Install [Node.js](https://nodejs.org/).

2. Clone the repository: `git clone [repo-link]`.

3. Navigate to the project directory: `cd [project-folder-name]`.

4. Install dependencies: `npm install`.

5. Start the development server: `npm start`.

## Building and Testing the Project:

(Note: These instructions will be provided in detail once the project reaches the respective stage)

- To build the project: `npm run build`.

- To run tests: `npm test`.

---

We appreciate your collaboration and contribution! Let's work together to make the NYUAD Issue Resolution Platform the best it can be!